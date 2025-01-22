import express from 'express';
import Student from '../models/student.js'

const router = express.Router();

router.post('/sign-up', async (req, res) => {
    // Destructuring username, email, and password from the request body
    const {firstName, lastName, email, studentId, program, password, termsAccepted  } = req.body;

});

router.post('/login', async (req, res) => {
    // Destructuring email and password from the request body
    const { email, password } = req.body;
});

export default Student;

