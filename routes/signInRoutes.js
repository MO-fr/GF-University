import express from 'express';
const router = express.Router();

// Define the route for the sign-in page
router.get('/studentDB', (req, res) => {
  res.render('studentDB'); // Render 'sign-in.ejs'
});

export default router;
