const fs = require('fs');
const mkdirp = require('mkdirp');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifSicle = require('imagemin-gifsicle');


// using rimraf to clean up any existing build
require('rimraf')('./dist', function () {
    // and then rebuilding everything from scratch
    mkdirp('./dist/css', function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('main.css: build and uglify');
            let uglified = require('uglifycss').processFiles(
                ['src/css/main.css'],
                { maxLineLen: 500, expandVars: true }
            );
            fs.writeFile('dist/css/main.css', uglified);
            // Lets build the browserify bundle using the 
            // browserify api
            console.log('bundle.js: build and uglify');
            let b = require('browserify')();
            b.add('src/js/main.js');
            b.transform('uglifyify', { global: true });
            let indexjs = fs.createWriteStream('dist/index.js');
            // Bundle the files and their dependencies into a 
            // single javascript file.
            b.bundle().pipe(indexjs);

            // Create a promise to compress images and then
            // do the rest of our I/O work with 'then'
            const compressImages = new Promise(function (resolve, reject) {
                // Compress images 
                fs.readdir('src/img', function (err, files) {
                    if (err) {
                        console.error(`Alert! Check if the directory src/img exists. ${err}`);
                    } else if (files.length === 0) {
                        console.log('images: No images found.');
                    } else {
                        mkdirp('./dist/img', function (err) {
                            if (err) {
                                console.error(err);
                            } else {
                                imagemin(['src/img/*.{jpg,png,gif}'], 'dist/img', {
                                    plugins: [
                                        imageminJpegtran(),
                                        imageminPngquant({ quality: '65-80' }),
                                        imageminGifSicle({ optimizationLevel: 2 })
                                    ]
                                }).then(files => {
                                    console.log(files);
                                    //=> [{data: <Buffer 89 50 4e …>, path: 'dist/images/foo.jpg'}, …]
                                });
                            }
                        });
                    }
                });
                resolve('images: build and compress');
            });
            // Call promise
            compressImages
                .then(function (result) {
                    console.log(result);
                    require('file-copy')('index.html', 'dist/index.html');
                    console.log('index.html: copy to dist/ folder');
                })
                .then(function () {
                    // Lets update dist/index.html file src and href links to reflect new location
                    console.log('index.html: Redoing file links to reflect move to /dist folder.');
                    fs.readFile('dist/index.html', 'utf8', function (err, data) {
                        if (err) {
                            console.error(err);
                        }

                        // check and replace both src= and href= links to reflect chenge to dist/ folder
                        // Notice we chained .replace to do it
                        const regEx1 = /src\s*=\s*"\.\/src\//ig;
                        const regEx2 = /src\s*=\s*'\.\/src\//ig;
                        const regEx3 = /href\s*=\s*"\.\/src\//ig;
                        const regEx4 = /href\s*=\s*'\.\/src\//ig;

                        let distIndexHtml = data.replace(regEx1, 'src="\/').replace(regEx2, 'src=\'/').replace(regEx3, 'href="/').replace(regEx4, 'href=\'/');
                        fs.writeFile('dist/index.html', distIndexHtml, 'utf8', function (err) {
                            if (err) console.error(err);
                        });
                    });

                    console.log('All done!!! Wait for image compression to complete.');
                }); // end promise

        }
    });
});