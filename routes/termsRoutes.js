import express from 'express';
const router = express.Router();

// Define the route for the login page
router.get('/terms', (req, res) => {
  res.render('terms'); // Render 'login.ejs'
});

export default router;
