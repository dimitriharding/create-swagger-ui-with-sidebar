#!/usr/bin/env node
const { program } = require("commander");
const package = require("./package.json");
const { execSync } = require("child_process");
const path = require("path");
const fsx = require("fs-extra");
const colorsx = require("colors");
const { createConfig } = require('./util/helpers')

const modulePath = __dirname;

// Path to template files from which the project will be created
const template = `${modulePath}/template`;
const public = `${modulePath}/public`;

const copyFiles = (source, destination) => {
    return new Promise((resolve, reject) => {
        return fsx.copy(source, destination, (err) => {
            if (err) {
                reject(err);
                console.log(colorsx.red("=> There was an error while copying the files: ", err));
            }
            resolve();
            console.log(colorsx.grey("=> Files copied " + destination));
        });
    });
};

const packageJSON = (projectName) => {
    return {
        name: `${projectName}`,
        version: "1.0.0",
        scripts: {
            predev: "node ./template/dev-check.js",
            prebuild: "node ./template/dev-check.js",
            dev: "cd ./template && npm run dev",
            build: "cd ./template && npm run build",
            preview: "cd ./template && npm run preview",
            prepreview: "npm run build",
            dep: "cd ./template && npm i",
        },
    };
};

let projectName = "";
let destination = "";

program
    .name("create-swagger-ui-with-sidebar")
    .description("CLI to create a Swagger UI with Sidebar")
    .arguments("<project-directory>", "Name of the project", "documentation")
    .option("-c, --color <color>", "Main color for sidebar", "teal")
    .option("-t, --title <title>", "Title of the sidebar", "Swagger UI with Sidebar")
    .option("-d, --develop", "Auto start the project", false)
    .option("-b, --build", "Build the project, and remove template folder", false)
    .option("-as, --auto-start", "Auto start the project", false)
    .version(package.version)
    .action(function (name) {
        projectName = name;
    });

program.parse();

const options = program.opts();
destination = path.join("./", projectName);
const templateDestination = path.join(destination, "/template");
const publicDestination = path.join(destination, "/public");

function startDevelopmentServer() {
    execSync(`npm run dep`, { cwd: destination, stdio: "inherit" });
    execSync(`npm run dev`, { cwd: destination, stdio: "inherit" });
}

async function buildProject() {
    // check if template folder exists
    if (!fsx.existsSync(templateDestination)) {
        console.log(colorsx.grey(`=> Template folder doesn't exist.`));
        console.log(colorsx.grey(`=> Re-creating before building the project.`));
        await copyFiles(template, templateDestination);
    }
    execSync(`npm run build`, { cwd: destination, stdio: "inherit" });
    console.log(colorsx.green(`=> Swagger UI "${projectName}" project built!`));
    console.log(colorsx.grey(`=> To serve the build, run: ${colorsx.magenta(`npx serve ${projectName}/build`)}`));
    fsx.removeSync(templateDestination);
}

async function main() {
    // Create the project directory, and copy the template files
    await copyFiles(template, templateDestination);
    await copyFiles(public, publicDestination);

    // Create the config file
    const configData = createConfig(options);
    fsx.writeFileSync(destination + "/config.js", configData);

    // Create the package.json file
    fsx.writeFileSync(destination + "/package.json", JSON.stringify(packageJSON(projectName), null, 2));

    console.log(colorsx.green.bold(`=> Swagger UI "${projectName}" project created!`));

    if (options.autoStart) {
        startDevelopmentServer();
    } else {
        console.log(`${colorsx.grey(`=> To start the project, run:`)} ${colorsx.magenta(`cd ${projectName} && npm run dep && npm run dev`)}`);
    }
}

// Start the main function
if (!options.develop && !options.build) main();
if (options.develop) startDevelopmentServer();
if (options.build && !options.develop) buildProject();
