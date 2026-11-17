import { html } from './page.mjs';

const json = (data, status=200, headers={}) => Response.json(data,{status,headers:{'Cache-Control':'no-store',...headers}});
const bytes = value => new TextEncoder().encode(value);
const hex = value => Array.from(new Uint8Array(value), n=>n.toString(16).padStart(2,'0')).join('');
const digest = async value => hex(await crypto.subtle.digest('SHA-256',bytes(value)));
const random = () => hex(crypto.getRandomValues(new Uint8Array(32)));
async function hash(password,salt) {
  const key=await crypto.subtle.importKey('raw',bytes(password),'PBKDF2',false,['deriveBits']);
  return hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:bytes(salt),iterations:600000,hash:'SHA-256'},key,256));
}
function equal(a,b) {
  if (a.length!==b.length) return false;
  let different=0;
  for(let i=0;i<a.length;i++) different|=a.charCodeAt(i)^b.charCodeAt(i);
  return different===0;
}
const validEmail = email => typeof email==='string' && email.length<=254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validPassword = password => typeof password==='string' && password.length>=12 && password.length<=128;
const validDate = day => typeof day==='string' && /^\d{4}-\d{2}-\d{2}$/.test(day) && new Date(day).toString()!=='Invalid Date' && new Date(day).toISOString().slice(0,10)===day;
const issue = (message,status=400) => Object.assign(new Error(message),{status});
export default {
async fetch(req, env) {
  const url=new URL(req.url);
  if(req.method==='GET' && url.pathname==='/') return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin'}});
  if(!url.pathname.startsWith('/api/')) return json({error:'Página não encontrada.'},404);
  const db=env.DB;
  const query=(sql,...args)=>db.prepare(sql).bind(...args);
  const token=req.headers.get('Cookie')?.match(/(?:^|;\s*)mktp_session=([a-f0-9]{64})(?:;|$)/)?.[1];
  const cookie=(t,age)=>'mktp_session='+t+'; Path=/; HttpOnly; SameSite=Strict; Max-Age='+age+(url.protocol==='https:'?'; Secure':'');
  try {
    if(req.method==='POST' && req.headers.get('Origin')!==url.origin) throw issue('Origem inválida.',403);
    if(req.method!=='GET' && req.method!=='POST') throw issue('Método inválido.',405);
    const path=url.pathname.slice(5);
    if(req.method==='GET' && path==='setup') return json({setup:!(await query("SELECT email FROM accounts WHERE role='ADM' LIMIT 1").first())});
    const raw=req.method==='POST' ? await req.text() : '{}';
    if(raw.length>400000) throw issue('Envio acima do limite.',413);
    const body=JSON.parse(raw);
    if(!body||typeof body!=='object'||Array.isArray(body)) throw issue('Formato inválido.');
    const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
    if(req.method==='POST' && (path==='setup'||path==='login')){
      if(!validEmail(email)||!validPassword(body.password)) throw issue('Informe um e-mail e uma senha de 12 a 128 caracteres.');
      const minute=Math.floor(Date.now()/60000);
      const client=env.CLIENT_IP||req.headers.get('CF-Connecting-IP')||'local';
      const gate=await query('INSERT INTO auth_limits VALUES (?,?,1) ON CONFLICT(client) DO UPDATE SET window=excluded.window,hits=CASE WHEN auth_limits.window=excluded.window THEN auth_limits.hits+1 ELSE 1 END RETURNING hits',client,minute).first();
      if(gate.hits>15) throw issue('Muitas tentativas. Aguarde um minuto.',429);
      if(path==='setup'){
        if(!env.SETUP_CODE || typeof body.code!=='string' || !(equal(await digest(body.code),await digest(env.SETUP_CODE)))) throw issue('Código de configuração inválido.',403);
        const salt=random();
        const insert=query("INSERT INTO accounts SELECT ?, 'ADM', ?, ? WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE role='ADM')",email,salt,await hash(body.password,salt));
        const [result]=await db.batch([insert,...(env.SEED||[]).map(sql=>query(sql))]);
        if(!result.meta.changes) throw issue('O administrador já foi configurado.',409);
      } else {
        const account=await query('SELECT salt,hash FROM accounts WHERE email=?',email).first();
        const check=await hash(body.password,account?.salt||'00000000000000000000000000000000');
        if(!account||!equal(check,account.hash)) throw issue('E-mail ou senha inválidos.',401);
      }
      const newToken=random();
      await db.batch([query('DELETE FROM sessions WHERE expires<=?',Date.now()),query('INSERT INTO sessions VALUES (?,?,?)',await digest(newToken),email,Date.now()+28800000)]);
      return json({ok:true},200,{'Set-Cookie':cookie(newToken,28800)});
    }
    const session=token&&await query('SELECT accounts.email,role FROM sessions JOIN accounts USING(email) WHERE token=? AND expires>?',await digest(token),Date.now()).first();
    if(!session) throw issue('Entre com seu e-mail e senha.',401);
    if(req.method==='GET' && path==='data'){
      const month=url.searchParams.get('month');
      if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month||'')) throw issue('Mês inválido.');
      const [entries,materials]=await Promise.all([query('SELECT * FROM entries WHERE day>=? AND day<=? ORDER BY day,id',month+'-01',month+'-31').all(),query('SELECT * FROM materials ORDER BY name').all()]);
      return json({session,entries:entries.results,materials:materials.results});
    }
    if(req.method==='POST' && path==='logout'){
      await query('DELETE FROM sessions WHERE token=?',await digest(token)).run();
      return json({ok:true},200,{'Set-Cookie':cookie('',0)});
    }
    if(req.method!=='POST'||session.role!=='ADM') throw issue('Operação reservada ao administrador.',403);
    if(path==='accounts'){
      if(!validEmail(email)||!validPassword(body.password)) throw issue('Informe um e-mail e uma senha de 12 a 128 caracteres.');
      const salt=random();
      const result=await query("INSERT OR IGNORE INTO accounts VALUES (?, 'USER', ?, ?)",email,salt,await hash(body.password,salt)).run();
      if(!result.meta.changes) throw issue('Este e-mail já está cadastrado.',409);
    } else if(path==='price'){
      if(!Number.isInteger(body.price)||body.price<0||body.price>100000000) throw issue('Preço inválido.');
      const found=await query('SELECT name FROM materials WHERE name=?',body.material).first();
      if(!found) throw issue('Material inválido.');
      const commands=[query('UPDATE materials SET price=? WHERE name=?',body.price,body.material)];
      if(body.backfill===true) commands.push(query('UPDATE entries SET price=? WHERE material=? AND price IS NULL',body.price,body.material));
      await db.batch(commands);
    } else if(path==='entries'){
      const rows=body.rows;
      if(!Array.isArray(rows)||!rows.length||rows.length>500) throw issue('Envie entre 1 e 500 lançamentos.');
      const names=new Set((await query('SELECT name FROM materials').all()).results.map(m=>m.name));
      const statements=rows.map((r,i)=>{
        if(!validDate(r.day)||!Number.isInteger(r.qty)||r.qty<1||r.qty>100000||![r.width,r.height].every(n=>Number.isFinite(n)&&n>0&&n<=100000)||!names.has(r.material)||typeof r.image!=='string'||r.image.length>150) throw issue('Linha '+(i+1)+' com dados inválidos.');
        if(r.id){
          if(rows.length!==1||typeof r.id!=='string'||r.id.length>64) throw issue('Registro inválido.');
          return query('UPDATE entries SET day=?,qty=?,width=?,height=?,price=CASE WHEN material=? THEN price ELSE (SELECT price FROM materials WHERE name=?) END,material=?,image=? WHERE id=?',r.day,r.qty,r.width,r.height,r.material,r.material,r.material,r.image,r.id);
        }
        return query('INSERT INTO entries SELECT ?,?,?,?,?,name,price,? FROM materials WHERE name=?',crypto.randomUUID(),r.day,r.qty,r.width,r.height,r.image,r.material);
      });
      await db.batch(statements);
    } else throw issue('Operação desconhecida.',404);
    return json({ok:true});
  } catch(error) {
    if(error instanceof SyntaxError) return json({error:'Formato inválido.'},400);
    if(!error.status) console.error(error);
    return json({error:error.status?error.message:'Falha ao processar. Tente novamente.'},error.status||500);
  }
}};

