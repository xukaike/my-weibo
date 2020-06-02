'use strict'

module.exports = {
  mysql: {
    host: 'localhost',
    db: 'weibo_test',
    user: 'root',
    pass: '123456',
    port: 3306,
    dbCache: false
  },
  REDIS_CONF: {
    host: 'localhost',
    port: 6379
  },
  host: 'http://127.0.0.1:3000',
  USER_PREFIX: '/api/user'
}
