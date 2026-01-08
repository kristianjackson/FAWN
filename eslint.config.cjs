const js = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}", "**/*.{js,cjs,mjs}"] ,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules
    }
  },
  {
    files: ["**/*.config.{js,cjs,mjs}", "eslint.config.cjs"],
    rules: {
      "@typescript-eslint/no-var-requires": "off"
    }
  }
];
