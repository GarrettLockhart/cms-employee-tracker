const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const runInquirer = () => {
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
      // const { choices } = answers.userSelection;

      if (answers.userSelection === 'View all departments') {
        viewDepartments();
      }
      if (answers.userSelection === 'View all roles') {
        viewRoles();
      }
      if (answers.userSelection === 'View all employees') {
        viewEmployees();
      }
      if (answers.userSelection === 'Add a department') {
        addDepartment();
      }
      if (answers.userSelection === 'Add a role') {
        addRole();
      }
      if (answers.userSelection === 'Add a role') {
        addRole();
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please enter the name of the department you want to add:',
        name: 'departmentName',
      },
    ])
    .then((departmentAnswer) => {
      db.promise()
        .query(
          `INSERT INTO department (name) VALUES ("${departmentAnswer.departmentName}")`
        )
        .then(([rows, fields]) => {
          runInquirer();
        })
        .catch(console.log);
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please enter the title of the role you want to add:',
        name: 'roleName',
      },
      {
        type: 'input',
        message: 'Please enter salary of the role you want to add:',
        name: 'salaryAmt',
      },
    ])
    .then((roleAnswer) => {
      db.promise()
        .query(
          `INSERT INTO department (name) VALUES ("${roleAnswer.roleName}", "${roleAnswer.salaryAmy})`
        )
        .then(([rows, fields]) => {
          runInquirer();
        })
        .catch(console.log);
    });
};

const viewDepartments = () => {
  db.promise()
    .query('SELECT id AS ID, name AS "Department Name" FROM department')
    .then(([rows, fields]) => {
      console.table(rows);
      runInquirer();
    })
    .catch(console.log);
};

const viewRoles = () => {
  db.promise()
    .query(
      'SELECT id AS "Role ID", title AS "Role Title", salary AS Salary FROM role'
    )
    .then(([rows, fields]) => {
      console.table(rows);
      runInquirer();
    })
    .catch(console.log);
};

const viewEmployees = () => {
  db.promise()
    .query(
      'SELECT id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name", role_id AS "Role ID", manager_id AS "Manager ID" FROM employee'
    )
    .then(([rows, fields]) => {
      console.table(rows);
      runInquirer();
    })
    .catch(console.log);
};

app.listen(PORT, () => {
  console.log(`\nServer is listening on http://localhost:${PORT}`);
});

runInquirer();
