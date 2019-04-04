/* eslint-env node */
module.exports = function generateConfig(api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
        },
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false,
      },
    ],
  ]

  return {
    presets,
  }
}
