# Browserify with Budo
Ok so this is the first in a series of git repos that I've created to use as templates for Rapid Prototyping (or rapo) using [Browserify](http://browserify.org) and [Budo](https://github.com/mattdesl/budo).

There's a lot (and I mean a whole lot) of tools out there for Rapid Prototyping (again Rapo) that give you this functionality but I think these two (Browserify and Budo) really put the Rapid into Rapid Prototyping - IMHO.

Also, most projects that I look at talk about Webpack, Gulp, Grunt and the like. I think these are more than just Rapo. They require a good deal more to get started. The rapo projects I'm putting together, require a super small amount of configuration and stuff.

## What's in this project
This is a barebones Browserify and Budo project. The idea is the build all other projects using this as the basic setup.

The only JavaScript for web library I've used is - which I've used because I want to not use `jQuery` or any such other library to check if the DOM is ready at the start.

*Don't get me wrong. I have quite enjoyed using `jQuery` over the years. It has contributed to where the web is at more than maybe any other single JavaScript library. But it's probably done it time.*

### index.js
This will be used by budo to start up things.

You'll include all your JS libs here

Look at the `start` script in the `package.json`

### JS Libs:
#### domready
So if you don't want to use jQuery, then [`domready`](https://www.npmjs.com/package/domready) is a very convenient (obvious) alternative.

#### jQuery
Of course, if you want to use [jQuery](https://www.npmjs.com/package/jquery), then the require is easy-peasy. 

### index.html
Has references to `main.css` and (**importantly**) `index.js`.

### main.css
Pretty obvious

### main.js
Inside `src/js/` is where all the JS is. That's where we include the one library that we use - `domready` - to generate the `index.js`

## Get going
1. Clone this repo
2. `cd` into the resultant dir
3. Run `npm install` to get the dependencies
4. Run `npm start` to launch the project in your default browser running on a local (`Node`-based) web server with `livereload` - all setup.

That's it. If you want a project with plain vanilla JS and CSS that's all you need.

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
