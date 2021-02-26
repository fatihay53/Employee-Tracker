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