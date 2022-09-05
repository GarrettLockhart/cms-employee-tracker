const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./config/connection');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
      if (answers.userSelection === 'Add an employee') {
        addEmployee();
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
        default: () => {},
        validate: function (name) {
          valid = /^[a-zA-Z\s]*$/.test(name);

          if (valid) {
            return true;
          } else {
            console.log('\nPlease enter only letters, and spaces');
            return false;
          }
        },
      },
    ])
    .then((departmentAnswer) => {
      db.promise()
        .query(
          `INSERT INTO department (name) VALUES ("${departmentAnswer.departmentName}")`
        )
        .then(([rows, fields]) => {
          console.log('\n');
          viewDepartments();
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
        default: () => {},
        validate: function (name) {
          valid = /^[a-zA-Z\s]*$/.test(name);

          if (valid) {
            return true;
          } else {
            console.log('\nPlease enter only letters, and spaces');
            return false;
          }
        },
      },
      {
        type: 'input',
        message: 'Please enter salary of the role you want to add:',
        name: 'salaryAmt',
        default: () => {},
        validate: function (salary) {
          valid = /^[1-9]+[0-9]*$/.test(salary);

          if (valid) {
            return true;
          } else {
            console.log('\nPlease enter only numbers, no commas or spaces');
            return false;
          }
        },
      },
      {
        type: 'input',
        message: 'Please enter a department id (number):',
        name: 'departmentId',
        default: () => {},
        validate: function (salary) {
          valid = /^[1-9]+[0-9]*$/.test(salary);

          if (valid) {
            return true;
          } else {
            console.log('\nPlease enter only numbers, no commas or spaces');
            return false;
          }
        },
      },
    ])
    .then((roleAnswer) => {
      db.promise()
        .query(
          `INSERT INTO role (title, salary, department_id) VALUES ("${roleAnswer.roleName}", "${roleAnswer.salaryAmt}", "${roleAnswer.departmentId}")`
        )
        .then(([rows, fields]) => {
          console.log('\n');
          viewRoles();
          runInquirer();
        })
        .catch(console.log);
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please enter the first name of the employee you want to add:',
        name: 'employeeFirstName',
        default: () => {},
        validate: function (name) {
          valid = /^[a-zA-Z\s]*$/.test(name);

          if (valid) {
            return true;
          } else {
            console.log('\nPlease enter only letters, and spaces');
            return false;
          }
        },
      },
      {
        type: 'input',
        message: 'Please enter the last name of the employee you want to add:',
        name: 'employeeLastName',
        default: () => {},
        validate: function (name) {
          valid = /^[a-zA-Z\s]*$/.test(name);

          if (valid) {
            return true;
          } else {
            console.log('\nPlease enter only letters, and spaces');
            return false;
          }
        },
      },
      {
        type: 'input',
        message:
          'Please enter the role ID of the employee you want to add (number):',
        name: 'employeeRoleId',
        default: () => {},
        validate: function (salary) {
          valid = /^[1-9]+[0-9]*$/.test(salary);

          if (valid) {
            return true;
          } else {
            console.log('\nPlease enter only numbers, no commas or spaces');
            return false;
          }
        },
      },
      {
        type: 'input',
        message: 'Please enter the ID of the employees manager (number):',
        name: 'employeeManagerId',
        default: () => {},
        validate: function (salary) {
          valid = /^[1-9]+[0-9]*$/.test(salary);

          if (valid) {
            return true;
          } else {
            console.log('\nPlease enter only numbers, no commas or spaces');
            return false;
          }
        },
      },
    ])
    .then((employeeAnswer) => {
      db.promise()
        .query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employeeAnswer.employeeFirstName}", "${employeeAnswer.employeeLastName}", "${employeeAnswer.employeeRoleId}", "${employeeAnswer.employeeManagerId}")`
        )
        .then(([rows, fields]) => {
          console.log('\n');
          viewEmployees();
          runInquirer();
        })
        .catch(console.log);
    });
};

const viewDepartments = () => {
  db.promise()
    .query('SELECT id AS ID, name AS "Department Name" FROM department')
    .then(([rows, fields]) => {
      console.log('\n');
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
      console.log('\n');
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
      console.log('\n');
      console.table(rows);
      runInquirer();
    })
    .catch(console.log);
};

app.listen(PORT, () => {
  console.log(`\nServer is listening on http://localhost:${PORT}`);
});

runInquirer();
