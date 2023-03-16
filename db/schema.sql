DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    department_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    role_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee (employee_id),
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role (role_id)
);