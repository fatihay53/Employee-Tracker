
const { registerPrompt } = require('inquirer');
const inquirer = require('inquirer');
// module to connect to database
const db = require('./app/connection')('Cms_Employee_Tracker', 'password123')

// Ask question for 
//  1.view                                     ||                          2. Update/Add/Delete

//      View all Employee  || View Departments || View Roles || View budget of dep.        ||          Add                     ||          Update           ||          Delete

// View BY dep.  ||  BY menag.                                                                    Employee ||Role|| Department     || Role ||Manager || Depart. ||      


// Ask question view
//update/add/delete

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
    console.log(value)
    let departmentArray = []
    console.log(departmentArray)
    value.forEach(({ department_name }) => {
        departmentArray.push(`${department_name}`)
    })

    console.log(departmentArray)
    return await inquirer.prompt([
        { name: "depChoice1", message: "Which department?", type: "list", choices: departmentArray }
    ])
}

// View employee BY Departments
async function viewEmployeeByDepartments() {
    let result = await depChoice()
    console.log(result.depChoice1)
    const x = await db.query(`select employee.first_name,last_name from employee left join role on (employee.role_id=role.id) inner join department on 
    (role.department_id=department.id) where department_name='${result.depChoice1}'`);

    console.log(x)
}

// manager choice
async function managerChoice() {
    const value = await db.query('select first_name from employee where manager_id is not null ')
    let managerArray = []
    value.forEach(({ first_name }) => {
        managerArray.push(first_name)
    })
    console.log(managerArray)

    let result = await inquirer.prompt([
        { name: "managerChoice1", message: "Which manager ?", type: "list", choices: managerArray }
    ])
    let result1 = await db.query(`select role_id from employee where first_name = '${result.managerChoice1}'`)
    let array1 = ''
    result1.forEach(({ role_id }) => {
        array1 += role_id
    })
    console.log(array1)
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
    console.log(array1)
    // console.log(result)
    const x = await db.query(`select employee.first_name,last_name from employee where role_id = '${array1}'`);
    console.log(x)
}


// View Department


async function viewDepartment() {
    let result = await db.query(`select department_name from department`)
    console.log(result)
}


//View Role
async function viewRole() {
    let result = await db.query(`select title from role`)

    console.log(result)
}

//sum of Department salary

async function salaryDepartment() {
    let result = await db.query(`SELECT SUM(salary) FROM role left join department on (role.department_id=department.id)`)
    console.log(result)
}
// View Manager

// async function viewEmployeeByManager() {
//     let valueManager = db.query('select first_name from employee where manager_id = not null')
//     let managerArray = []
//     valueManager.forEach(({ first_name }) => {
//         managerArray += first_name
//     })
//     let managerAll = await inquirer.prompt([
//         { name: 'managerChoice', message: 'Which manager?', type: 'list', choices: managerArray }
//     ])
//     let managerId = await db.query(`select manager_id from employee where first_name = ${managerAll.managerChoice} `)
//     const x = db.query(`select employee.first_name,last_name from employee where manager_id = ${managerId}`);
//     console.log(x)
// }




// Update/Add/Delete question

function addQuestion() {
    return inquirer.prompt([
        { name: "addQuestion1", message: "What would you like to add", type: "list", choices: ["Employee", "Role", "Department"] },
    ])
}

// Add  employee
async function addEmployeeTable() {

    const roleValue = await db.query('select title from role')
    let role = []
    role.push("None")
    roleValue.forEach(({ title }) => {
        role.push(title)
    })

    const questions = await inquirer.prompt([
        {
            message: "What is the employee's first name?",
            name: 'firstName'
        },
        {
            message: "What is the employee's last name?",
            name: 'lastName'
        },
        {
            message: "What is the employee's role?",
            name: 'role',
            type: 'list',
            choices: role
        },
        {
            message: "What role is he manager of ?",
            type: 'list',
            choices: role,
            name: 'managerConfirm'
        },

    ])
    let result
    let manager = []
    if (questions.managerConfirm === "None") {
        result = null

    }

    else {
        result = await db.query(`Select id from role where title ='${questions.managerConfirm}'`)


        managerId = await db.query(`Select id from role where title ='${questions.role}'`)

        managerId.forEach(({ id }) => {
            manager.push(id)

        })
        manager = Number(manager)
        console.log(manager)

    }

    let roll = []
    console.log(questions.role)
    rolId = await db.query(`Select id from role where title ='${questions.role}'`)
    console.log(rolId)
    rolId.forEach(({ id }) => {
        roll.push(id)

    })
    roll = Number(roll)
    console.log(roll)
    await db.query('INSERT INTO employee VALUES(?,?,?,?,?)', [0, questions.firstName, questions.lastName, roll, manager])

    let viewEmployee = await db.query(`select * from employee`);

    console.log(viewEmployee)


}
// Add  Role

async function addRole() {
    let departments = await db.query(`select department_name from department`);
    let depArray = []
    departments.forEach(({ department_name }) => {
        depArray.push(department_name)
    })
    console.log(depArray)
    const answer = await inquirer.prompt([
        {
            message: 'What is the title of the role?',
            name: 'title'
        },
        {
            message: 'What is the salary of the role?',
            name: 'salary'
        },
        {
            message: 'Add it in which department?',
            type: "list",
            name: "departmentName",
            choices: depArray
        }
    ])
    // console.log(answer.departmentName)
    let departmentId = await db.query(`select department.id from department left join role on department.id=role.department_id where department.department_name = '${answer.departmentName}' `)
    let depId = []
    departmentId.forEach(({ id }) => {
        depId.push(id)
    })
    depId = Number(depId[0])
    let finalResult = await db.query('INSERT INTO role VALUES     (?,?,?,?)', [0, answer.title, answer.salary, depId])
    return console.log(`${finalResult} has been added to the Roles`)
}

// Add Department

async function addDepartment() {
    const answer = await inquirer.prompt([
        {
            message: 'What is the name of the department?',
            name: 'name',
            type: 'input'
        }
    ])
    finalResult = await db.query('INSERT INTO department VALUES(?,?)', [0, answer.name])

    return console.log(`${finalResult} has been added to the Department`)

}



// update question

function updateChoice() {
    return inquirer.prompt([
        {
            name: "updateChoice1", message: "What would you like to update", type: "list", choices: ["Employee Role", "Employee Manager"
                , "Employee Department"]
        },
    ])
}


//update Role
async function updateEmployeRole(){
let employees = await db.query(`Select first_name,last_name from employee`)
let empArray =[]

employees.forEach(({first_name,last_name})=>{
    empArray.push(`${first_name} ${last_name}`)
  
})
console.log(empArray)
let roles = await db.query(`Select title from role`)
let roleArray=[]
roles.forEach(({title})=>{
    roleArray.push(title)
})
 let x = await inquirer.prompt([
     {
         name:'chooseEmployee' , message: "Choose the Employee First" , type: "list", choices:empArray
     },
     {
         name:'chooseRole', message:"Select The new Role", type:"list", choices: roleArray
     }
 ])
 let nameToId = await db.query(`select id from role where title ="${x.chooseRole}"`)

 let idNumb =[]
 nameToId.forEach(({id})=>{
    idNumb.push(id)
})
let fn = x.chooseEmployee.split(" ")[0]
let ln= x.chooseEmployee.split(" ")[1]

    await db.query(`UPDATE employee SET role_id = ${idNumb[0]} WHERE first_name = "${fn}" AND last_name = "${ln}"`)
    console.log (`${fn} ${ln}'s Role has been Updated Successfully `)
}


//Update Manager

async function updateEmployeeManager(){

}

//Update Department
async function updateEmployeeDepartment(){

}
// remove question

function removeChoice() {
    return inquirer.prompt([
        {
            name: "removeChoice1", message: "What would you like to remove", type: "list", choices: ["Employee Role", "Employee Manager", "Employee Department"]
        },
    ])
}

// remove employe


function removeEmployee() {
    const arr = []
    db.query('SELECT first_name,last_name FROM employee', async (err, res) => {
        res.forEach(({ first_name, last_name }) => {
            arr.push(`${first_name} ${last_name}`)
        })
        const answer = await inquirer.prompt([
            {
                message: 'Which employee would you like to remove?',
                type: 'list',
                choices: arr,
                name: 'name'
            }
        ])
        let a = answer.name
        let b = a.split(" ")
        db.query(`DELETE FROM employee WHERE first_name = '${b[0]}' AND last_name = '${b[1]}'`)
    })
}


// remove manager

function removeRole() {
    const arr = []
    db.query('SELECT title FROM role', async (err, res) => {
        res.forEach(({ title }) => {
            arr.push(`${title}`)
        })
        const answer = await inquirer.prompt([
            {
                message: 'Which role would you like to remove?',
                type: 'list',
                choices: arr,
                name: 'name'
            }
        ])
        db.query(`DELETE FROM role WHERE title = '${answer.name}'`)
    })
}

//remove department
function removeDepartment() {
    const arr = []
    db.query('SELECT name FROM department', async (err, res) => {
        res.forEach(({ name }) => {
            arr.push(`${name}`)
        })
        const answer = await inquirer.prompt([
            {
                message: 'Which department would you like to remove?',
                type: 'list',
                choices: arr,
                name: 'name'
            }
        ])
        db.query(`DELETE FROM department WHERE name = '${answer.name}'`)
    })
}





function secondOption() {
    return inquirer.prompt([
        {
            name: "addUpdateDelete", message: "What would you like to do", type: "list",
            choices: ["Add", "Update", "Remove"]
        },
    ])
}

async function main() {



    const response1 = await askQuestion();
    console.log(response1)

    switch (response1.firstChoice) {
        case "View Details":
            const viewD = await viewDetails()
            console.log(viewD.viewDetails)
            switch (viewD.viewDetails) {
                case "Employees": {
                    const view1 = await viewEmployee()
                    switch (view1.viewEmployee1) {
                        case 'BY department': {
                            await viewEmployeeByDepartments()
                            const x = await lastQuestion()
                            console.log(x.lastQ)
                            switch (x.lastQ) {
                                case true: {
                                    await main()
                                }
                                case false: {
                                    console.log('HAveeee good day')
                                    break;

                                }

                            }

                            break;
                        }
                        case "BY manager": {
                            await viewEmployeeByManager()
                            const x = await lastQuestion()
                            console.log(x.lastQ)
                            switch (x.lastQ) {
                                case true: {
                                    await main()
                                }
                                case false: {
                                    console.log('HAveeee good day')
                                    break;

                                }


                            }

                            break;



                        }



                    }

                }


                case "Departments": {
                    await viewDepartment()

                    const x = await lastQuestion()
                    console.log(x.lastQ)
                    switch (x.lastQ) {
                        case true: {
                            await main()
                        }
                        case false: {
                            console.log('HAveeee good day')
                            break;

                        }

                    }
                    break;


                }
                case "Roles": {
                    await viewRole()
                    const x = await lastQuestion()
                    console.log(x.lastQ)
                    switch (x.lastQ) {
                        case true: {
                            await main()
                        }
                        case false: {
                            console.log('HAveeee good day')
                            break;

                        }

                    }
                    break;
                }
                case "total utilized budget of a department": {
                    await salaryDepartment()
                    const x = await lastQuestion()
                    console.log(x.lastQ)
                    switch (x.lastQ) {
                        case true: {
                            await main()
                        }
                        case false: {
                            console.log('HAveeee good day')
                            break;

                        }

                    }
                    break;
                }

            }
            // choices: ["Employees", "Departments", "Roles", "total utilized budget of a department"]

            break;
        case "Update/Add/Delete": {

            let second = await secondOption()

            switch (second.addUpdateDelete) {
                case 'Add': {
                    let add = await addQuestion()
                    switch (add.addQuestion1) {
                        case "Employee": {
                            await addEmployeeTable()
                            const x = await lastQuestion()
                            console.log(x.lastQ)
                            switch (x.lastQ) {
                                case true: {
                                    await main()
                                }
                                case false: {
                                    console.log('HAveeee good day')
                                    break;

                                }

                            }
                            break;
                        }
                        case "Role": {
                            await addRole()
                            const x = await lastQuestion()
                            console.log(x.lastQ)
                            switch (x.lastQ) {
                                case true: {
                                    await main()
                                }
                                case false: {
                                    console.log('HAveeee good day')
                                    break;

                                }

                            }
                            break;
                        }
                        case "Department": {
                            await addDepartment()
                            const x = await lastQuestion()
                            console.log(x.lastQ)
                            switch (x.lastQ) {
                                case true: {
                                    await main()
                                }
                                case false: {
                                    console.log('HAveeee good day')
                                    break;

                                }

                            }
                            break;
                        }
                    }
                    break;
                }
                case 'Update': {
                    let update = await updateChoice()
                    switch (update.updateChoice1) {
                        case "Employee Role": {
                            await updateEmployeRole()
                            const x = await lastQuestion()
                    console.log(x.lastQ)
                    switch (x.lastQ) {
                        case true: {
                            await main()
                        }
                        case false: {
                            console.log('HAveeee good day')
                            break;

                        }

                    }
                    break;
                        }
                        case "Employee Manager": {
                            await addRole()
                            const x = await lastQuestion()
                    console.log(x.lastQ)
                    switch (x.lastQ) {
                        case true: {
                            await main()
                        }
                        case false: {
                            console.log('HAveeee good day')
                            break;

                        }

                    }
                    break;
                        }
                        case "Employee Department": {
                            await addDepartment()
                            const x = await lastQuestion()
                    console.log(x.lastQ)
                    switch (x.lastQ) {
                        case true: {
                            await main()
                        }
                        case false: {
                            console.log('HAveeee good day')
                            break;

                        }

                    }
                    break;
                        }
                    }
                    break;
                }
                case 'Delete': {
                    break;
                }
            }
        }


    }



    await db.close();
}

async function lastQuestion() {
    return await inquirer.prompt([
        {
            name: 'lastQ', message: 'Would you like to continue?', type: 'confirm'

        }])
}

main();