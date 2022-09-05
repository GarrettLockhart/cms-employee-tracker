INSERT INTO department (name)
VALUES 
('Friends'),
('Superhero'),
('Villan'),
('Family');

INSERT INTO role (title, salary, department_id)
VALUES
('Siper-Man', 95000, 2),
('Doctor Octopus', 110000, 3),
('Green Goblin', 65000, 3), 
('Sandman', 125000, 3),
('Spider-man Comic', 75000, 2), 
('Aunt', 55000, 4),
('Uncle', 112000, 4),
('Girlfriend', 94000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Peter', 'Parker', 1, 3),
('Miles', 'Morales', 5, 5),
('Mary', 'Jane', 8, null),
('Uncle', 'Ben', 7, 5),
('Aunt', 'May', 6, null),
('Otto', 'Octavius', 2, null),
('Norman', 'Osborn', 3, null),
('Willan', 'Baker', 4, null);