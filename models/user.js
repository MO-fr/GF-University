// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING,  // 'student', 'faculty', 'admin'
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {});
  
    User.associate = (models) => {
      // One-to-one relationship with Student (if a user is a student)
      User.hasOne(models.Student, { foreignKey: 'userId', as: 'student' });
  
      // You can add other associations for faculty/admin if needed.
    };
  
    return User;
  };