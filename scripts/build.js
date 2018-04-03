const fs = require("fs");
const mkdirp = require("mkdirp");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const imageminGifSicle = require("imagemin-gifsicle");

// using rimraf to clean up any existing build
require("rimraf")("./dist", function() {
  // and then rebuilding everything from scratch
  mkdirp("./dist/css", function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log("main.css: build and uglify");
      let uglified = require("uglifycss").processFiles(["src/css/main.css"], {
        maxLineLen: 500,
        expandVars: true
      });
      fs.writeFile("dist/css/main.css", uglified);

      // Lets build the browserify bundle using the browserify api
      // First check if index.js exists
      const browserifyBuild = function() {
        console.log("Checking for index.js");
        const promise = new Promise(function(resolve, reject) {
          fs.open("index.js", "r", (err, fd) => {
            if (err) {
              reject("No index.js found. Skipped browserfying step");
            } else {
              console.log("bundle.js: build and uglify");
              let b = require("browserify")();
              b.add("src/js/main.js");
              b.transform("uglifyify", { global: true });
              let indexjs = fs.createWriteStream("dist/index.js");
              // Bundle the files and their dependencies into a
              // single javascript file.
              b.bundle().pipe(indexjs);
              resolve("Bundling Successful!");
            }
          });
        }); // End of Promise

        return promise;
      }; // End browserifyBuild

      // Create another function w/promise to compress images
      const compressImages = function(result) {
        console.log(result);
        // Compress images
        const promise = new Promise(function(resolve, reject) {
          fs.readdir("src/img", function(err, files) {
            if (err) {
              reject(`Alert! Check if the directory src/img exists. ${err}`);
            } else if (files.length === 0) {
              reject("images: No images found.");
            } else {
              mkdirp("./dist/img", function(err) {
                if (err) {
                  reject(err);
                } else {
                  imagemin(["src/img/*.{jpg,png,gif}"], "dist/img", {
                    plugins: [
                      imageminJpegtran(),
                      imageminPngquant({ quality: "65-80" }),
                      imageminGifSicle({ optimizationLevel: 2 })
                    ]
                  }).then(files => {
                    console.log(files);
                    resolve("Images Compressed!!!");
                  });
                }
              });
            }
          });
        }); // end of promise

        return promise;
      }; // End compressImages Function

      // And finish up miscellaneous I/O operations
      const miscOperations = function(result) {
        console.log(result);

        const promise = new Promise(function(resolve, reject) {
          require("file-copy")("index.html", "dist/index.html");
          console.log("index.html: copy to dist/ folder");

          // Lets update dist/index.html file src and href links to reflect new location
          console.log(
            "index.html: Redoing file links to reflect move to /dist folder."
          );
          fs.readFile("dist/index.html", "utf8", function(err, data) {
            if (err) {
              reject(err);
            }

            // check and replace both src= and href= links to reflect chenge to dist/ folder
            // Notice we chained .replace to do it
            const regEx1 = /src\s*=\s*"\.\/src\//gi;
            const regEx2 = /src\s*=\s*'\.\/src\//gi;
            const regEx3 = /href\s*=\s*"\.\/src\//gi;
            const regEx4 = /href\s*=\s*'\.\/src\//gi;

            let distIndexHtml = data
              .replace(regEx1, 'src="./')
              .replace(regEx2, "src='./")
              .replace(regEx3, 'href="./')
              .replace(regEx4, "href='./");
            fs.writeFile("dist/index.html", distIndexHtml, "utf8", function(
              err
            ) {
              if (err) reject(err);
            });
          });
          setTimeout(function() {
            resolve("Build Process Completed...");
          }, 1500);
        }); //  End of promise.

        return promise;
      }; // End miscOperations function

      // Call promise chain
      browserifyBuild()
        .then(compressImages, compressImages) // Call compressImages for for either resolve or reject
        .then(miscOperations)
        .then(
          function(result) {
            console.log(result);
          },
          function(reason) {
            console.err(reason);
          }
        );
    }
  });
});
