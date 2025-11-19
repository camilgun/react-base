import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

/** @type {import("eslint").Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs"],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },


  prettier,
]
