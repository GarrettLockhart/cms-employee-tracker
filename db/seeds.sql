INSERT INTO department (name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 95000, 1),
('Software Engineer', 110000, 1),
('Accountant', 65000, 2), 
('Finanical Analyst', 125000, 2),
('Marketing Coordindator', 75000, 3), 
('Sales Lead', 55000, 3),
('Project Manager', 112000, 4),
('Operations Manager', 94000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Peter', 'Parker', 2, null),
('Miles', 'Morales', 1, 1),
('Mary', 'Jane', 4, null),
('Uncle', 'Ben', 3, 3),
('Aunt', 'May', 6, null),
('Otto', 'Octavius', 5, 5),
('Norman', 'Osborn', 7, null),
('Harry', 'Osborn', 8, 7);