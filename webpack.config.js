const path = require('path');

module.exports = {
    parser: "babel-eslint",
    parserOptions: {
      sourceType: "module",
      allowImportExportEverywhere: false,
      ecmaFeatures: {
        globalReturn: false,
      },
      babelOptions: {
        configFile: "path/to/config.js",
      },
    },
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
      },
    devServer: {
        contentBase: './dist'
     }
}