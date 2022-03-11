const { dependencies } = require('./package.json');

module.exports = {
  name: 'host',
  remotes: {
    attendance: 'attendance@[window.appModules.attendance.url]/remoteEntry.js',
  },
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
