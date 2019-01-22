// ========= /scripts/uglifyCSS.js ============ //

// Iterate thru css files in directory to uglify
const fs = require("fs");
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

// Lets read in files from /src/css and Uglify if not minified already

/* jshint ignore:start */
const uglifyFile = async function(file) {
  try {
    // Read, uglify, & copy /src/css to /dist/css folder

    // Go thru and uglify each css file unless minified

    let fileName = files[index];

    if (fileName.includes(".min.")) {
      // Do Nothing. File is minified
      console.log(`${fileName}: Skipping. Already minified!`);
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
