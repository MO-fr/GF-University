// Import necessary modules
import { DataTypes } from 'sequelize'; // Import DataTypes from sequelize for defining model attributes
import sequelize from '../config/config.js'; // Import the sequelize instance configured for the database

const Student = sequelize.define(
  'student',
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
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    studentId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        len: [6, 20],
      },
    },
    program: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isIn: [[
              'cs', 
              'business', 
              'engineering', 
              'arts', 
              'biology', 
              'chemistry', 
              'physics', 
              'mathematics', 
              'psychology', 
              'education', 
              'nursing', 
              'accounting', 
              'marketing', 
              'finance', 
              'economics', 
              'sociology', 
              'political-science', 
              'history', 
              'philosophy', 
              'journalism', 
              'communications', 
              'architecture', 
              'design', 
              'film', 
              'music', 
              'theatre', 
              'law', 
              'environmental-science', 
              'public-health', 
              'social-work', 
              'criminal-justice', 
              'information-systems', 
              'software-engineering', 
              'cybersecurity', 
              'data-science', 
              'astronomy', 
              'geology', 
              'anthropology', 
              'linguistics', 
              'special-education', 
              'international-relations', 
              'hospitality', 
              'sports-management'
          ]],
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
    timestamps: false, // Automatically add createdAt and updatedAt fields
  }
);


export default Student;
