/*
 * @Author: xukai
 * @Date: 2020-06-03 14:37:54
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-03 14:58:55
 */
const fs = require('fs')
const path = require('path')
const routePath = path.join(__dirname, '..', 'routes')
const routes = []

function searchRoute (routePath) {
  const files = fs.readdirSync(routePath)
  files.forEach(file => {
    if (file.endsWith('.js')) {
      if (file === 'error.js') return
      routes.push(require(path.join(routePath, file)))
      return
    }
    searchRoute(path.join(routePath, file))
  })
}
searchRoute(routePath)

module.exports = (app) => {
  routes.forEach(route => {
    app.use(route.middleware())
  })
}
