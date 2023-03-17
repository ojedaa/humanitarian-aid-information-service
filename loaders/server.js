/*
 * @Author: Allan Ojeda
 * @Date: 2023-03-14 11:45:40
 * @Last Modified by: Allan Ojeda
 * @Last Modified time: 2023-03-17 11:08:48
 */

const express = require('express')
const { serverConfig } = require('../config')
const expressJSDocSwagger = require('express-jsdoc-swagger')
const { options } = require('../doc.config')

class Server {
  constructor () {
    this.app = express()
    this.port = serverConfig.port

    this.paths = {
      donor: '/api/donors'
    }

    this.middlewares()
    this.routes()
    this.doc()
  }

  middlewares () {
    this.app.use(express.json())
  }

  doc () {
    expressJSDocSwagger(this.app)(options)
  }

  routes () {
    this.app.use(this.paths.donor, require('../routes/donors.route'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Server running in port: ', this.port)
    })
  }
}

module.exports = Server
