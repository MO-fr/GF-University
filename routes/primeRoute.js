// Import necessary modules
import express from 'express';
import bcrypt from 'bcrypt'; // For encrypting passwords
import jwt from 'jsonwebtoken'; // For user authentication (JWT tokens)
import Student from '../models/student.js'; // Student model (database)
import requireAuth from '../middleware/authMiddleware.js'; // Middleware to protect certain pages

const router = express.Router(); // Create a new Express router

// ==============================
// ROUTES TO DISPLAY PAGES
// ==============================

// These routes send users to different pages
router.get('/sign-in', (req, res) => res.render('sign-in')); // Sign-up page
router.get('/login', (req, res) => res.render('login')); // Login page 
router.get('/terms', (req, res) => res.render('terms')); // Terms and Conditions page
// Pages that require the user to be logged in (protected by requireAuth)
router.get('/course', (req, res) => res.render('course')); // Course selection page
router.get('/calendar', (req, res) => res.render('calendar')); // Student calendar
// A calendar that visitors (not just students) can see
router.get('/visitCalendar', (req, res) => res.render('visitCalendar'));

// Student dashboard (requires login)
router.get('/studentDB', requireAuth, async (req, res) => {
  res.render('studentDB', { user: req.user }); // Sends user info to dashboard
});

// ==============================
// LOGOUT ROUTE
// ==============================

router.get('/logout', (req, res) => {
  res.clearCookie('auth_token'); // Removes the authentication token (logs user out)
  res.redirect('/login'); // Redirects to login page after logging out
});

// ==============================
// SIGN-UP (CREATE ACCOUNT) ROUTE
// ==============================

router.post('/sign-in', async (req, res) => {
  const { firstName, lastName, email, studentId, program, password, confirmPassword, terms } = req.body;

  try {
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !studentId || !program || !password || !confirmPassword || terms === undefined) {
      return res.status(400).send('All fields are required.');
    }

    // Ensure passwords match
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match.');
    }

    // Ensure password is at least 8 characters long
    if (password.length < 8) {
      return res.status(400).send('Password must be at least 8 characters long.');
    }

    // Ensure user accepted terms and conditions
    if (!terms) {
      return res.status(400).send('You must accept the terms and conditions.');
    }

    // Check if email is already used
    const existingUser = await Student.findOne({ where: { email } });
    if (existingUser) return res.status(400).send('Email is already registered.');
    
    // Check if student ID is already used
    const existingStudentId = await Student.findOne({ where: { studentId } });
    if (existingStudentId) return res.status(400).send('Student ID is already registered.');

    // Encrypt (hash) password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student account in the database
    const newUser = await Student.create({ firstName, lastName, email, studentId, program, password: hashedPassword });

    // Generate a secret token to keep the user logged in
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Save the token as a cookie so the user stays logged in
    res.cookie('auth_token', token, {
      httpOnly: true, // Protects against hacking
      secure: process.env.NODE_ENV === 'production', // Secure mode only in production
      maxAge: 3600000, // Expires in 1 hour
    });

    // After signing up, send the user to the login page
    res.redirect('/login');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal server error.');
  }
});


// LOGIN ROUTE

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ensure both email and password are entered
    if (!email || !password) {
      return res.status(400).send('All fields are required.');
    }

    // Check if the email exists in the database
    const student = await Student.findOne({ where: { email } });

    if (!student) {
      return res.status(404).send('Student not found.');
    }

    // Compare entered password with the stored hashed password
    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) {
      return res.status(400).send('Invalid credentials.');
    }


    // If password is correct, create a secret token
    const token = jwt.sign({ userId: student.id, email: student.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Save the token in cookies to keep the user logged in
    res.cookie('auth_token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'development',
      maxAge: 3600000, // Expires in 1 hour
    });

    // Send user to their dashboard after login
    console.log('Entering studentDB')
    res.render('studentDB');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error.');
  }

});

export default router;