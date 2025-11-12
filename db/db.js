// db.js
const { Pool } = require('pg');  // Import the PostgreSQL client

// Create a connection pool
const pool = new Pool({
  user: 'postgres',      // e.g., 'postgres'
  host: 'localhost',             // or your DB host
  database: 'e_commerce',      // e.g., 'myapp'
  password: 'postgres',  // your DB password
  port: 5432,                    // default Postgres port
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database!');
  release(); // release client back to pool
});

module.exports = pool;
