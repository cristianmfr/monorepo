import { defineConfig } from 'oxfmt'
import ultracite from 'ultracite/oxfmt'

export default defineConfig({
  ...ultracite,
  sortImports: true,
  semi: false,
  jsxSingleQuote: true,
  singleQuote: true,
  trailingComma: 'es5',
  sortPackageJson: true,
  sortTailwindcss: true,
})
