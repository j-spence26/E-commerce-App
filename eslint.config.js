import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  // -----------------------------
  // FRONTEND (React)
  // -----------------------------
  {
    files: ["client/src/**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },

    // ⛔ No "extends" — we spread configs manually
    ...js.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    ...pluginReactHooks.configs.recommended,

    settings: {
      react: { version: "detect" },
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "warn",
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
    },
  },

  // -----------------------------
  // BACKEND (Node / Express)
  // -----------------------------
  {
    files: ["server.js", "routes/**/*.js", "db/**/*.js"],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },

    ...js.configs.recommended,

    rules: {
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
    },
  },
];
