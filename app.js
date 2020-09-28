const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



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
        console.log("Please build your team");

        let response = await getUserInput(questionsManager);
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(manager);

        let teamMember = await getUserInput(nextEmployeeQuestion);
        console.log(teamMember);

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

        // console.log("Employees length:" + employees.length);
        // for (let i = 0; i < employees.length; i++)
        //     console.log(employees[i]);          
        const  html = render(employees);  

        const outputPath = path.resolve(__dirname,"output/");
        console.log("path: " + outputPath);
        if(!fs.existsSync(outputPath))
        {
           
            fs.mkdirSync(outputPath, err =>{
                if(err)
                throw err;
            });
        }
        else
        {
            console.log("directory does exit");
        }


        fs.writeFile(path.resolve(__dirname,"output/team.html"), html, function(err){
             if(err)
               throw err;
        });




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
// for the provided `render` function to work! ```
