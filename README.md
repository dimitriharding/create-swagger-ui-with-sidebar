<p align="center">
<img src="https://raw.githubusercontent.com/dimitriharding/create-swagger-ui-with-sidebar/main/media/logo.svg" height="150">
</p>

<h1 align="center">
Swagger UI with Sidebar
</h1>
<p align="center">
Dashboard with sidebar for multiple Swagger definitions
<p>
<p align="center">
  <a href="https://www.npmjs.com/package/create-swagger-ui-with-sidebar"><img src="https://img.shields.io/npm/v/create-swagger-ui-with-sidebar?color=2C7A7B&label="></a>
<p>
<br/>

---

## Usage

```bash
$ npx create-swagger-ui-with-sidebar@latest docs #folder name can be anything
```

Navigate to folder, and install dependencies and then start development serve

```bash
$ cd docs && npm run dep && npm run dev
```

> That's you can edit config and add definitions to public folder or reference remote files

---

## Configuration (project-directory/config.js)

| Config Property         |                                                               |
| ----------------------- | ------------------------------------------------------------- |
| `config.definitions`    | List of definition names and their URLs (`icons coming soon`) |
| `config.sidebarConfig`  | Update title, and extend theme                                |
| `config.swaggerUIProps` | Add additional props for Swagger UI react                     |

## Folder structure

```bash
|- 📁 root # Project directory
    |- 📁 public/ # Files to be served at the root of the project
        |- 📁 assets/ # Logo for sidebar and favicon for browser
            |- 🖼 logo.svg
            |- 🖼 favicon.ico
        |- 📁 definitions/ # Local definitions
            |- 📝 {definition}.{yaml|json}
            |- 📝 ...
            |- 📝 ...
    |- 📁 template/ # The react project, normally you don't need to edit the files here
        |- 📁 src # Source code for react app
    |- 📝 config.js # Configuration file for entire project
    |- 📝 package.json # Contains script to interact with template project

```

## Motivation

Wanting to document multiple AWS API gateway services where each service is also deployed on 3 environment (servers) in one location and make it easy to manage multiple swagger definition files.

A sidebar seemed to be the best solution, so that's how this project was created as a weekend project.

## How it works

<p align="center">
<img src="https://raw.githubusercontent.com/dimitriharding/create-swagger-ui-with-sidebar/main/media/showcase.svg" height="400">
</p>

The base template is a [vite react-ts project](https://stackblitz.com/edit/vitejs-vite-g3xkbc?file=index.html&terminal=dev) that is very customizable.
While you can edit all of the the source file, the intention of this is that you don't have to.

All you should need to do it update the `config.js` and add definitions to the `public` folder.

Swagger definitions are handled by the [Swagger UI React](https://www.npmjs.com/package/swagger-ui-react) module

And finally, the sidebar was created with components from [Chakra UI](https://chakra-ui.com/)

---

## Road Map

```md
- [x] Create Swagger UI project with sidebar from on command
- [] Add brand/color options (based on Chakra UI colors)
- [] Expose customization for **config** file through CLI
- [] Expose customization for **Swagger UI** props through CLI
- [] Add continuation option for perviously created projects
- [] Add icons support for sidebar (maybe FontAwesome)
- [] Allow rebuild of existing project for config changes outside of development
- [] Delete template folder on build (optional)
```
