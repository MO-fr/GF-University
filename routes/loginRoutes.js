import express from 'express';
const router = express.Router();

// Define the route for the login page
router.get('/login', (req, res) => {
  res.render('login'); // Render 'login.ejs'
});

export default router;
