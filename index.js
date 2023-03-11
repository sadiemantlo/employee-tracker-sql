const inquirer = require('inquirer');
const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateRole,
    end
} = require('./choices.js');

function intit() {
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

intit();
