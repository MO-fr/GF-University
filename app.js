import express from 'express';
import cookieParser from 'cookie-parser';
import sequelize from './config/config.js'; // Import Sequelize instance
import path from 'path';
import { fileURLToPath } from 'url';
import primeRoute from './routes/primeRoute.js';

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express(); // Initialize Express app

// Middleware setup
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(cookieParser()); // Middleware for handling cookies

// EJS setup
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', path.join(__dirname, 'views')); // Define views directory

// Static file setup (for CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', primeRoute); // Use primeRoute for handling main routes

// Visitor page route
app.get('/', (req, res) => {
  res.render('visitorDB'); // Render the visitor dashboard
});

// Student dashboard route
app.get('/studentDB', (req, res) => {
  res.render('studentDB'); // Render the student dashboard
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
    process.exit(1); // Exit process on failure
  }
};

// Start the app
startServer();
