import config from '@lnu/eslint-config'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['dist/**'],
  },
  ...config,
  prettier,
]
