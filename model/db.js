const config = require('config')
const MySQL = require('mysql2')

const pool = MySQL.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.pass,
  database: config.mysql.db,
  connectionLimit: 1
})

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err)
      } else {
        conn.query(sql, values, (err, rows) => {
          if (err) { reject(err) } else {
            resolve(rows)
          }
          conn.release()
        })
      }
    })
  })
}

const heartbeat = async () => {
  try {
    await query('select 1')
  } catch (err) {
    console.error('heartbeat err', JSON.stringify(err))
  }
  setTimeout(heartbeat, 60 * 1000 * 10)
}
heartbeat()

module.exports = {
  query
}
