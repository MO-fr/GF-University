# Greenfield University

Greenfield University is a college registration site for students that includes features such as course registration, student authentication, and a dashboard for users. It uses Sequelize for ORM with a MySQL database, and is built using Node.js, Express, and EJS. The frontend includes Tailwind CSS for styling.

## Project Setup

### 1. Install Dependencies

To get started, clone the repository and install the required dependencies.

```bash
git clone (https://github.com/MO-fr/GF-University.git)
cd Greenfield-University
npm install
```
## 2. Environment Configuration  
Create a `.env` file in the root of the project and add the following configuration:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
```

### 3. Database Setup

Greenfield University uses Sequelize with MySQL for database management. Make sure to have a MySQL instance running. The project uses `sequelize.sync({ alter: true })` to synchronize models with the database. If necessary, change this to `sequelize.sync()` for a fresh start (be cautious as this can drop data).

### 4. Start the server

`npm start`



### Important Notes:
**DB = Dashboard, NOT Database**: Please note that DB refers to the dashboard in this project, not the database. This distinction is important to avoid confusion, as mentioned by the project lead.

## Features
- **Student Authentication**: The app includes authentication for students to register and log in.
- **Course Registration**: Students can register for courses through the dashboard.
- **Campus Event Calendar**: Users can view, add, and manage campus events through the calendar.
- **Dynamic Event Management**: The system allows adding events with details like title, description, date, and category.

## Technology Stack
- **Backend**: Node.js, Express.js
- **ORM**: Sequelize
- **Database**: MySQL
- **Frontend**: EJS, Tailwind CSS
- **Authentication**: Cookie-based session management

## Usage
- Visit `http://localhost:3000` for public access to the visitor page.
- Navigate to the student dashboard at `/studentDB` after logging in.
- View and manage campus events, add new events, and register for courses through the dashboard.




