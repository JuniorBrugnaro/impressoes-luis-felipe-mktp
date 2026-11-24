import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import app from './server.mjs';
import { openDatabase } from './sqlite.mjs';
import { migrate } from './migrations.mjs';
const DB=openDatabase(process.env.MKTP_DB||fileURLToPath(new URL('./mktp.sqlite',import.meta.url)));
await migrate(DB);
const port=Number(process.env.PORT||3017);
const SETUP_CODE=process.env.MKTP_SETUP_CODE||randomBytes(16).toString('hex');
createServer(async (req,res)=>{
  try{
    const chunks=[];
    let size=0;
    for await (const chunk of req){
      size+=chunk.length;
      if(size>400000){res.writeHead(413).end();return;}
      chunks.push(chunk);
    }
    const origin='http://localhost:'+port;
    const response=await app.fetch(new Request(origin+req.url,{method:req.method,headers:req.headers,body:chunks.length?Buffer.concat(chunks):undefined}),{DB,SETUP_CODE});
    res.writeHead(response.status,Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  }catch(error){ console.error(error); if(!res.headersSent) res.writeHead(500);res.end(); }
}).listen(port,'localhost',async ()=>{
  console.log('Painel em http://localhost:'+port);
  if(!await DB.prepare("SELECT 1 FROM accounts WHERE role='ADM'").bind().first()) console.log('Código de configuração local: '+SETUP_CODE);
});

