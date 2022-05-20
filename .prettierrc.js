module.exports = {
  arrowParens: "avoid",
  printWidth: 150,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  overrides: [
    {
      files: ["package.json", "*.html"],
      options: {
        useTabs: false
      }
    }
  ]
};
