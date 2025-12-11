import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',    
  host: 'localhost',           
  database: 'e_commerce',      
  password: 'postgres',  
  port: 5432,                 
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database!');
  release(); 
});

export default pool;
