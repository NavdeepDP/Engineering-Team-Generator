const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


/***
 * Globals
 */


const employees = [];

const questionsManager = [
    {
        type: "input",
        message: "What is your manager's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your manager's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your manager's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber"
    },

];


const questionsEngineers = [
    {
        type: "input",
        message: "What is your engineer's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your engineer's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your engineer's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your engineer's GitHub Username?",
        name: "gitHub"
    },

];

const questionsIntern = [
    {
        type: "input",
        message: "What is your intern's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your intern's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your intern's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your intern's school?",
        name: "school"
    },

];


const nextEmployeeQuestion = [
    {
        type: "list",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"],
        name: "teamMemberType"
    }
];


/***
 * 
  * FUNCTION DEFINITION
  * 
  */

// code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function getUserInput(question) {
    try {
        const answer = await inquirer.prompt(question);
        return answer;
    }
    catch (err) {
        throw err;
    }

}

async function getInput() {
    try {
        console.log(" ");
        console.log("Please build your team");
        console.log(" ");

        let response = await getUserInput(questionsManager);
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(manager);

        let teamMember = await getUserInput(nextEmployeeQuestion);
        // console.log(teamMember);

        while (teamMember.teamMemberType === "Engineer" || teamMember.teamMemberType === "Intern") {

            if (teamMember.teamMemberType === "Engineer") {
                response = await getUserInput(questionsEngineers);
                let engineer = new Engineer(response.name, response.id, response.email, response.gitHub);
                employees.push(engineer);
            }
            else if (teamMember.teamMemberType === "Intern") {
                response = await getUserInput(questionsIntern);
                let intern = new Intern(response.name, response.id, response.email, response.school);
                employees.push(intern);
            }

            teamMember = await getUserInput(nextEmployeeQuestion);
        }

       // get the html to display all the employees       
        const  html = render(employees);  

        // create the output folder if it does not exist
        if(!fs.existsSync(OUTPUT_DIR))
        {

            // console.log("output path checking");   
            // Using fs.mkdirSync() method  to create the directory             
            fs.mkdirSync(OUTPUT_DIR);
        }

        // console.log("output path " + outputPath);

        // write html to the output/team.html
        await writeFileAsync(outputPath, html,"utf8");

        console.log("\n*********************************************************");
        console.log("          Sucessfully Generated team.html                ");
        console.log("**********************************************************");

    }
    catch (err) {
        console.log(err);
    }

}


/**
 * FUNCTION CALLS
 * 
 */

getInput();






