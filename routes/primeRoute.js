import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/student.js'; // Ensure this is the correct model
import course from '../models/course.js'; // Ensure this is thert cou from '../models/user.js'; // Ensure this is the

const router = express.Router();

// Render pages
router.get('/sign-in', (req, res) => res.render('sign-in'));
router.get('/login', (req, res) => res.render('login'));
router.get('/studentDB', (req, res) => res.render('studentDB'));
router.get('/terms', (req, res) => res.render('terms')); 
router.get('/course', (req, res) => res.render('course'))
router.get('/calendar', (req, res)  => res.render('calendar'))
router.get('/visitCalendar', (req, res)  => res.render('visitCalendar'))

router.post('/studentDB', (req, res) => {
  res.render('studentDB');
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
    const newUser = await Student.create({ 
      firstName: firstName, 
      lastName: lastName, 
      email: email, 
      studentId: studentId,  
      program: program,  
      password: hashedPassword 
    });


    // Redirect to dashboard
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
    if (!email || !password) {
      return res.status(400).send('All fields are required.');
    }

    // Find the student by email
    const student = await Student.findOne({ where: { email } });

    if (!student) {
      return res.status(404).send('Student not found.');
    }

    // Compare the provided password with the stored hash
    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) {
      return res.status(400).send('Invalid credentials.');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: student.id, email: student.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Send token in a cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    // Redirect to student dashboard
    res.redirect('/studentDB');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error.');
  }
});


export default router;
