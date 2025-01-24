import express from 'express';
const router = express.Router();

// Define the route for the login page
router.get('/sign-in', (req, res) => {
  res.render('sign-in'); // Render 'studentDB.ejs'
});

export default router;
