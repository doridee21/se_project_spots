const presets = [
  [
    "@babel/preset-env",
    {
      targets: "defaults, IE 11, not dead",
      useBuiltIns: "entry",
      corejs: "^3",
    },
  ],
];

module.exports = {
  presets,
  // Add sourceType here, outside of the presets array
  sourceType: "module",
};
