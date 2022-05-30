#!/usr/bin/env node
const { program } = require("commander");
const package = require("./package.json");
const { execSync } = require("child_process");
const path = require("path");
const fsx = require("fs-extra");
const colorsx = require("colors");

const colors = {
    blue: {
        50: "#e3f2fd",
        100: "#bbdefb",
        200: "#90caf9",
        300: "#64b5f6",
        400: "#42a5f5",
        500: "#2196f3",
        600: "#1e88e5",
        700: "#1976d2",
        800: "#1565c0",
        900: "#0d47a1",
    },
    undefined: "",
};

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

program
    .name("create-swagger-ui-with-sidebar")
    .description("CLI to create a Swagger UI with Sidebar")
    .arguments("<project-directory>", "Name of the project", "documentation")
    .option("-c, --color <color>", "Main color for sidebar", "teal")
    .version(package.version)
    .action(async function (name) {
        const destination = path.join("./", name);
        const modulePath = __dirname;

        const template = `${modulePath}/template`;
        const config = `${modulePath}/config.js`;
        const public = `${modulePath}/public`;

        // Create the project directory
        await copyFiles(template, destination + "/template");
        await copyFiles(config, destination + "/config.js");
        await copyFiles(public, destination + "/public");

        fsx.writeFileSync(destination + "/package.json", JSON.stringify(packageJSON(name), null, 2));

        console.log(colorsx.green.underline(`=> Swagger UI "${name}" project created!`));
        console.log(`=> To start the project, run: ${colorsx.magenta(`cd ${name} && npm run dep && npm run dev`)}`);

        // execSync(`npm run dep`, { cwd: destination, stdio: "inherit" });
        // execSync(`npm run dev`, { cwd: destination, stdio: "inherit" });
        // console.log("Project created in " + destination);
        // console.log("Project running at http://localhost:3000");
    });

program.parse();
