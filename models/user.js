// Import necessary modules
import { DataTypes } from 'sequelize'; // Import DataTypes from sequelize for defining model attributes
import sequelize from '../config/config.js'; // Import the sequelize instance configured for the database
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// Define the User model using sequelize
const User = sequelize.define('User', {
  // Define the username attribute
  username: {
    type: DataTypes.STRING, // Set the data type to STRING
    allowNull: false, // This field cannot be null
    unique: false, // This field must be unique across all users
  },
  // Define the email attribute
  email: {
    type: DataTypes.STRING, // Set the data type to STRING
    allowNull: false, // This field cannot be null
    unique: true, // This field must be unique across all users
    validate: {
      isEmail: true, // Ensure the email format is valid
    },
  },
  // Define the password attribute
  password: {
    type: DataTypes.STRING, // Set the data type to STRING
    allowNull: false, // This field cannot be null
  },
  // Define the balance attribute
  balance: {
    type: DataTypes.FLOAT, // Set the data type to a decimal
    defaultValue: 0.0, // Set the default value to 0.0
  },
});



// Hook for hashing the password before saving a new user
User.beforeCreate(async (user) => {
  // Generate a salt for hashing
  const salt = await bcrypt.genSalt(10);
  // Hash the user's password with the generated salt
  user.password = await bcrypt.hash(user.password, salt);
});

// Instance method for validating the password
User.prototype.checkPassword = async function (password) {
  // Compare the provided password with the hashed password stored in the database
  return bcrypt.compare(password, this.password);
};

// Export the User model for use in other parts of the application
export default User;