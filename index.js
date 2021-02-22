const inquirer = require("inquirer");

const db = require('./app/connection')('Cms_Employee_Tracker', 'password123')
/*
1. id    
  2. title
  3. artist
  4. genre
  5. rating
CREATE TABLE songs (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  artist VARCHAR(200),
  genre VARCHAR(200),
  rating INTEGER
)
*/

// user first question view or manage company

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





const newSong = await inquirer.prompt([
    { name: "firstName", message: "What is your employee Name?", type: 'input' },
    { name: "lastName", message: "What is your employee Lastname?", type: 'input' },
    { name: "employeeRole", message: "What is your employee Role?", type: 'list', choices: ["Sales Lead", "Sales Person", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"] },
    { name: "department", message: "Which department do you want to add?", type: 'list', choices: ["Sales", "Engineering", "Finance", "Legal"] },
    { name: "managerName", message: "What is the artist?" },
    { name: "genre", message: "What is the genre?" },
    { name: "rating", message: "What is the rating (1-10)?" },
]);







async function main() {
    // get new song info
    const newSong = await inquirer.prompt([
        { name: "title", message: "What is the title of the song?" },
        { name: "artist", message: "What is the artist?" },
        { name: "genre", message: "What is the genre?" },
        { name: "rating", message: "What is the rating (1-10)?" },
    ]);
    // insert this prompted song
    let result
    // create an entry
    result = await db.query("INSERT INTO songs VALUES(?,?,?,?,?)",
        [0, newSong.title, newSong.artist, newSong.genre, newSong.rating])

    result = await db.query('SELECT * FROM songs ')

    // console.log(`-- SELECT * result: --\n`, result, "\n\n")

    result = await db.query("INSERT INTO songs VALUES(0,'Enter Sandman','Metallica','Rock',7)")

    result = await db.query("INSERT INTO songs VALUES(0,'Enter Sandman','Metallica','Rock',7)")
    // ... ?
    let data
    var data = await db.query('SELECT * FROM songs');
    var data = await db.query("SELECT * FROM songs where artist = 'Michael Jackson'");

    // console.log(data)

    console.log(`SELECT * songs`, data)
    console.log(`-- SELECT * data: --\n`, data, "\n\n")
    await db.close()
}
main();