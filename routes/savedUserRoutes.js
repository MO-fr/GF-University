import express from 'express';
import bcrypt from 'bcrypt'
import Student from '../models/student.js' 

const router = express.Router(); 

router.post('/sign-in', async (req, res) => {
    // Destructuring values from the request body
    const { firstName, lastName, email, studentId, program, password, terms } = req.body;

    try {
        // Check if all required fields are provided
        if (!firstName || !lastName || !email || !studentId || !program || !password || terms === undefined) {
            return res.status(400).send('All fields are required.'); // Respond with an error if any field is missing
        }
                                    
        // Check if the password meets the minimum length requirement
        if (password.length < 8) {
            return res.status(400).send('Password must be at least 8 characters long.');
        }

        // Check if the terms and conditions are accepted
        if (!terms) {
            return res.status(400).send('You must accept the terms and conditions.');
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send('Email is already registered.');
        }

        // Check if the student ID is already registered
        const existingStudentId = await User.findOne({ where: { studentId } });
        if (existingStudentId) {
            return res.status(400).send('Student ID is already registered.');
        }

        // Create a new user in the database
        const newUser = await User.create({ firstName, lastName, email, studentId, program, password });

        // Redirect to the login page after successful signup
        res.redirect('/studentDB');
    } catch (error) {
        // Log any errors that occur during signup
        console.error('Error during signup:', error);
        res.status(500).send('Internal server error.');
    }
});
  

router.post('/login', async (req, res) => {
    // Destructuring email and password from the request body
    const { email, password } = req.body;
});

export default router;

