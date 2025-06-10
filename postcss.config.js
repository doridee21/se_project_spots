// postcss.config.js ...copy and paste

// Connect plugins to the file
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  // Connect plugins to PostCSS
  plugins: [
    autoprefixer,
    cssnano({ preset: "default" }), // set default minification settings
  ],
};

//Practice writing the setup
//const autoprefixer = require("autoprefixer");
//const cssnano = require("cssnano");
//
//module.exports = {
//  plugins: [autoprefixer, cssnano({ preset: "default" })],
//};
