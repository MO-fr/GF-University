// Import necessary modules
import { DataTypes } from 'sequelize'; // Import DataTypes from sequelize for defining model attributes
import sequelize from '../config/config.js'; // Import the sequelize instance configured for the database
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// Define the User model using sequelize
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'; // For hashing passwords
import sequelize from './config/config.js'; // Adjust the path to your Sequelize instance

const Student = sequelize.define(
  'Student',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [6, 20],
      },
    },
    program: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['cs', 'business', 'engineering', 'arts']],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], // Enforce password length
      },
    },
    termsAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'students', // Table name in the database
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hook for hashing the password before saving a new student
Student.beforeCreate(async (student) => {
  const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
  student.password = await bcrypt.hash(student.password, salt); // Hash the password with the salt
});

// Instance method for validating the password
Student.prototype.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare provided password with stored hash
};

export default Student;
