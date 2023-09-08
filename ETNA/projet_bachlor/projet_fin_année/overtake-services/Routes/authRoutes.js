const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Import the database connection pool
const authenticateToken = require('./authMiddleware'); // Import the authentication middleware

// Protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This route is protected.' });
});

// User Registration
router.post('/user/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], async (req, res) => {
  // Validation checks here...

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Insert user data into the User_account table
  const createUserQuery = `
    INSERT INTO User_account (Name, Lastname, Email, Password, IsAdmin, Created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING ID;
  `;

  try {
    const { rows } = await pool.query(createUserQuery, [req.body.name, req.body.lastname, req.body.email, hashedPassword, false]);
    const userId = rows[0].id;

    // Create a JWT token for the user
    const token = jwt.sign({ userId, isAdmin: false }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login
router.post('/user/login', async (req, res) => {
  // Authenticate user here...

  // Verify user's credentials and generate a JWT
  if (validUser) {
    const token = jwt.sign({ userId, isAdmin: false }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Admin Registration and Login routes can be similar with isAdmin set to true.
// Admin Login
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Authenticate admin user here...
  
    // Verify admin user's credentials and generate an admin JWT
    if (isAdminUser(email, password)) {
      const token = jwt.sign({ userId, isAdmin: true }, 'your_secret_key', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  });
  

module.exports = router;
