// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Engineer extends Employee {
    role = 'Engineer';
    github;

    constructor(id, name, email, github) {
        super(id, name, email);

        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return this.role;
    }
}

module.exports = Engineer;
