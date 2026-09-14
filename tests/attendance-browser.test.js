import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {randomUUID} from 'node:crypto';
import {PGlite} from '@electric-sql/pglite';
import {chromium} from 'playwright';
import {createHandler} from '../api/attendance.js';
import {hashCode,lookupCode} from '../lib/attendance-core.js';
test('admin setup and mobile teacher check-in through real API',async()=>{
 process.env.ATTENDANCE_CODE_SECRET='isolated-browser-test-secret-at-least-32';
 const db=new PGlite();await db.exec(await readFile('database/attendance-schema.sql','utf8'));
 await db.query("INSERT INTO kv_attendance.staff(id,name,role,code_lookup,code_hash) VALUES($1,'School Admin','admin',$2,$3)",[randomUUID(),lookupCode('BROWSERADMIN',process.env.ATTENDANCE_CODE_SECRET),hashCode('BROWSERADMIN')]);
 const handler=createHandler({getDatabase:()=>({query:(...a)=>db.query(...a),connect:async()=>({query:(...a)=>db.query(...a),release(){}})})});
 const root=process.cwd();const server=createServer(async(req,res)=>{try{if(req.url==='/api/attendance'){let raw='';for await(const chunk of req)raw+=chunk;req.body=JSON.parse(raw);res.status=code=>{res.statusCode=code;return res;};res.json=data=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));};await handler(req,res);return;}const path=resolve(root,'.'+new URL(req.url,'http://local').pathname);if(!path.startsWith(root+'/')){res.writeHead(403).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript'})[extname(path)]||'application/octet-stream');res.end(await readFile(path));}catch{res.writeHead(404).end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}`;
 let browser;try{browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),headless:true});}catch(error){await new Promise(r=>server.close(r));await db.close();throw error;}
 const context=await browser.newContext({viewport:{width:1440,height:1050},permissions:['geolocation'],geolocation:{latitude:28.6,longitude:77.2,accuracy:15}});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const out=process.env.ATTENDANCE_SCREENSHOT_DIR||'/private/tmp/kidsverse-attendance-screens';await mkdir(out,{recursive:true});
 try{
 await page.goto(url+'/admin-attendance.html');await page.locator('#code').fill('BROWSERADMIN');await page.getByRole('button',{name:'Sign in →'}).click();await page.getByRole('heading',{name:'Teacher attendance',exact:true}).waitFor();
 await page.locator('#add-teacher input').fill('Ananya Sharma');await page.getByRole('button',{name:'Create teacher & code'}).click();await page.locator('#new-code code').waitFor();const code=await page.locator('#new-code code').textContent();
 await page.getByRole('heading',{name:'Ananya Sharma',exact:true}).waitFor();const weekday=new Date().toLocaleDateString('en-US',{timeZone:'Asia/Kolkata',weekday:'short'});const index=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(weekday)+1;
 await page.locator(`#day${index}`).check();await page.locator(`[name=arrival${index}]`).fill('23:59');await page.getByRole('button',{name:'Save approved timings'}).click();await page.getByText('Approved timings saved.',{exact:true}).waitFor();
 await page.screenshot({path:out+'/admin-attendance-desktop.png',fullPage:true});
 await page.getByRole('button',{name:'Sign out'}).click();await page.setViewportSize({width:390,height:844});await page.goto(url+'/teacher-attendance.html');await page.locator('#code').waitFor();await page.screenshot({path:out+'/teacher-login-mobile.png',fullPage:true});
 await page.locator('#code').fill(code);await page.getByRole('button',{name:'Sign in →'}).click();await page.getByRole('heading',{name:'Daily check-in',exact:true}).waitFor();await page.screenshot({path:out+'/teacher-checkin-mobile.png',fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.getByRole('button',{name:'Capture location & mark attendance'}).click();await page.getByRole('heading',{name:'Attendance marked',exact:true}).waitFor();await page.screenshot({path:out+'/teacher-receipt-mobile.png',fullPage:true});
 assert.equal((await db.query('SELECT count(*)::int n FROM kv_attendance.entries')).rows[0].n,1);
 await page.reload();await page.getByRole('button',{name:'Already marked today'}).waitFor();assert.ok(await page.getByRole('button',{name:'Already marked today'}).isDisabled());
 await page.getByRole('button',{name:'View my attendance'}).click();await page.getByRole('heading',{name:'My attendance',exact:true}).waitFor();
 const denied=await page.evaluate(async()=>{const r=await fetch('/api/attendance',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'dashboard'})});return r.status;});assert.equal(denied,403);
 assert.deepEqual(errors,[]);
 }finally{await browser.close();await new Promise(r=>server.close(r));await db.close();}
});
