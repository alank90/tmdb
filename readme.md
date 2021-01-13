### Important Notes
You will need to include a config.js file in the /src/resources directory which contains:

// ======== config.js ============= //

apiKey = "MyAPIKey";

module.exports = apiKey;

And don't forget to update your .gitignore file also. And oila no 
API keys on Github.

### index.html
Has references to `main.css` and (**importantly**) `index.js`.

### main.css
Pretty obvious

### main.js
Inside `src/js/` is where all the JS is. That's where we include the one library that we use - `domready` - to generate the `index.js`


## Building the project for deployment
Well, this may be a rapo but we might still want to push this onto a prod environment. A apache server or something of the sort.

To generate a prod output, I've also created a `build.js` file that run using:
```
npm run build
```
This creates a build dir that includes all you need to push to prod.
### Testing the build
If you want to check the build - Just to make sure:
```
npm run testbuild
```
This runs `budo` on the build

## Using postcss-cli for css-declaration-sorter and autoprefixer
`npm install -g postcss`

### Install postcss-cli globally:
`npm install -g postcss-cli`

And npx:
`npm install -g npx`

then install postcss plugins locally 

`npm install autoprefixer --save-dev`
`npm install css-declaration-sorter --save-dev`

### And then issue commands 
`npx postcss src\css\main.css -u css-declaration-sorter --replace --no-map`

`npx postcss src\css\main.css -u autoprefixer --replace`

Can also do postcss --h to see more options

