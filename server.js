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
      if (answers.userSelection === 'Update an employee role') {
        updateEmployeeRole();
      }
      if (answers.userSelection === 'Update an employee manager') {
        updateEmployeeManager();
      }
      if (answers.userSelection === 'View employees by department') {
        viewEmployeeByDepartment();
      }
      if (answers.userSelection === 'No Action') {
        connectionEnd();
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
        })
        .catch(console.log);
    });
};

const updateEmployeeManager = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message:
          'Please enter the employee ID you would like to update (number):',
        name: 'employeeIdSelection',
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
        message:
          'Please enter the ID of the manager you would like to give this employee (number):',
        name: 'employeeNewManagerId',
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
    .then((employeeSelection) => {
      db.promise()
        .query(
          `UPDATE employee SET manager_id = ${employeeSelection.employeeNewManagerId} WHERE id = ${employeeSelection.employeeIdSelection}`
        )
        .then(([rows, fields]) => {
          console.log('\n');
          viewEmployees();
        })
        .catch(console.log);
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message:
          'Please enter the employee ID you would like to update (number):',
        name: 'employeeIdSelection',
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
        message:
          'Please enter the ID of the role you would like to give this employee (number):',
        name: 'employeeNewRoleId',
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
    .then((employeeSelection) => {
      db.promise()
        .query(
          `UPDATE employee SET role_id = ${employeeSelection.employeeNewRoleId} WHERE id = ${employeeSelection.employeeIdSelection}`
        )
        .then(([rows, fields]) => {
          console.log('\n');
          viewEmployees();
        })
        .catch(console.log);
    });
};

const viewEmployeeByDepartment = () => {
  db.promise()
    .query(
      `SELECT employee.first_name AS "First Name",
      employee.last_name AS "Last Name", 
      department.name AS Department
      FROM employee 
      LEFT JOIN role ON employee.role_id = role.id 
      LEFT JOIN department ON role.department_id = department.id`
    )
    .then(([rows, fields]) => {
      console.log('\n');
      console.table(rows);
      runInquirer();
    })
    .catch(console.log);
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
      `SELECT id AS "Employee ID", 
      first_name AS "First Name", 
      last_name AS "Last Name", 
      role_id AS "Role ID", 
      manager_id AS "Manager ID" 
      FROM employee`
    )
    .then(([rows, fields]) => {
      console.log('\n');
      console.table(rows);
      runInquirer();
    })
    .catch(console.log);
};

const connectionEnd = () => {
  console.log('Thanks, run "npm start" if you would like to go again.');
  server.close((err) => {
    console.log('Server has been closed');
    process.exit(err ? 1 : 0);
  });
};

const server = app.listen(PORT, () => {
  console.log(`\nServer is listening on http://localhost:${PORT}`);
});

runInquirer();
