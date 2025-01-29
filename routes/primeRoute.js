import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/student.js'; // Ensure this is the correct model

const router = express.Router();

// Render pages
router.get('/sign-in', (req, res) => res.render('sign-in'));
router.get('/login', (req, res) => res.render('login'));
router.get('/studentDB', (req, res) => res.render('studentDB'));
router.get('/terms', (req, res) => res.render('terms')); // Fixed incorrect render

router.post('/studentDB', (req, res) => {
  res.render('/studentDB');
});

// Sign-up route
router.post('/sign-in', async (req, res) => {
  const { firstName, lastName, email, studentId, program, password, confirmPassword, terms } = req.body;

  try {
    // Check if all fields are provided
    if (!firstName || !lastName || !email || !studentId || !program || !password || !confirmPassword || terms === undefined) {
      return res.status(400).send('All fields are required.');
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match.');
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).send('Password must be at least 8 characters long.');
    }

    // Ensure the user accepted the terms
    if (!terms) {
      return res.status(400).send('You must accept the terms and conditions.');
    }

    // Check if email is already registered
    const existingUser = await Student.findOne({ where: { email } });
    if (existingUser) return res.status(400).send('Email is already registered.');

    // Check if student ID is already registered
    const existingStudentId = await Student.findOne({ where: { studentId } });
    if (existingStudentId) return res.status(400).send('Student ID is already registered.');

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await Student.create({ firstName, lastName, email, studentId, program, password: hashedPassword });

    // Redirect to the studentDB page
    res.redirect('/studentDB'); 
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal server error.');
  }
});


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).send('All fields are required.');

    const user = await Student.findOne({ where: { email } });
    if (!user) return res.status(404).send('User not found.');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send('Invalid credentials.');

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Send token in a cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    res.redirect('/studentDB');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error.');
  }
});

export default router;
