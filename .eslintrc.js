module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ["plugin:prettier/recommended", "eslint:recommended"],
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true
    }
  },
  rules: {
    "prettier/prettier": "error"
  }
};
