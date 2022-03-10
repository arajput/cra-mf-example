const cracoModuleFederation = require('craco-module-federation');

module.exports = {
  devServer: {
    port: 3000,
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
