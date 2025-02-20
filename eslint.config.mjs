import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import process from "node:process";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginJsonc from "eslint-plugin-jsonc";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("plugin:prettier/recommended"),
  ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
  {
    ignores: ["**/dist/**"],
  },
  {
    rules: {
      "no-fallthrough": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
