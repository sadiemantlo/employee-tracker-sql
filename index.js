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
    console.log('\n');
    init();
};

async function viewRoles() {
    console.log('Viewing all roles');
    const response = await db.promise().query('SELECT * FROM role')
    console.table(response[0]);
    console.log('\n');
    init();
}
async function viewEmployees() {
    console.log('Viewing all employees');
    const response = await db.promise().query('SELECT * FROM employee')
    console.table(response[0]);
    console.log('\n');
    init();
}
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
        const results = db.promise().query('INSERT INTO department (department_name) VALUES (?)', prompt.addDepartment);
        console.log('Department successfully added!');
        console.table(results);
    }
    init();
};

async function addRole() {
    console.log('You may now add a role');
    const role = await db.promise().query("SELECT * FROM department;");
    const deptArray = role[0].map(({ department_id, department_name }) => ({ name: department_name, value: department_id }));
    console.log(deptArray);
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
            choices: deptArray,
        }
    ])
    if (prompt) {
        const results = db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${prompt.addRole}', '${prompt.addedSalary}', '${prompt.department}')`);
        console.log('Role successfully added!');
        console.table(results);
    }
    init();
}
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
            choices: deptArray,
        },
        {
            type: 'list',
            name: 'role',
            message: 'What role does this employee belong have?',
            choices: roleArray,
        }

    ])
    if (prompt) {
        const results = db.promise().query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${prompt.addEmployeeFirst}', '${prompt.addEmployeeLast}', '${prompt.role}')`);
        console.log('Employee successfully added!');
        console.table(results);
    }
    init();
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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'End'],
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
