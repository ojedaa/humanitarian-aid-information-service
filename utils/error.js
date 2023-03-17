/*
 * @Author: Allan Ojeda
 * @Date: 2023-03-14 21:40:36
 * @Last Modified by: Allan Ojeda
 * @Last Modified time: 2023-03-16 19:26:30
 */

class CustomError {}

class CustomErrorMessage extends CustomError {
  constructor (message, code = 500, stack = null) {
    super()
    this.code = code
    this.message = message
    this.stack = stack
  }
}

module.exports = {
  CustomError,
  CustomErrorMessage
}
