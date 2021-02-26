const inquirer = require('inquirer');
// module to connect to database
const db = require('./app/connection')('Cms_Employee_Tracker', 'password123')

function askQuestion() {
    // ask question about view/add/update/delete info
    return inquirer.prompt([
        { name: "firstChoice", message: "What would you like to do", type: "list", choices: ["View Details", "Update/Add/Delete",] },
    ])
}
async function viewDetails() {

    return await inquirer.prompt([
        {
            name: "viewDetails", message: "What would you like to view", type: "list",
            choices: ["Employees", "Departments", "Roles", "total utilized budget of a department"]
        },
    ])
    // const myResult = await db.query( "SELECT * FROM Employees",);
    // console.log( `insert result:`, myResult )
}
// view all employees 
async function viewEmployee() {
    return await inquirer.prompt([
        { name: "viewEmployee1", message: "What would you like to view", type: "list", choices: ['BY department', 'BY manager'] }
    ])

}
// select  department choise
async function depChoice() {
    const value = await db.query('select * from department')
    // console.log(value)
    let departmentArray = []

    value.forEach(({ department_name }) => {
        departmentArray.push(`${department_name}`)
    })


    return await inquirer.prompt([
        { name: "depChoice1", message: "Which department?", type: "list", choices: departmentArray }
    ])

}
// View employee BY Departments
async function viewEmployeeByDepartments() {
    let result = await depChoice()

    let x = await db.query(`select employee.first_name,last_name from employee left join role on (employee.role_id=role.id) inner join department on 
    (role.department_id=department.id) where department_name='${result.depChoice1}'`);
    return x

}
// manager choice
async function managerChoice() {
    const value = await db.query('select first_name from employee where manager_id is not null ')
    let managerArray = []
    value.forEach(({ first_name }) => {
        managerArray.push(first_name)
    })


    let result = await inquirer.prompt([
        { name: "managerChoice1", message: "Which manager ?", type: "list", choices: managerArray }
    ])
    let result1 = await db.query(`select role_id from employee where first_name = '${result.managerChoice1}'`)
    let array1 = ''
    result1.forEach(({ role_id }) => {
        array1 += role_id
    })

    let result2 = await db.query(`select manager_id from employee where role_id= '${array1}' `)
    return result2

}
// select employee BY manager choice 


async function viewEmployeeByManager() {
    let result = await managerChoice()
    let array1 = ''
    result.forEach(({ manager_id }) => {
        array1 += manager_id
    })

    // console.log(result)
    const x = await db.query(`select employee.first_name,last_name from employee where role_id = '${array1}'`);
    return x

}