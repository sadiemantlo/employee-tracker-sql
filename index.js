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
    init();
};

async function viewRoles() {
    console.log('Viewing all roles');
    const response = await db.promise().query('SELECT * FROM role')
    console.table(response[0]);
    init();
};

async function viewEmployees() {
    console.log('Viewing all employees');
    const response = await db.promise().query('SELECT * FROM employee')
    console.table(response[0]);
    init();
};

async function addDepartment() {
    console.log('You may now add a department');
    const prompt = await inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What department would you like to add?',
        }
    ])
    if (prompt) {
        const response = db.promise().query('INSERT INTO department (department_name) VALUES (?)', prompt.addDepartment);
        console.log('Department successfully added!');
        const table = await db.promise().query('SELECT * FROM department');
        console.table(table[0]);
    }
    init();
};

async function addRole() {
    console.log('You may now add a role');
    const role = await db.promise().query("SELECT * FROM department;");
    const deptArray = role[0].map(({ department_id, department_name }) => ({ name: department_name, value: department_id }));
    const prompt = await inquirer.prompt([
        {
            type: 'input',
            name: 'addRole',
            message: 'What role would you like to add?',
        },
        {
            type: 'input',
            name: 'addedSalary',
            message: 'What is the salary for this role?', 
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does this role belong in?',
            // sets department to the new role
            choices: deptArray, 
        }
    ])
    if (prompt) {
        const response = db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${prompt.addRole}', '${prompt.addedSalary}', '${prompt.department}')`);
        console.log('Role successfully added!');
        const table = await db.promise().query('SELECT * FROM role');
        console.table(table[0]);
    }
    init();
};

async function addEmployee() {
    console.log('You may now add an employee');
    const departments = await db.promise().query("SELECT * FROM department;");
    const deptArray = departments[0].map(({ department_id, department_name }) => ({ name: department_name, value: department_id }));
    const roles = await db.promise().query('SELECT * FROM role;');
    const roleArray = roles[0].map(({ role_id, title }) => ({ name: title, value: role_id}));
    const prompt = await inquirer.prompt([
        {
            type: 'input',
            name: 'addEmployeeFirst',
            message: 'What is the first name of the employee you would like to add?',
        },
         {
            type: 'input',
            name: 'addEmployeeLast',
            message: 'What is the last name of the employee you would like to add?',
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does this employee belong in?',
            // choose the dept employee is in
            choices: deptArray, 
        },
        {
            type: 'list',
            name: 'role',
            message: 'What role does this employee have?',
            // chooses the role the new employee has
            choices: roleArray, 
        },
        {
            type: 'input',
            // sets the manager for the new employee
            name: 'managerId', 
            message: "What is id of this employee's manager?", 
        }
    ])
    if (prompt) {
        const response = db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${prompt.addEmployeeFirst}', '${prompt.addEmployeeLast}', '${prompt.role}', '${prompt.managerId}')`);
        console.log('Employee successfully added!');
        const table = await db.promise().query('SELECT * FROM employee');
        console.table(table[0]);
    }
    init();
};

async function updateRole() {
    console.log("You may now update an employee's role");
    const employee = await db.promise().query("SELECT * FROM employee");
    const employeeArray = employee[0].map(({ employee_id, first_name }) => ({ name:  first_name, value: employee_id }));
    const roles = await db.promise().query('SELECT * FROM role;');
    const roleArray = roles[0].map(({ role_id, title }) => ({ name: title, value: role_id}));
    const prompt = await inquirer.prompt([
        {
            type: 'list',
            name: 'chooseEmployee',
            message: "Which employee's role would you like to update?",
            // selects the employee
            choices: employeeArray, 
        },
        {
            type: 'list',
            name: 'updateRole',
            message: 'What would you like to change their role too?',
            // sets new role
            choices: roleArray, 
        },
    ])
    if (prompt) {
        const response = db.promise().query(`UPDATE employee SET role_id = ${prompt.updateRole} WHERE employee_id = ${prompt.chooseEmployee};`);
        console.log('Employee role successfully updated!');
        const table = await db.promise().query('SELECT * FROM employee');
        console.table(table[0]);
    }
    init();
};

function init() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        }
    ])
    .then((response) => {
        if (response.choices === 'View all departments') {
            viewDepartments();
        } else if (response.choices === 'View all roles') {
            viewRoles();
        } else if (response.choices === 'View all employees') {
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
