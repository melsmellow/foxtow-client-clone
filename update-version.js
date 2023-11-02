const fs = require("fs");
const path = require("path");

// Generate a unique version identifier (timestamp)
const version = Date.now() + Math.floor(Math.random() * 1000).toString();

// Define the path to the Next.js build directory
const buildDirectory = path.resolve(__dirname, ".next");

// Define the path to the `index.html` file in the build directory
const indexHtmlPath = path.join(buildDirectory, "server/app/index.html");

// Read the contents of the `index.html` file
let indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");

// Replace the placeholder with the dynamic version
indexHtml = indexHtml.replace("<!--APP_VERSION_PLACEHOLDER-->", version);

// Write the modified `index.html` file back
fs.writeFileSync(indexHtmlPath, indexHtml);
