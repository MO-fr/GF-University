import express from 'express';
const router = express.Router();

// Define the route for the login page
router.get('/login', (req, res) => {
  
  res.render('login'); // Render 'login.ejs'

});

router.post('/login', (req, res) => {
  
  // get email, get the password 
  // check email match 
  // check password match 
  // login or redirect 
  res.render('login'); // Render 'login.ejs'

});

export default router;
