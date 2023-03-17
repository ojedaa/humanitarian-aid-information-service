/*
 * @Author: Allan Ojeda
 * @Date: 2023-03-14 11:43:41
 * @Last Modified by: Allan Ojeda
 * @Last Modified time: 2023-03-17 10:18:44
 */

require('dotenv').config()
const Server = require('./loaders/server')

const server = new Server()

server.listen()
