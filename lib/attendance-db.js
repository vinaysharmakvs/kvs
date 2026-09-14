import pg from 'pg';
let pool;
export function database() {
 const connectionString=process.env.ATTENDANCE_DATABASE_URL;
 if(!connectionString) throw new Error('Attendance database is not configured. Set ATTENDANCE_DATABASE_URL.');
 return pool ||= new pg.Pool({connectionString,max:3,ssl:process.env.ATTENDANCE_POSTGRES_SSL==='false'?false:{rejectUnauthorized:true}});
}
