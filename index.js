const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "employee_tracker_db",
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );

async function viewDepartments() {
    console.log('Viewing all departments');
    const response = await db.promise().query('SELECT * FROM department') 
    console.table(response[0]);
    console.log(`\n`);
    init();
};

async function viewRoles() {
    console.log('Viewing all roles');
}
async function viewEmployees() {
    console.log('Viewing all employees');
}
async function addDepartment() {
    console.log('You may now add a department');
}
async function addRole() {
    console.log('You may now add a role');
}
async function addEmployee() {
    console.log('You may now add an employee');
}
async function updateRole() {
    console.log('You may now update a role');
}
async function end() {
    console.log('end');
}

function init() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employess', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'End'],
        }
    ])
    .then((response) => {
        if (response.choices === 'View all departments') {
            viewDepartments();
        } else if (response.choices === 'View all roles') {
            viewRoles();
        } else if (response.choices === 'View all employess') {
            viewEmployees();
        } else if (response.choices === 'Add a department') {
            addDepartment();
        } else if (response.choices === 'Add a role') {
            addRole();
        } else if (response.choices === 'Add an employee') {
            addEmployee();
        } else if (response.choices === 'Update an employee role') {
            updateRole();
        } else {
            end();
        }
    })
};

init();
