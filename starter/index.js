const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

function addEngineer() {
	return inquirer.prompt([
		 {
			  type: 'input',
			  name: 'name',
			  message: 'enter engineer\'s name: '
		 },
		 {
			  type: 'input',
			  name: 'id',
			  message: 'enter engineer\'s enmployee id: '
		 },
		 {
			  type: 'input',
			  name: 'github',
			  message: 'enter engineer\'s github: '
		 },
		 {
			  type: 'input',
			  name: 'email',
			  message: 'enter engineer\'s email: '
		 }
	]).then(data => {
		 return new Engineer(data.id, data.name, data.email, data.github);
	});
}

function addIntern() {
	return inquirer.prompt([
		 {
			  type: 'input',
			  name: 'name',
			  message: 'enter intern\'s name: '
		 },
		 {
			  type: 'input',
			  name: 'id',
			  message: 'enter intern\'s enmployee id: '
		 },
		 {
			  type: 'input',
			  name: 'school',
			  message: 'enter intern\'s school: '
		 },
		 {
			  type: 'input',
			  name: 'email',
			  message: 'enter intern\'s email: '
		 }
	]).then(data => {
		 return new Intern(data.id, data.name, data.email, data.school);
	})
}

function addTeamMember(team = []) {
	return inquirer.prompt([
		 {
			  type: 'list',
			  name: 'nextStep',
			  choices: [
					'Add an engineer',
					'Add an intern',
					'Finish building team'
			  ]
		 }
	]).then(({nextStep: step}) => {
		 switch (step) {
			  case 'Add an engineer': 
					console.log('en');
					return addEngineer().then(engineer => {
						 const updatedTeam = [...team, engineer];

						 return addTeamMember(updatedTeam);
					});
			  case 'Add an intern':
					console.log('in')
					return addIntern().then(intern => {
						 const updatedTeam = [...team, intern];
	
						 return addTeamMember(updatedTeam);
					});
			  default:
					console.log('df')
					return team;
		 }
	})
}

// TODO: Write Code to gather information about the development team members, and render the HTML file.
console.log('Team creator')

inquirer.prompt([
	{
		 type: 'input',
		 name: 'name',
		 message: 'enter manager\'s name: '
	},
	{
		 type: 'input',
		 name: 'id',
		 message: 'enter manager\'s enmployee id: '
	},
	{
		 type: 'input',
		 name: 'office',
		 message: 'enter manager\'s office number: '
	},
	{
		 type: 'input',
		 name: 'email',
		 message: 'enter manager\'s email: '
	}
]).then((managerData) => {
	const manager = new Manager(managerData.id, managerData.name, managerData.email, managerData.office);
	return addTeamMember([manager]).then(team => {
		 const html = render(team);
		 fs.writeFile(outputPath, html, {}, (err, res) => console.log('finish', err));
	});
})

