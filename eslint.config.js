module.exports = {
  ignores: [
    "*.js", // JS 파일 무시
    "node_modules", // node_modules 무시
    "dist", // 빌드 결과물 무시
    ".husky", // Husky 폴더 무시
    ".github", // GitHub Actions 폴더 무시
    ".prettierrc", // Prettier 설정 파일 무시
    "ecosystem.config.js", // PM2 설정 파일 무시
  ],
  languageOptions: {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: ["./tsconfig.json"],
      tsconfigRootDir: __dirname,
      sourceType: "module",
    },
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Prettier와 충돌 방지
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
