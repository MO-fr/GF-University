import express from 'express';
const router = express.Router();

// Define the route for the login page
router.get('/studentDB', (req, res) => {
  res.render('studentDB'); // Render 'studentDB.ejs'
});

export default router;
