// models/Course.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,  // Ensure no duplicate course codes
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'courses', // Table name in the database
  timestamps: true,  // Disable automatic creation of timestamps
});

export default Course;
