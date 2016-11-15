var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'automated-test'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://192.168.99.100/automated-test-development',
    jwtsecret: process.env.JWTSECRET || 'supersecretsharedkey'
  },

  test: {
    root: rootPath,
    app: {
      name: 'automated-test'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://192.168.99.100/automated-test-test',
    jwtsecret: process.env.JWTSECRET || 'supersecretsharedkey'
  },

  production: {
    root: rootPath,
    app: {
      name: 'automated-test'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://192.168.99.100/automated-test-production',
    jwtsecret: process.env.JWTSECRET || 'supersecretsharedkey'
  }
};

module.exports = config[env];
