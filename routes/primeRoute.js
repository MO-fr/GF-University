import express from 'express';
import bcrypt from 'bcrypt'; // Library to securely hash passwords
import jwt from 'jsonwebtoken'; // Library to create secure login tokens
import Student from '../models/student.js'; // Import the Student model

const router = express.Router(); // Create a router to handle different web requests

// Routes to render pages (these show web pages when users visit these links)
router.get('/sign-in', (req, res) => res.render('sign-in')); // Show the sign-up page
router.get('/login', (req, res) => res.render('login')); // Show the login page
router.get('/studentDB', (req, res) => res.render('studentDB')); // Show the student dashboard
router.get('/terms', (req, res) => res.render('terms')); // Show the terms and conditions page
router.get('/course', (req, res) => res.render('course')); // Show the course registration page
router.get('/calendar', (req, res) => res.render('calendar')); // Show the event calendar
router.get('/visitCalendar', (req, res) => res.render('visitCalendar')); // Show a calendar for visitors

// Another route to show the student dashboard (this is for form submissions)
router.post('/studentDB', (req, res) => {
  res.render('studentDB');
});

// Sign-up route (when a new student registers)
router.post('/sign-in', async (req, res) => {
  // Get data from the form
  const { firstName, lastName, email, studentId, program, password, confirmPassword, terms } = req.body;

  try {
    // Make sure all required fields are filled out
    if (!firstName || !lastName || !email || !studentId || !program || !password || !confirmPassword || terms === undefined) {
      return res.status(400).send('All fields are required.');
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match.');
    }

    // Password must be at least 8 characters long
    if (password.length < 8) {
      return res.status(400).send('Password must be at least 8 characters long.');
    }
                                      
    // Make sure the user agreed to the terms and conditions
    if (!terms) {
      return res.status(400).send('You must accept the terms and conditions.');
    }

    // Check if the email is already in use
    const existingUser = await Student.findOne({ where: { email } });
    if (existingUser) return res.status(400).send('Email is already registered.');

    // Check if the student ID is already taken
    const existingStudentId = await Student.findOne({ where: { studentId } });
    if (existingStudentId) return res.status(400).send('Student ID is already registered.');

    // Securely hash (scramble) the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new student account in the database
    const newUser = await Student.create({ 
      firstName: firstName, 
      lastName: lastName, 
      email: email, 
      studentId: studentId,  
      program: program,  
      password: hashedPassword 
    });

    // Redirect to the student dashboard after successful sign-up
    res.redirect('/studentDB'); 
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal server error.');
  }
});

// Login route (when an existing student logs in)
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Get login details from the form

  try {
    // Make sure both email and password are entered
    if (!email || !password) {
      return res.status(400).send('All fields are required.');
    }

    // Find the student in the database using their email
    const student = await Student.findOne({ where: { email } });

    // If no student is found, send an error message
    if (!student) {
      return res.status(404).send('Student not found.');
    }

    // Compare the entered password with the stored hashed password
    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) {
      return res.status(400).send('Invalid credentials.');
    }

    // Create a login token that expires in 1 hour
    const token = jwt.sign({ userId: student.id, email: student.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Send the token as a cookie (this keeps the user logged in)
    res.cookie('auth_token', token, {
      httpOnly: true, // Prevents hackers from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Only secure in real-world applications
      maxAge: 3600000, // 1 hour
    });

    // Redirect to the student dashboard
    res.redirect('/studentDB');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error.');
  }
});

export default router;
