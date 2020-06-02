
'use strict'

const rp = require('request-promise')

class Rp {
  // var options = {
  //   uri: 'https://api.github.com/user/repos',
  //   qs: {
  //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
  //   },
  //   headers: {
  //     'User-Agent': 'Request-Promise'
  //   },
  //   json: true // Automatically parses the JSON string in the response
  // }
  get (options = {}) {
    const data = new Promise(function (resolve, reject) {
      rp(options)
        .then(function (data) {
          resolve(data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
    return data
  }

  // var options = {
  //   method: 'POST',
  //   uri: 'http://api.posttestserver.com/post',
  //   body: {
  //       some: 'payload'
  //   },
  //   json: true // Automatically stringifies the body to JSON
  // };
  post (options = {}) {
    const data = new Promise(function (resolve, reject) {
      rp(options)
        .then(function (data) {
          resolve(data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
    return data
  }
}

module.exports = new Rp()
