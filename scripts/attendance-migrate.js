import {readFile} from 'node:fs/promises';
import {database} from '../lib/attendance-db.js';
const pool=database();try{await pool.query(await readFile(new URL('../database/attendance-schema.sql',import.meta.url),'utf8'));console.log('Attendance schema is ready. Existing school tables were not changed.');}finally{await pool.end();}
