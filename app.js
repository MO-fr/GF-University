import express from 'express';
import cookieParser from 'cookie-parser';
import sequelize from './config/config.js'; // Import Sequelize instance
import path from 'path';
import { fileURLToPath } from 'url';
import signInRoutes from './routes/signInRoutes.js';
import loginRoutes from './routes/loginRoutes.js'
import termsRoutes from './routes/termsRoutes.js'
import studentDBRoutes from './routes/studentDBRoutes.js'

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Initialize Express app

app.use('/', signInRoutes);  // Mount sign-in routes on '/'
app.use('/', loginRoutes);  // Mount login routes on '/'
app.use('/', termsRoutes); // Mount terms routes on '/' 
app.use('/', studentDBRoutes); // Mount student routes on '/'

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware for handling cookies

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static file setup (for CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Default route (renders your single EJS page)
app.get('/', (req, res) => {
  res.render('visitorDB', { title: 'Welcome', message: 'This is your starter EJS page!' });
});


// Route for the sign-in page
app.get('/sign-in', (req, res) => {
  res.render('sign-in'); // Render the 'sign-in.ejs' page
});

app.get('/login', (req, res) => {
  res.render('login'); // Render the 'login.ejs' page
  });

  app.get('/studentDB', (req, res) => {
    res.render('studentDB'); // Render the 'login.ejs' page
    });


// Database and server initialization
const startServer = async () => {
  try {
    // Authenticate the database connection
    await sequelize.authenticate();
    console.log('Database connection successful.');

    // Synchronize models (use { alter: true } for non-destructive updates)
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

// Start the app
startServer();
