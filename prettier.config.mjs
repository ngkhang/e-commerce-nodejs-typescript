/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  useTabs: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'crlf',
  printWidth: 120,
  tabWidth: 2,
  semi: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  arrowParens: 'always',
};

export default prettierConfig;
