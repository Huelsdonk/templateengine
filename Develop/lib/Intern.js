// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");


class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email)
        this.school = school
    }
    getSchool() {
        console.log(this.school)
        return this.school;
    }
    getRole() {
        console.log(Intern.name)
        return Intern.name
    }
}

// const sandy = new Intern("Sandy", 5, "sandy@bob.com", "UW")

// console.log(sandy)
// sandy.getRole()
// sandy.getSchool();



module.exports = Intern;
