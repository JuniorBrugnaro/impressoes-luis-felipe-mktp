export const html = String.raw`<!doctype html>
<html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>IMPRESSOES LUIS FELIPE - MKTP</title>
<style>
:root{color-scheme:dark;--ink:#fff5eb;--muted:#d5bfb0;--line:#eec7ac38;--accent:#ff8a43;--glass:linear-gradient(140deg,#f6d4b716,#b08e7910);font:15px Inter,"Segoe UI",sans-serif}*{box-sizing:border-box}body{margin:0;color:var(--ink);background:#1a1515 radial-gradient(ellipse at 100% 35%,#713619 0%,transparent 42%) fixed;min-height:100vh}body:before{content:"";position:fixed;inset:0;background:radial-gradient(ellipse at 10% 0%,#65342f82,transparent 55%),radial-gradient(ellipse at 70% 0%,#253c3480,transparent 50%);pointer-events:none;z-index:-1}main{max-width:1350px;margin:auto;padding:32px 28px 48px}header,.bar,.section-title{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:space-between}h1{font-size:clamp(21px,3vw,36px);letter-spacing:-.04em;margin:0}h2{font-size:21px;margin:0 0 18px}h3{margin:0}p{color:var(--muted)}.glass,dialog{background:var(--glass);border:1px solid var(--line);border-radius:17px;backdrop-filter:blur(18px);box-shadow:0 8px 32px #10090525}.nav,.bar,.grid,.glass{margin-top:14px}.nav{display:flex;gap:5px;overflow:auto;padding:7px}.card{padding:18px}.row{display:flex;gap:7px;flex-wrap:wrap;align-items:center}.grid{display:grid;gap:14px;grid-template-columns:repeat(3,1fr)}.grid .glass{margin:0}.charts{grid-template-columns:1.1fr 1fr}.kpi{display:block;font-size:clamp(23px,3vw,39px);margin-top:7px;line-height:1.1}.muted,small{color:var(--muted)}button,input,select{font:inherit;color:inherit;border:1px solid var(--line);border-radius:10px;background:#281c1b;padding:10px 12px}button{cursor:pointer;position:relative;isolation:isolate;overflow:hidden;background:#dcb19412}button:before{content:"";position:absolute;inset:0;z-index:-1;opacity:0;background:radial-gradient(ellipse 75px 44px at var(--x,50%) var(--y,50%),#ffad67a0,transparent);transition:opacity .18s}button:hover:before,button:focus-visible:before{opacity:1}button.active,button.primary{background:#b74415;border-color:#ff9255;color:white}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--accent);outline-offset:2px}button:disabled{opacity:.5;cursor:default}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;white-space:nowrap;text-align:left}th,td{padding:10px 12px;border-bottom:1px solid var(--line)}th{color:#ffd9bc;font-weight:600;background:#f4d3bf12}tbody tr:hover{background:#ffe3ca0a}.highlight{background:#e86a211c}.material{display:grid;grid-template-columns:1fr auto;gap:7px;padding:9px 0;border-bottom:1px solid var(--line)}.chart{height:156px;display:flex;align-items:stretch;gap:8px;overflow:auto}.point{flex:1;min-width:40px;display:grid;grid-template-rows:1fr 20px;align-items:end;text-align:center}.plot{height:100%;display:flex;align-items:end;justify-content:center;border-bottom:1px solid var(--line)}.column{width:min(40px,68%);background:linear-gradient(#fb995f,#a63d16);border-radius:6px 6px 0 0;position:relative}.column span{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);font-weight:600}.login{max-width:475px;margin:9vh auto 0;padding:25px}form{display:grid;gap:13px}label{display:grid;gap:6px}label.check{display:flex;align-items:center}dialog{width:min(580px,calc(100% - 26px));padding:22px;background:#2c211e;color:var(--ink);max-height:88vh}dialog::backdrop{background:#0d0909a8}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.form-grid input,.form-grid select{width:100%;min-width:0}.notice{min-height:20px;margin:8px 0;color:#ffbc91}.login h1{margin-bottom:20px}.pill{border:1px solid var(--line);padding:7px 12px;border-radius:20px;color:#ffd9bc}[hidden]{display:none!important}.foot{margin:14px 0 0;font-size:13px}.summary{margin:0 0 14px}
@media(max-width:750px){main{padding:18px 12px}.charts{grid-template-columns:1fr}.card{padding:12px}.grid{gap:8px}.grid small{font-size:12px}.nav button{flex:none}.bar{gap:9px}}@media(prefers-reduced-motion:reduce){button:before{transition:none;background:radial-gradient(ellipse at center,#ffad6760,transparent)}}
</style>
<main>
<section id="access" class="login glass" hidden><h1>IMPRESSOES LUIS FELIPE - MKTP</h1><h2 id="access-title">Entrar</h2><p id="setup-help" hidden>Use o código de configuração para criar a primeira conta de administrador.</p><form id="login"><label id="code-field" hidden>Código de configuração<input name="code"></label><label>E-mail<input name="email" type="email" required autocomplete="username"></label><label>Senha<input name="password" type="password" minlength="12" maxlength="128" required autocomplete="current-password"></label><button class="primary">Continuar</button></form></section>
<p class="notice" id="global" role="status"></p>
<section id="dashboard" hidden>
<header><h1>IMPRESSOES LUIS FELIPE - MKTP</h1><div class="row"><span class="pill" id="role"></span><button data-action="logout">Sair</button></div></header>
<nav class="nav glass" aria-label="Menu"><button data-tab="HOME" class="active">HOME</button><button data-tab="IMAGENS">IMAGENS</button><button data-tab="CUSTOS">CUSTOS</button><button data-tab="MEDIDAS">MEDIDAS</button><button data-tab="DATA">DATA</button><button data-tab="MATERIAL">MATERIAL</button></nav>
<div class="bar"><div class="row"><input id="month" type="month" aria-label="Mês" value="2026-11" min="2026-11"><button data-week="0" class="active">Mês inteiro</button><button data-week="1" title="Dias 1 a 7">Semana 1</button><button data-week="2" title="Dias 8 a 14">Semana 2</button><button data-week="3" title="Dias 15 a 21">Semana 3</button><button data-week="4" title="Dia 22 ao fim do mês">Semana 4</button></div><div id="admin" class="row" hidden><button data-action="entry" class="primary">＋ Novo lançamento</button><button data-action="import">Importar planilha</button><button data-action="account">Novo usuário</button></div></div>
<div id="view"></div>
</section>
<dialog id="modal"><div class="section-title"><h2 id="modal-title"></h2><button type="button" id="close" aria-label="Fechar">×</button></div><div id="modal-body"></div><p class="notice" id="modal-status" role="status"></p></dialog>
</main>
<script>
'use strict';
const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number=v=>v.toLocaleString('pt-BR',{maximumFractionDigits:2});
const brl=v=>(v/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const area=r=>r.qty*r.width*r.height/10000;
const cost=r=>r.price===null?null:Math.round(area(r)*r.price);
const fmtDate=d=>d.slice(8,10)+'/'+d.slice(5,7);
let data, week=0, tab='HOME', needsSetup=false, requestId=0;
async function api(path,body){
 const response=await fetch('/api/'+path,body===undefined?{}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 const result=await response.json();
 if(!response.ok) throw Object.assign(new Error(result.error),{status:response.status});
 return result;
}
async function refresh(){
 const request=++requestId;
 if(!$('month').value||!$('month').checkValidity()) return;
 try{
   const next=await api('data?month='+encodeURIComponent($('month').value));
   if(request!==requestId) return;
   data=next; $('access').hidden=true; $('dashboard').hidden=false;
   $('role').textContent=data.session.role; $('admin').hidden=data.session.role!=='ADM';
   render();
 }catch(error){if(request!==requestId)return;if(error.status!==401)throw error;await showLogin();}
}
async function showLogin(){
 needsSetup=(await api('setup')).setup;
 $('dashboard').hidden=true; $('access').hidden=false;
 $('access-title').textContent=needsSetup?'Configurar administrador':'Entrar';
 $('code-field').hidden=!needsSetup; $('setup-help').hidden=!needsSetup;
 $('login').elements.code.required=needsSetup;
}
const totalCost=rows=>{
 const valued=rows.filter(r=>cost(r)!==null);
 const pending=rows.length-valued.length;
 return valued.length?brl(valued.reduce((sum,r)=>sum+cost(r),0))+(pending?' · parcial':''):pending?'A apurar':'—';
};
function grouped(rows,key){
 const groups=new Map();
 for(const r of rows){const k=key(r);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(r);}
 return groups;
}
const qty=rows=>rows.reduce((sum,r)=>sum+r.qty,0);
function table(rows, title='Lançamentos diários'){
 const adm=data.session.role==='ADM';
 return '<section class="card glass"><h2>'+title+'</h2>'+(rows.length?'<div class="table-wrap"><table><thead><tr><th>Data</th><th>Qtd.</th><th>Medidas (cm)</th><th>Material</th><th>Área (m²)</th><th>Custo</th>'+(adm?'<th>Ações</th>':'')+'</tr></thead><tbody>'+rows.map(r=>'<tr'+(r.id==='nov12'||r.id==='nov13'?' class="highlight"':'')+'><td>'+fmtDate(r.day)+'</td><td>'+number(r.qty)+'</td><td>'+number(r.width)+' × '+number(r.height)+'</td><td>'+esc(r.material)+'</td><td>'+number(area(r))+'</td><td>'+(cost(r)===null?'—':brl(cost(r)))+'</td>'+(adm?'<td><button data-edit="'+esc(r.id)+'" aria-label="Editar lançamento de '+fmtDate(r.day)+'">Editar</button></td>':'')+'</tr>').join('')+'</tbody></table></div>':'<p>Nenhum lançamento neste período.</p>')+'</section>';
}
function production(rows){
 const days=[...grouped(rows,r=>r.day)];
 const max=Math.max(1,...days.map(([,r])=>qty(r)));
 return '<section class="glass card"><h2>Produção diária</h2>'+(days.length?'<div class="chart" aria-label="Impressões por dia">'+days.map(([d,r])=>'<div class="point"><div class="plot"><div class="column" style="height:'+Math.max(2,qty(r)/max*82)+'%"><span>'+qty(r)+'</span></div></div><small>'+fmtDate(d)+'</small></div>').join('')+'</div>':'<p>Nenhuma impressão no período.</p>')+'</section>';
}
function materials(rows,edit=false){
 const adm=data.session.role==='ADM';
 return '<section class="glass card"><h2>'+(edit?'Material':'Custos por material')+'</h2>'+data.materials.map(m=>'<div class="material"><strong>'+esc(m.name)+'</strong><div class="row">'+(edit?(m.price===null?'A apurar':brl(m.price)+' / m²'):totalCost(rows.filter(r=>r.material===m.name)))+(adm&&edit?' <button data-price="'+esc(m.name)+'">Definir preço</button>':'')+'</div></div>').join('')+'</section>';
}
function render(){
 const rows=data.entries.filter(r=>!week||Math.min(4,Math.ceil(Number(r.day.slice(-2))/7))===week);
 document.querySelectorAll('[data-week]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.week)===week);b.setAttribute('aria-pressed',Number(b.dataset.week)===week);});
 document.querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===tab);b.setAttribute('aria-pressed',b.dataset.tab===tab);});
 let result='';
 if(tab==='HOME') result='<div class="grid">'+[['Lançamentos',number(rows.length)],['Impressões',number(qty(rows))],['Custo de material',totalCost(rows)]].map(([k,v])=>'<section class="glass card"><small>'+k+'</small><strong class="kpi">'+v+'</strong></section>').join('')+'</div><div class="grid charts">'+production(rows)+materials(rows)+'</div>'+table(rows);
 if(tab==='CUSTOS') result=inkConsumption()+materials(rows)+table(rows);
 if(tab==='MATERIAL') result=materials(rows,true);
 if(tab==='DATA') result=production(rows)+table(rows);
 if(tab==='MEDIDAS') result='<section class="glass card"><h2>Impressões por medida</h2>'+([...grouped(rows,r=>number(r.width)+' × '+number(r.height)+' cm')].map(([k,r])=>'<div class="material"><strong>'+k+'</strong><span>'+qty(r)+' impressões · '+number(r.reduce((s,e)=>s+area(e),0))+' m²</span></div>').join('')||'<p>Nenhum lançamento neste período.</p>')+'</section>';
 if(tab==='IMAGENS') result='<section class="glass card"><h2>Imagens registradas</h2>'+ (rows.filter(r=>r.image).map(r=>'<div class="material"><strong>'+esc(r.image)+'</strong><span>'+fmtDate(r.day)+'</span></div>').join('')||'<p>Nenhum nome de imagem informado neste período.</p>')+'</section>';
 $('view').innerHTML=result;
}
function inkConsumption(){
 const items=data.inkItems||[];
 const ml=new Intl.NumberFormat('pt-BR',{minimumFractionDigits:3,maximumFractionDigits:3});
 return '<section class="glass card"><h2>Consumo de tinta por impressão</h2><div class="table-wrap"><table><thead><tr><th>Item</th><th>Consumo por impressão (ml)</th></tr></thead><tbody>'+items.map(item=>'<tr><td>'+esc(item.name)+'</td><td>'+ml.format(item.microliters/1000)+' ml</td></tr>').join('')+'</tbody></table></div></section>';
}
function modal(title,content){
 $('modal-title').textContent=title; $('modal-body').innerHTML=content; $('modal-status').textContent=''; $('modal').showModal();
}
function submit(form,handler){
 form.addEventListener('submit',async e=>{
  e.preventDefault();
  const button=e.submitter; if(button)button.disabled=true;
  $('modal-status').textContent='';
  try{await handler(Object.fromEntries(new FormData(form)));}
  catch(error){$('modal-status').textContent=error.message;}
  finally{if(button) button.disabled=false;}
 });
}
function entry(r={}){
 const defaultDay=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 modal(r.id?'Editar lançamento':'Novo lançamento','<form id="entry-form"><div class="form-grid"><label>Data<input name="day" type="date" required value="'+esc(r.day||($('month').value===defaultDay.slice(0,7)?defaultDay:$('month').value+'-01'))+'"></label><label>Quantidade<input name="qty" type="number" min="1" max="100000" required value="'+(r.qty||1)+'"></label><label>Largura (cm)<input name="width" type="number" step="0.01" min="0.01" required value="'+esc(r.width)+'"></label><label>Altura (cm)<input name="height" type="number" step="0.01" min="0.01" required value="'+esc(r.height)+'"></label></div><label>Material<select name="material">'+data.materials.map(m=>'<option'+(m.name===r.material?' selected':'')+'>'+esc(m.name)+'</option>').join('')+'</select></label><label>Nome da imagem (opcional)<input name="image" maxlength="150" value="'+esc(r.image)+'"></label><button class="primary">Salvar lançamento</button></form>');
 submit($('entry-form'),async fields=>{
  await api('entries',{rows:[{...fields,id:r.id,qty:Number(fields.qty),width:Number(fields.width),height:Number(fields.height)}]});
  $('month').value=fields.day.slice(0,7); week=0; tab='HOME'; $('modal').close(); await refresh();
 });
}
function account(){
 modal('Novo usuário','<form id="account-form"><label>E-mail<input type="email" name="email" required></label><label>Senha inicial<input type="password" name="password" minlength="12" maxlength="128" required autocomplete="new-password"></label><p>Perfil USER · acesso de consulta.</p><button class="primary">Criar usuário</button></form>');
 submit($('account-form'),async fields=>{await api('accounts',fields);$('modal').close();$('global').textContent='Usuário criado.';});
}
function price(name){
 const material=data.materials.find(m=>m.name===name);
 modal('Preço por m² · '+name,'<form id="price-form"><label>Preço em reais por m²<input name="price" type="number" step="0.01" min="0" max="1000000" required value="'+(material.price===null?'':material.price/100)+'"></label><label class="check"><input type="checkbox" name="backfill" checked> Aplicar também aos lançamentos ainda sem preço</label><button class="primary">Salvar preço</button></form>');
 submit($('price-form'),async fields=>{await api('price',{material:name,price:Math.round(Number(fields.price)*100),backfill:fields.backfill==='on'});$('modal').close();await refresh();});
}
function csv(text){
 text=text.replace(/^\uFEFF/,'');
 const delimiter=text.split(/\r?\n/,1)[0].includes(';')?';':',';
 const lines=[]; let line=[], field='', quoted=false;
 for(let i=0;i<text.length;i++){
   const ch=text[i];
   if(ch==='"'){
     if(quoted&&text[i+1]==='"'){field+='"';i++;}
     else quoted=!quoted;
   }else if(!quoted&&ch===delimiter){line.push(field.trim());field='';}
   else if(!quoted&&ch==='\n'){line.push(field.trim());if(line.some(Boolean))lines.push(line); line=[];field='';}
   else field+=ch;
 }
 if(quoted)throw new Error('Há aspas abertas na planilha.');
 line.push(field.trim());if(line.some(Boolean))lines.push(line);
 const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
 const header=(lines.shift()||[]).map(norm);
 const keys=['data','quantidade','largura','altura','material'];
 if(!keys.every(k=>header.includes(k)))throw new Error('Use as colunas data, quantidade, largura, altura e material.');
 if(!lines.length||lines.length>500)throw new Error('A planilha deve ter entre 1 e 500 lançamentos.');
 return lines.map((cells,i)=>{
   const get=k=>cells[header.indexOf(k)]||'';
   const raw=get('data');
   const day=/^\d{2}\/\d{2}\/\d{4}$/.test(raw)?raw.split('/').reverse().join('-'):raw;
   const qty=Number(get('quantidade')),width=Number(get('largura').replace(',','.')),height=Number(get('altura').replace(',','.'));
   const material=data.materials.find(m=>norm(m.name)===norm(get('material')))?.name;
   const image=get('imagem');
   if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!Number.isFinite(Date.parse(day))||new Date(day).toISOString().slice(0,10)!==day||!Number.isInteger(qty)||qty<1||qty>100000||!Number.isFinite(width)||width<=0||width>100000||!Number.isFinite(height)||height<=0||height>100000||!material||image.length>150)throw new Error('Linha '+(i+2)+': verifique a data, as medidas, a quantidade e o material.');
   return {day,qty,width,height,material,image};
 });
}
function importFile(){
 const sample='data;quantidade;largura;altura;material;imagem\n17/11/2026;1;60;90;Rolo 90;\n';
 modal('Importar planilha','<p>No Excel, salve o arquivo como CSV UTF-8. Confira os dados antes de importar.</p><p><a style="color:#ffbd91" download="modelo-impressoes.csv" href="data:text/csv;charset=utf-8,'+encodeURIComponent(sample)+'">Baixar modelo CSV</a></p><form id="import-form"><label>Arquivo CSV<input id="csv-file" type="file" accept=".csv,text/csv" required></label><div id="import-preview" class="table-wrap"></div><button class="primary" disabled>Confirmar importação</button></form>');
 let rows=[];
 const form=$('import-form'),button=form.querySelector('button'),file=$('csv-file');
 file.onchange=async()=>{
  rows=[];button.disabled=true;$('import-preview').innerHTML='';$('modal-status').textContent='';
  try{
   const selected=file.files[0];if(!selected)return;
   if(selected.size>300000)throw new Error('Arquivo acima do limite de 300 KB.');
   const parsed=csv(await selected.text());
   if(selected!==file.files[0])return;
   rows=parsed;
   const key=r=>[r.day,r.qty,r.width,r.height,r.material,r.image].join('|');
   const seen=new Set(data.entries.map(key));let repeats=0;
   for(const row of rows){const k=key(row);if(seen.has(k))repeats++;seen.add(k);}
   $('import-preview').innerHTML='<p>'+rows.length+' lançamentos'+(repeats?' · '+repeats+' possíveis duplicidades neste arquivo ou mês exibido':'')+'</p><table><thead><tr><th>Data</th><th>Qtd.</th><th>Medidas</th><th>Material</th></tr></thead><tbody>'+rows.map(r=>'<tr><td>'+esc(r.day)+'</td><td>'+r.qty+'</td><td>'+number(r.width)+' × '+number(r.height)+'</td><td>'+esc(r.material)+'</td></tr>').join('')+'</tbody></table>';
   button.disabled=false;
  }catch(error){$('modal-status').textContent=error.message;}
 };
 submit(form,async()=>{
  if(!rows.length)return;
  await api('entries',{rows}); $('month').value=rows[0].day.slice(0,7);week=0;tab='HOME';$('modal').close();$('global').textContent=rows.length+' lançamentos importados.';await refresh();
 });
}
$('close').onclick=()=>$('modal').close();
$('month').onchange=()=>{week=0;refresh().catch(error=>$('global').textContent=error.message);};
$('login').onsubmit=async e=>{
 e.preventDefault();e.submitter.disabled=true;$('global').textContent='';
 try{await api(needsSetup?'setup':'login',Object.fromEntries(new FormData(e.currentTarget)));$('login').reset();await refresh();}
 catch(error){$('global').textContent=error.message;}
 finally{e.submitter.disabled=false;}
};
document.addEventListener('click',async e=>{
 const b=e.target.closest('button');if(!b)return;
 try{
  if(b.dataset.tab){tab=b.dataset.tab;render();}
  if(b.dataset.week){week=Number(b.dataset.week);render();}
  if(b.dataset.edit){const r=data.entries.find(r=>r.id===b.dataset.edit);if(r)entry(r);}
  if(b.dataset.price)price(b.dataset.price);
  if(b.dataset.action==='entry')entry();
  if(b.dataset.action==='account')account();
  if(b.dataset.action==='import')importFile();
  if(b.dataset.action==='logout'){await api('logout',{});data=null;$('view').replaceChildren();$('global').textContent='';await showLogin();}
 }catch(error){$('global').textContent=error.message;}
});
document.addEventListener('pointermove',e=>{
 if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const b=e.target.closest('button');if(!b)return;
 const box=b.getBoundingClientRect();
 b.style.setProperty('--x',(e.clientX-box.left)+'px');b.style.setProperty('--y',(e.clientY-box.top)+'px');
});
refresh().catch(error=>$('global').textContent=error.message);
</script></html>`;

