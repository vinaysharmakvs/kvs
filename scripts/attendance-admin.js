import { randomUUID } from 'node:crypto';
import { database } from '../lib/attendance-db.js';
import { newCode, lookupCode, hashCode } from '../lib/attendance-core.js';
const name=process.argv.slice(2).join(' ').trim();
if(!name || name.length>120 || !process.env.ATTENDANCE_CODE_SECRET || process.env.ATTENDANCE_CODE_SECRET.length<32)throw new Error('Provide an admin name and set ATTENDANCE_CODE_SECRET (at least 32 characters).');
const pool=database();
try{const code=newCode();await pool.query("INSERT INTO kv_attendance.staff(id,name,role,code_lookup,code_hash) VALUES($1,$2,'admin',$3,$4)",[randomUUID(),name,lookupCode(code,process.env.ATTENDANCE_CODE_SECRET),hashCode(code)]);console.log(`Administrator created: ${name}\nPrivate sign-in code (shown once): ${code}\nStore securely. Do not commit this code.`);}finally{await pool.end();}
