const inquirer = require('inquirer');
// module to connect to database
const db = require('./app/connection')('Cms_Employee_Tracker', 'password123')

function askQuestion() {
    // ask question about view/add/update/delete info
    return inquirer.prompt([
        { name: "firstChoice", message: "What would you like to do", type: "list", choices: ["View Details", "Update/Add/Delete",] },
    ])
}