DROP DATABASE IF EXISTS workforce_db;
CREATE DATABASE workforce_db;

\c workforce_db;

--departments roles and employees
--departments have names and ids
--roles have titles, ids, departments, and salaries
--employees have ids , first name, last name, job title, dpeartments, salaries, and managers
--so, there are departments, staffed by roles, filled by people
CREATE TABLE departments (
    id serial primary key,
    dep_name varchar(30),
);

CREATE TABLE roles(
    id serial primary key,
    role_name varchar(30),
    salary integer,
    dep_id integer,
    foreign key (dep_id) references departments(id) on delete cascade
    --if a dep is deleted, the job is deleted
);

CREATE TABLE employees(
    id serial primary key,
    first_name varchar(25),
    last_name varchar(25),
    --job title is role_name
    --salary is roles' salary
    manager varchar(25),
    dep_id integer,
    role_id integer,
    foreign key (dep_id) references departments(id) on delete cascade,
    foreign key (role_id) references roles(id) on delete cascade
);