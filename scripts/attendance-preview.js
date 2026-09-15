// Isolated demo only: does not connect to or modify the school database.
import {PGlite} from '@electric-sql/pglite';
import {readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import {createHandler} from '../api/attendance.js';
import {hashCode,lookupCode,schoolDay,CAMPUS} from '../lib/attendance-core.js';
process.env.ATTENDANCE_CODE_SECRET='isolated-preview-only-not-for-production';
process.env.ATTENDANCE_ADMIN_PASSWORD='DemoAdminPreview2026!';
const db=new PGlite();await db.exec(await readFile(new URL('../database/attendance-schema.sql',import.meta.url),'utf8'));
for(const [name,role,code] of [['Demo Admin','admin','DEMOADMIN'],['Ananya Sharma','teacher','DEMOTEACHER']]){
 const id=randomUUID();await db.query('INSERT INTO kv_attendance.staff(id,name,role,code_lookup,code_hash) VALUES($1,$2,$3,$4,$5)',[id,name,role,lookupCode(code,process.env.ATTENDANCE_CODE_SECRET),hashCode(code)]);
 if(role==='teacher'){const version=randomUUID();await db.query('INSERT INTO kv_attendance.schedule_versions(id,teacher_id,effective_from,created_by) VALUES($1,$2,$3,$2)',[version,id,schoolDay()]);for(let d=1;d<=7;d++)await db.query("INSERT INTO kv_attendance.schedule_days VALUES($1,$2,'08:00',5)",[version,d]);}
}
// Serialize preview requests because the in-memory database has one connection.
let queue=Promise.resolve();const pool={query:(...a)=>db.query(...a),connect:async()=>({query:(...a)=>db.query(...a),release(){}})};
const handler=createHandler({getDatabase:()=>pool});const root=fileURLToPath(new URL('..',import.meta.url)).replace(/\/$/,'');
createServer(async(req,res)=>{try{
 if(req.url==='/api/attendance'){let body='';for await(const c of req){body+=c;if(body.length>20000){res.writeHead(413).end();return;}}req.body=JSON.parse(body);res.status=s=>{res.statusCode=s;return res;};res.json=o=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(o));};queue=queue.then(()=>handler(req,res));await queue;return;}
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=resolve(root,'.'+(pathname==='/'?'/teacher-attendance.html':pathname));
 if(!file.startsWith(root+'/')||!['teacher-attendance.html','admin-attendance.html','attendance.js','attendance.css'].includes(file.slice(root.length+1))){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css'})[extname(file)]);let content=await readFile(file,'utf8');if(extname(file)==='.html')content=content.replace('<body>','<body><div style="padding:10px;text-align:center;background:#fff0bd;font:14px system-ui">DEMO ONLY · Sample teacher and location · No real attendance data</div><script>navigator.geolocation.watchPosition=function(success){const id=setTimeout(()=>success({coords:{latitude:32.1580283,longitude:75.9101877,accuracy:2},timestamp:Date.now()}),20);return id;};navigator.geolocation.clearWatch=function(id){clearTimeout(id);};</script>');res.end(content);
 }catch{res.writeHead(500).end('Preview unavailable');}
}).listen(Number(process.env.ATTENDANCE_PREVIEW_PORT||8765),'127.0.0.1',()=>console.log('Isolated attendance preview: http://127.0.0.1:8765 · Demo codes: DEMOADMIN / DEMOTEACHER. No real school data.'));
