// ========= /scripts/uglifyCSS.js ============ //

// Pass in a css file to uglify from build.js
const fs = require("fs");
const readdir = promisify(fs.readdir);
const path = require("path");

const copyFrom = "/src/css";
const copyTo = "/dist/css";

// Lets read in files from /src/css and Uglify if not minified already

/* jshint ignore:start */
const uglifyFile = async function(file) {
  // Want to uglify css file here if not minified
};
/* jshint ignore:end */
