const winston = require('winston')
require('winston-daily-rotate-file')

const { ERROR_LOG_NAME, APP_LOG_NAME, SAVE_DAYS } = require('../config/constant')

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
}

const formatter = winston.format.combine(
  winston.format.json(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.prettyPrint(),
  winston.format.printf(info => {
    const showInfo = { time: info.timestamp, pid: process.pid, levels: info.level, message: info.message }
    return JSON.stringify(showInfo)
  })
)

const logger = winston.createLogger({
  levels,
  format: formatter,
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: ERROR_LOG_NAME
    }),
    new (winston.transports.DailyRotateFile)({
      filename: APP_LOG_NAME,
      zippedArchive: true,
      maxFiles: SAVE_DAYS
    }),
    new winston.transports.Console({})
  ]
})

const infoLog = (moduleName, controllerName, params) => {
  logger.info({
    moduleName,
    controllerName,
    params
  })
}

const errLog = (moduleName, controllerName, params) => {
  logger.info({
    moduleName,
    controllerName,
    params
  })
}

module.exports = {
  infoLog,
  errLog
}
