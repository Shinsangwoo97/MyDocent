const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  // Other configurations...
  plugins: [
    new CaseSensitivePathsPlugin(),
  ],
};
