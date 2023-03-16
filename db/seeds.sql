USE employee_tracker_db;

INSERT INTO department (department_name)
VALUES ('Engineering'),
        ('Sales'),
        ('Law');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 75250, 1),
        ('Salesperson', 52340, 2),
        ('Attorney', 82355, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Sadie', 'Mantlo', NULL, 1),
        ('Jesse', 'Kardon', 1, 2),
        ('Isabelle', 'Rezazadeh', 1, 3);

