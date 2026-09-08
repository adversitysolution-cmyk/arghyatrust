const path = require('path');

module.exports = {
  apps: [
    {
      name: 'arghya-trust',
      script: 'server/index.js',
      cwd: path.join(__dirname, 'AT'),
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || '5050',
      },
    },
  ],
};
