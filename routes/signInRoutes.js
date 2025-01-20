import express from 'express';
const router = express.Router();

// Define the route for the sign-in page
router.get('/sign-in', (req, res) => {
  res.render('sign-in'); // Render 'sign-in.ejs'
});

export default router;
