const { colors } = require('./colors')
const colorsx = require("colors");

const createConfig = ({ color, title }) => {
    const userBrandColor = colors[color];
    const defaultBrandColor = colors.teal;
    const configTemplate = `
/**
 * Definitions export
 * This is where sidebar menu items are defined.
 */
export const definitions = [
    {
        name: "Pet Store (Local)",
        url: "./definitions/petstore.swagger.yaml",
    },
    {
        name: "Pet Store (Remote)",
        url: "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v2.0/json/petstore.json",
    },
];

/**
 * Sidebar customizations
 * You can update the title and customize the sidebar theme
 */
export const sidebarConfig = {
    title: "${title || "Swagger UI with Sidebar"}",
    // Extend the theme to include custom colors, fonts, etc
    extendTheme: {
        // Learn more about color theme: https://chakra-ui.com/docs/styled-system/theming/theme#colors
        colors: {
            brand: ${JSON.stringify((userBrandColor || defaultBrandColor), null, '\t\t\t\t')},
        },
    },
};

// Props that will be passed to the SwaggerUI component
// See available props here: https://www.npmjs.com/package/swagger-ui-react
export const swaggerUIProps = {
    queryConfigEnabled: true,
}
`;
    console.log(colorsx.grey("=> Config created"));
    return configTemplate;
};

module.exports = {
    createConfig,
}
