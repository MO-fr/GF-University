// // Import the jsonwebtoken library for handling JWTs
// import jwt from 'jsonwebtoken';

// // Middleware function to authenticate the token
// const authenticate = (req, res, next) => {
//   // Retrieve the token from the cookies of the incoming request
//   const token = req.cookies.auth_token;

//   // Check if the token is not present
//   if (!token) {
//     // If no token is found, respond with a 401 status and redirect to the login page
//     return res.status(401).redirect('/login'); // Redirect if no token
//   }

//   // Verify the token using the secret key stored in environment variables
//   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//     // If there is an error during verification (e.g., token is invalid or expired)
//     if (err) {
//       console.error('Token verification failed:', err.message);
//       // Respond with a 403 status and an error message
//       return res.status(403).send('Invalid or expired token. Please log in again.');
//     }

//     // If the token is valid, attach the user data to the request object
//     req.user = user; // Attach user data to request object
//     // Call the next middleware function in the stack
//     next();
//   });
// };

// // Export the authenticateToken middleware for use in other parts of the application
// export default authenticate;