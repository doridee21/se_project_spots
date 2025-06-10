/*const path = */ require("./pages/index.css");
// Import the image
const stepsSrc = require("./images/steps.png");

// Select the element and set the src
const stepsImage = document.getElementById("image-steps");
stepsImage.src = stepsSrc;

/*const path = */ require("./pages/index.css"); // add import of the main stylesheets file

// this is where my issues started today... the import keyword: import "./pages/index.css"; // add import of the main stylesheets file
console.log("Hello, world!");

const numbers = [2, 3, 5];

// Arrow function. How will Internet Explorer cope with it?
const doubledNumbers = numbers.map((number) => number * 2);

console.log(doubledNumbers); // 4, 6, 10
