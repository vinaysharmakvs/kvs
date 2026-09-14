import pg from 'pg';
let pool;
export function database() {
 const connectionString=process.env.KIDSVERSE_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
 if(!connectionString) throw new Error('Attendance database is not configured');
 return pool ||= new pg.Pool({connectionString,max:3,ssl:process.env.POSTGRES_SSL==='false'?false:{rejectUnauthorized:true}});
}
