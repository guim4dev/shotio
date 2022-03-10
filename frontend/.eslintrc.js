module.exports = {
  env: {
    es6: true,
    jest: true,
    browser: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    __DEV__: true,
  },
  plugins: ["import"],
  rules: {
    "import/prefer-default-export": "off",
    // "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    camelcase: "off",
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src",
      },
    },
  },
};
