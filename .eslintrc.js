const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  extends: 'airbnb-base',
  settings: {
    'import/resolver': {
      webpack: {
        config: 'gulp/config/webpack.js',
      },
    },
  },
  globals: {
    $: true,
    Run: true,
    Plugin: true,
    __webpack_require__: true,
  },
  rules: {
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': [2, {
      devDependencies: [
        'gulpfile.js',
        'gulp/**/*.js',
        'server/**/*.js',
      ],
    }],
    'no-bitwise': [2, {
      allow: ['~'],
    }],
    'func-names': [0],
    'no-param-reassign': [2, {
      ignorePropertyModificationsFor: ['Class'],
    }],
    'no-unused-vars': [isDevelopment ? 1 : 2],
    'no-debugger': [isDevelopment ? 1 : 2],
    'no-console': [isDevelopment ? 1 : 2, {
      allow: ['info', 'warn', 'error'],
    }],
  },
};
