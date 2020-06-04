module.exports = {
  apps: [{
    name: 'weibo',
    script: 'bin/www',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    port: 8000,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    env_production: {
      NODE_ENV: 'production',
      port: 8000
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '120.27.244.150',
      ref: 'origin/master',
      repo: 'git@github.com:xukaike/my-weibo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
