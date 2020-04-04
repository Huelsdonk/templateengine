// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber
    }
    
    getOfficeNumber() {
        console.log(this.officeNumber)
        return this.officeNumber
    }
    
    getRole() {
        console.log(Manager.name)
        return Manager.name
    }
}


// const bob = new Manager("bob", 1, "bob@bob.com", 1)

// bob.getName();
// bob.getRole();
// bob.getEmail()

module.exports = Manager;
