//createTables.js
const pool = require('./db'); // Import the database connection pool

async function createTables() {
  const createQueries = [
    // Your CREATE TABLE queries here
  ];

  for (const query of createQueries) {
    try {
      await pool.query(query);
      console.log('Table created:', query);
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }

  pool.end(); // Close the connection pool
}

createTables();
