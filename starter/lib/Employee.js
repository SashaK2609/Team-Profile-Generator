// TODO: Write code to define and export the Employee class

class Employee {
	id;
	name;
	email;
	role = 'Employee';

	constructor(id, name, email) {
		 this.id = id;
		 this.name = name;
		 this.email = email;
	}

	getRole() {
		 return this.role;
	}

	getId() {
		 return this.id;
	}
	getName() {
		 return this.name;
	}
	getEmail() {
		 return this.email;
	}
}

module.exports = Employee;

