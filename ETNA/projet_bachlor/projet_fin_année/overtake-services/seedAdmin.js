const pool = require('./db'); // Import the database connection pool

async function seedAdmin() {
  const insertQuery = `
    INSERT INTO User_account (Name, Lastname, Email, Password, IsAdmin, Created_at)
    VALUES ($1, $2, $3, $4, $5, NOW());
  `;

  const values = ['Admin', 'User', 'admin@example.com', 'hashed_password', true];

  try {
    await pool.query(insertQuery, values);
    console.log('Admin user seeded successfully.');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }

  pool.end(); // Close the connection pool
}

seedAdmin();
