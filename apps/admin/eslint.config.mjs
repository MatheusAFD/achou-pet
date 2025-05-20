import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginImportHelpers from 'eslint-plugin-import-helpers'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      'import-helpers': eslintPluginImportHelpers
    },
    rules: {
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            '/^next/',
            'module',
            '/^@admin/',
            ['parent', 'sibling', 'index']
          ],
          alphabetize: { order: 'asc', ignoreCase: true }
        }
      ]
    }
  }
]

export default eslintConfig
