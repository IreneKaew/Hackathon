const express = require('express');
const app = express();
const pool = require('./db'); // Import the database connection pool

// Your routes and middleware will be defined here

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// createTables.js
const pool = require('./db'); // Import the database connection pool

async function createTables() {
  // Create the User_account table
  const createQuery = `
    CREATE TABLE IF NOT EXISTS User_account (
      ID SERIAL PRIMARY KEY,
      Name VARCHAR(255),
      Lastname VARCHAR(255),
      Email VARCHAR(255),
      Password VARCHAR(255),
      IsAdmin BOOLEAN,
      Created_at TIMESTAMP
    );
  `;

  try {
    await pool.query(createQuery);
    console.log('User_account table created successfully.');
  } catch (error) {
    console.error('Error creating User_account table:', error);
  }

  // Add columns to the existing table
  const alterQuery1 = `
    ALTER TABLE table_name
    ADD COLUMN IsAdmin BOOLEAN;
  `;

  const alterQuery2 = `
    ALTER TABLE table_name
    ADD COLUMN Created_at TIMESTAMP;
  `;

  try {
    await pool.query(alterQuery1);
    await pool.query(alterQuery2);
    console.log('Columns added to the existing table successfully.');
  } catch (error) {
    console.error('Error adding columns to the existing table:', error);
  }

  pool.end(); // Close the connection pool
}

createTables();
