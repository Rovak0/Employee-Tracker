//need to use inquirer to ask questions, then postgres to answer those questions
// const express = require('express');
const { Pool } = require('pg');
const inquirer = require('inquirer');

//don't actually need a server
//normal express set up
// const PORT = process.env.PORT || 3001;
// const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


//postgres set up
const pool = new Pool(
    {
        user: 'postgres',
        password: 'TestTest', //NO, my supersecret password!
        host: 'localhost',
        database: 'workforce_db'
    },
    console.log('Connected to the workforce database')
)
pool.connect();

//what are the choices on what to do?
const instructionChoices = ['View all departments', 'View all roles', 'View all employees', 
    'Add a department', 'Add a role', 'Add an employee',
    'Update an employee role'
];

inquirer
    .prompt([
        {
            type: 'list',
            name : 'instructions',
            message: 'What would you like to do?',
            choices: instructionChoices
        }
    ])
    .then((data) => {
        //read data.instructions to find out what to do next
        //bunch of if statements
        // console.log(data.instructions);
        if(data.instructions === 'View all departments'){
            pool.query('select * from departments', function (err, {rows}) {
                console.table(rows);
            })
        }
        else if(data.instructions === 'View all roles'){
            pool.query('select * from roles', function (err, {rows}) {
                console.table(rows);
            })
        }
        else if(data.instructions === 'View all employees'){
            pool.query('select * from employees', function (err, {rows}) {
                console.table(rows);
            })
        }
        else if(data.instructions === 'Add a department'){
            inquirer
                .prompt([
                    {
                        type: 'input', 
                        name: 'newDepName',
                        message: 'What is the new department name?'
                    }
                ])
                .then((data) => {
                    pool.query('INSERT INTO departments (dep_name) VALUES ($1)', [data.newDepName])
                    // console.log(typeof(data.newDepName));
                    // pool.query('select * from departments', function (err, {rows}) {
                    //     console.table(rows);
                    // })
                })
        }
        else if(data.instructions === 'Add a role'){
            inquirer
                .prompt([
                    {
                        type: 'input', 
                        name: 'newRole',
                        message: "What is the new role's name?"
                    },
                    {
                        type: 'input', 
                        name: 'salary',
                        message: "What is the new role's salary?"
                    },
                    {
                        type: 'input', 
                        name: 'dep_id',
                        message: "What is the new role's department?"
                    },
                ])
                .then((data) => {
                    pool.query('select id from departments where dep_name = $1', [data.dep_id], function (err, {rows})  {
                        // console.log(rows);
                        // console.log(typeof(rows));
                        // console.log(rows[0].id);
                        //the query returns a list, grab the first index and takes it's Id to get the dep_id
                        pool.query('INSERT INTO roles (role_name, salary, dep_id) VALUES ($1, $2, $3)', [data.newRole, data.salary, rows[0].id])

                    })
                })
        }
        else if(data.instructions === 'Add an employee'){
            inquirer
            .prompt([
                {
                    type: 'input', 
                    name: 'first_name',
                    message: "What is the employee's first name?"
                },
                {
                    type: 'input', 
                    name: 'last_name',
                    message: "What is the employee's last name?"
                },
                {
                    type: 'input', 
                    name: 'manager',
                    message: "Who is the employee's manager?"
                },
                {
                    type: 'input', 
                    name: 'depName',
                    message: "What is the name of the employee's department?"
                },
                {
                    type: 'input', 
                    name: 'roleName',
                    message: "What is the employees role?"
                }
            ])
            .then((data) => {
                pool.query('select id from departments where dep_name = $1', [data.depName], function (err, {rows})  {
                    const depId = rows[0].id;
                    pool.query('select id from roles where role_name = $1', [data.roleName], function (err, {rows})  {
                        pool.query('INSERT INTO employees (first_name, last_name, manager, dep_id, role_id) VALUES ($1, $2, $3, $4, $5)', 
                            [data.first_name, data.last_name, data.manager, depId, rows[0].id])
                    });

                })
            })
        }
        else if(data.instructions === 'Update an employee role'){
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'employeeName',
                        message: "What is the employee's id?"
                    },
                    {
                        type: 'input',
                        name: 'newRole',
                        message: "What is the employee's new role?"
                    }
                ])
                .then((data) => {
                    pool.query('select id from roles where role_name = $1', [data.newRole], function (err, {rows})  {
                        pool.query('update employees set role_id = $1 where id = $2', [rows[0].id, data.id])
                    });
                });
        }
        else{
            console.log('How did we get here?')
        }

    });