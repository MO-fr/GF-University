import express from 'express';
const router = express.Router();

// Define the route for the login page
router.get('/sign-in', (req, res) => {
  res.render('te'); // Render 'login.ejs'
});

export default router;
