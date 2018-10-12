// postcss.config.js
/* You don't need to set the -c | --config when config is in root ./ or 
  the same directory* as the file :). 
  Note: By using postcss-cli --replace option we dont have to specify
  the -o <filename> parameter. Input file will overwritten. */

module.exports = {
  plugins: [
    require("autoprefixer")({}), // This is how to add options for a plugin
    require("css-declaration-sorter")
  ]
};
