const inquirer = require("inquirer");

const db = require('./app/connection')('Cms_Employee_Tracker', 'password123')


async function viewOrManage() {

    const x = await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                "View Details",
                "Update/Add/Delete",
            ],
            name: 'firstChoise'
        }
    ])
}

const response = await viewOrManage()
if (response.firstChoise === "View Details") {
    function viewDetails()
}
else {
    secondChoise()

}

async function viewDetails() {
    let listView = await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to view?',
            choices: [
                "All employees",
                "Departments",
                "Roles",
                "View the total utilized budget of a department",
            ],
            name: 'viewOption'
        }
    ])

const response1 = await viewDetails()
if (response1.viewOption === "All employees") {
    let data = await db.query('SELECT * FROM employee');
    console.log(data)
    // viewEmployee()
}
else if (response1.viewOption === "Departments") {
    let data = await db.query('SELECT * FROM department');
    console.log(data)
}
else if (response1.viewOption === "Roles") {
    let data = await db.query('SELECT * FROM role');
    console.log(data)
}
else if (response1.viewOption === "View the total utilized budget of a department"){
    let data = await db.query('SELECT SUM(salary) FROM role');
    console.log(data)
};

}

async function secondChoise () {
    await inquirer.prompt([
        { name: "addUpdateDelete", message: "What would you like to do?", type: 'list' },
       
    ]);
}






const newSong = await inquirer.prompt([
    { name: "firstName", message: "What is your employee Name?", type: 'input' },
    { name: "lastName", message: "What is your employee Lastname?", type: 'input' },
    { name: "employeeRole", message: "What is your employee Role?", type: 'list', choices: ["Sales Lead", "Sales Person", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"] },
    { name: "department", message: "Which department do you want to add?", type: 'list', choices: ["Sales", "Engineering", "Finance", "Legal"] },
    { name: "managerName", message: "What is the artist?" },
    { name: "genre", message: "What is the genre?" },
    { name: "rating", message: "What is the rating (1-10)?" },
]);



main();