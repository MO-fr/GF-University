const { Sequelize, DataTypes } = require('sequelize');

// Database connection details (you can replace these with your actual details)
const sequelize = new Sequelize('mysql://user:password@localhost:3306/database_name');  // Replace with your DB connection string

// Define models (replace with your actual model definitions)

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {});

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  profile_info: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  enrollment_status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {});

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  schedule: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {});

const Fee = sequelize.define('Fee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {});

// Define relationships
Student.hasMany(Course);
Course.belongsTo(Student);
Fee.belongsTo(Student);

// Function to create tables and run migrations
const runMigrations = async () => {
  try {
    // Authenticate and check the database connection
    await sequelize.authenticate();
    console.log('Connection established.');

    // Synchronize all models (creates tables if they don't exist)
    await sequelize.sync({ force: true });  // Use force: true to drop tables and recreate them (ideal for fresh migrations)
    console.log('Database synced successfully.');

    // Optionally, insert default data after migration
    // Insert sample data (optional)
    await User.create({
      role: 'student',
      username: 'student1',
      password: 'securepassword',
    });

    const student = await Student.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      profile_info: 'Information about John',
      enrollment_status: 'enrolled',
    });

    await Course.create({
      title: 'Computer Science 101',
      description: 'Intro to Computer Science',
      schedule: 'MWF 9:00 AM - 10:30 AM',
      studentId: student.id,
    });

    await Fee.create({
      amount: 500,
      status: 'paid',
      payment_date: new Date(),
      studentId: student.id,
    });

    console.log('Sample data inserted successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    // Close the connection after migration is done
    await sequelize.close();
    console.log('Connection closed.');
  }
};

// Run migrations
runMigrations();
