const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log('Connection established.')
);

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Please select the data you would like to view:',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update an employee manager',
        'View employees by department',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'View department budgets',
        'No Action',
      ],
      name: 'userSelection',
    },
  ])
  .then((answers) => {
    if (answers.userSelection === 'View all departments') {
      viewDepartments();
    }
  });

const viewDepartments = () => {
  db.query(`SELECT * FROM departments`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
};

app.listen(PORT, () => {
  console.log(`\nServer is listening on http://localhost:${PORT}`);
});
