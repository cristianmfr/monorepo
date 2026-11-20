import { defineConfig } from 'oxlint'
import core from 'ultracite/oxlint/core'
import next from 'ultracite/oxlint/next'
import react from 'ultracite/oxlint/react'

export default defineConfig({
  env: core.env,
  extends: [core, react, next],
  ignorePatterns: core.ignorePatterns,
  rules: {
    'unicorn/no-static-only-class': 'off',
    'func-style': 'off',
    'typescript/no-extraneous-class': 'off',
    'typescript/no-namespace': 'off',
    'arrow-body-style': 'off',
    'typescript/no-explicit-any': 'off',
    'class-methods-use-this': 'off',
    'react/jsx-handler-names': 'off',
  },
})
