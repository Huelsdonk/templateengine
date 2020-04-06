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
        message: "What is the employee's ID?",
        validate: function(value) {
            if (/\d/.test(value)) {
            return true;
            }
            return "Please enter a number"
        }
    },
    {
        type: 'input',
        name: 'employeeEmail',
        message: "What is the employee's email address?",
        validate: function(value) {
            // definitely not a super thorough validation
            if (/^\S+@\S+$/.test(value)) {
                return true
            }
            return "Please enter a valid email address"
        }
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
        validate: function(value) {
            if (/\d/.test(value)) {
            return true;
            }
            return "Please enter a number"
        },
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




