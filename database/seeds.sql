INSERT INTO departments (dep_name) VALUES 
    ('Marketing'),
    ('Manufacturing'),
    ('Sales');

INSERT INTO roles (role_name, salary, dep_id) VALUES
    ('Designer', 10, 1),
    ('Machinest', 15, 2),
    ('Door to Door', 13, 3);


INSERT INTO employees 
    (first_name, last_name, manager, dep_id, role_id) VALUES
    ('John', 'Smith', 'Larry', 1, 1),
    ('Jane', 'Doe', 'Steve', 2, 2);


select * from departments;
select * from roles;
select * from employees;

-- select employees.first_name, employees.last_name, manager, departments.dep_name
--     from employees 
--     join departments on employees.dep_id = departments.id;
-- select id, salary from roles where  role_name = 'Designer';
-- update employees set first_name = 'Bob' where id = 1;
-- select * from employees;
