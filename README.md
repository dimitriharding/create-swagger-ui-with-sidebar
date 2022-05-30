<p align="center">
<img src="" height="150">
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

Execute

```sh
npx create-swagger-ui-with-sidebar documentation #folder name can be anything
```

Navigate to folder, and install dependencies and then start development serve

```sh
cd documentation && npm run dep && npm run dev
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
|- :file_folder: root # Project directory
    |- :file_folder: public/ # Files to be served at the root of the project
        |- :file_folder: assets/ # Logo for sidebar and favicon for browser
            |- :framed_picture: logo.svg
            |- :framed_picture: favicon.ico
        |- :file_folder: definitions/ # Local definitions
            |- :memo: {definition}.{yaml|json}
            |- :memo: ...
            |- :memo: ...
    |- :file_folder: template/ # The react project, normally you don't need to edit the files here
        |- :file_folder: src # Source code for react app
    |- :memo: config.js # Configuration file for entire project
    |- :memo: package.json # Contains script to interact with template project

```

## How it works

The base template is a [vite react-ts project](https://stackblitz.com/edit/vitejs-vite-g3xkbc?file=index.html&terminal=dev) that is very customizable.
While you can edit all of the the source file, the intention of this is that you don't have to.

All you should need to do it update the `config.js` and add definitions to the `public` folder.

Swagger definitions are handled by the [Swagger UI React](https://www.npmjs.com/package/swagger-ui-react) module

And finally, the sidebar was created with components from [Chakra UI](https://chakra-ui.com/)

---

## Road Map

```md
[x] Create Swagger UI project with sidebar from on command
[] Add brand/color options (based on Chakra UI colors)
[] Expose customization for **config** file through CLI
[] Expose customization for **Swagger UI** props through CLI
[] Add continuation option for perviously created projects
[] Add icons support for sidebar (maybe FontAwesome)
[] Allow rebuild of existing project for config changes outside of development
[] Delete template folder on build (optional)
```
