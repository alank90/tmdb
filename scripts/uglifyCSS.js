// ========= /scripts/uglifyCSS.js ============ //

// =========== Dependencies =========== //
const fs = require("fs");
const { promisify } = require("util");

const copyFile = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);

// Lets take file passed from build.js and Uglify if not minified already
/* jshint ignore:start */
const uglifyFile = async function(fileName) {
  try {
    // Read, uglify, & copy /src/css to /dist/css folder

    // First, check if css file is minified
    if (fileName.includes(".min.")) {
      // Do Nothing. File is minified
      console.log(`${fileName}: Skipping. Already minified!`);
      await copyFile(`src/css/${fileName}`, `dist/css/${fileName}`);
    } else {
      console.log(`${fileName}: build and uglify`);
      let uglified = require("uglifycss").processFiles(
        [`src/css/${fileName}`],
        {
          maxLineLen: 500,
          expandVars: true
        }
      );
      await writeFile(`dist/css/${fileName}`, uglified);
    }
  } catch (err) {
    console.log(err);
  }
};
/* jshint ignore:end */

module.exports = uglifyFile;
