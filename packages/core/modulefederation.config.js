const { dependencies } = require('./package.json');

module.exports = {
  name: 'core',
  exposes: {   
    "./Login" : "./src/pages/Login",
    "./MyClasses" : "./src/pages/myclasses/MyClasses.js",
    "./ClassDetails" : "./src/pages/myclasses/ClassDetails.js"
  },
  filename: 'remoteEntry.js',
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
};
