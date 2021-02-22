
const inquirer = require('inquirer');
// module to connect to database
const db = require('./app/connection')('Cms_Employee_Tracker', 'password123')

function InitialQuestion() {
    // ask question about view/add/update/delete info
    return inquirer.prompt([
        { name: "firstChoice", message: "What would you like to do", type: "list", choices: ["View Details", "Update/Add/Delete",] },
    ])
}

function addChoice() {
    return inquirer.prompt([
        { name: "addChoice1", message: "What would you like to add", type: "list", choices: ["Employee", "Role", "Department"] },
    ])
}

function updateChoice() {
    return inquirer.prompt([
        {
            name: "updateChoice1", message: "What would you like to update", type: "list", choices: ["Employee Role", "Employee Manager"
                , "Employee Department"]
        },
    ])
}
function deleteChoice() {
    return inquirer.prompt([
        {
            name: "removeChoice1", message: "What would you like to remove", type: "list", choices: ["Employee", "Role"
                , "Department"]
        },
    ])
}


// else{

// }

function viewDetails() {

    return inquirer.prompt([
        {
            name: "viewDetails", message: "What would you like to view", type: "list",
            choices: ["Employees", "Departments", "Roles", "total utilized budget of a department"]
        },
    ])
    // const myResult = await db.query( "SELECT * FROM Employees",);
    // console.log( `insert result:`, myResult )
}


// const myResult = await db.query( 
//     "INSERT INTO favourite_songs (title,artist,genre,rating) VALUES(?,?,?,?) ",
//     [newSong.title, newSong.artist, newSong.genre, newSong.rating] );
// console.log( `insert result:`, myResult )

// const mySongs = await db.query( "SELECT * FROM favourite_songs" );
// for( let i=0; i<mySongs.length; i++ ){
//     const song = mySongs[i];
//     console.log( `${i}: ${song.title}/${song.artist}  [*${song.genre}*] ${song.rating}/10 `)
// }
// console.log( mySongs );
// -------------
function secondOption() {
    return inquirer.prompt([
        {
            name: "addUpdateDelete", message: "What would you like to do", type: "list",
            choices: ["Add", "Update", "Remove"]
        },
    ])
}

async function main() {

    const response1 = await InitialQuestion();
    console.log(response1)
    if (response1.firstChoice === "View Details") {
        const response11 = await viewDetails();
        if (response11.viewDetails === "Employees") {
            //  viewEmployees()
            const myResult = await db.query("SELECT * FROM employee")
            console.log(myResult)
        }
        else if (response11.viewDetails === "Departments") {
            const myResult = await db.query("SELECT * FROM department")
            console.log(myResult)
        }
        else if (response11.viewDetails === "Roles") {
            const myResult = await db.query("SELECT * FROM role")
            console.log(myResult)
        }
        else if (response11.viewDetails === "total utilized budget of a department") {
            const myResult = await db.query("SELECT SUM(salary) FROM role;")
            console.log(myResult)
        }
    }
    else {
        const response2 = await secondOption()
        if (response2.viewDetails === "Add") {
            const response3 = await addChoice();
            if (response3.addChoice1 === "Employee") {
                const updateEmployees = await inquirer.prompt([
                    { name: "firstName", message: "What is the employee's first name", type: "input" },
                    { name: "lasttName", message: "What is the employee's last name", type: "input" },
                    {
                        name: "role", message: "What is the employee's role", type: "list", choices: ["Sales Lead", "Salesperson", "Lead Engineer",
                            "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead",]
                    },
                    { name: "managerName", message: "In Which department?", type: "list", choices: ["Sales", "Engineering", "Finance", "Legal",] },
                ])
                const myResult = await db.query(
                    "INSERT INTO employee (firstName,lasttName,role,managerName) VALUES(?,?,?,?,?) ",
                    [0, updateEmployees.firstName, updateEmployees.lasttName, updateEmployees.role, updateEmployees.managerName]);
                console.log(`insert result:`, myResult)
            }

        }
        else if (response2.viewDetails === "Update") {
            updateChoice()
        }
        else if (response2.viewDetails === "Remove") {
            deleteChoice()
        }

    }


    await db.close();
}
main();