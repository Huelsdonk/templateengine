const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employeeData = [];

//TODO: validate the questions, style up the HTML (find rogue commas in output to browser)
const questions = [
    {
        type: 'list',
        name: 'employeeType',
        message: 'Which type of employee would you like to input?',
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'employeeName',
        message: "What is the employee's name?"
    },
    {
        type: 'input',
        name: 'employeeID',
        message: "What is the employee's ID?"
    },
    {
        type: 'input',
        name: 'employeeEmail',
        message: "What is the employee's email address?"
    },
    {
        type: 'input',
        name: 'github',
        message: "What is the employee's GitHub Username",
        when: function (answers) {
            return answers.employeeType === "Engineer"
        }

    },
    {
        type: 'input',
        name: 'school',
        message: "What is the intern's school",
        when: function (answers) {
            return answers.employeeType === "Intern"
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the manager's office number?",
        when: function (answers) {
            return answers.employeeType === "Manager"
        }
    }

]
function enterEmployee() {
    inquirer.prompt(questions).then(answers => {
        if (answers.employeeType === "Manager") {
            const newManager = new Manager(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.officeNumber)
            employeeData.push(newManager)
        } else if (answers.employeeType === "Engineer") {
            const newEngineer = new Engineer(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.github);
            employeeData.push(newEngineer)
        } else if (answers.employeeType === "Intern") {
            const newIntern = new Intern(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.school);
            employeeData.push(newIntern)
        }

        askForAnotherEmployee();
    })
}

function askForAnotherEmployee() {
    inquirer
        .prompt([
            {

                type: 'confirm',
                name: 'anotherEmployee',
                message: 'Would you like to enter another employee?',
                default: true

            }
        ])
        .then(answers => {
            if (answers.anotherEmployee) {
                enterEmployee();
            } else {
                const html = render(employeeData)
                fs.writeFile(outputPath, html, err => {
                    if (err) throw err;
                })

            }
        });
}


enterEmployee();






// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
