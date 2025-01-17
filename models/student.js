import { DataTypes } from 'sequelize'; // Use ES module syntax for imports
import sequelize from '../config/config.js'; // Ensure `.js` file extensions are included

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  enrollment_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  profile_info: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
});

export default Student;
