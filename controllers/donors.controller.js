/*
 * @Author: Allan Ojeda
 * @Date: 2023-03-14 21:54:52
 * @Last Modified by: Allan Ojeda
 * @Last Modified time: 2023-03-17 11:33:04
 */

const { response, request } = require('express')
const { CustomError } = require('../utils/error')
const { ValidationError } = require('yup')
const { getDonorsSchema } = require('./validators/donors.schema')
const donorsService = require('../services/donors.service')

const getDonors = async (req = request, res = response) => {
  const input = req.query
  try {
    const data = getDonorsSchema.validateSync(input)

    const results = await donorsService.getByCountryAndYear(
      data.countryCode,
      data.year
    )

    return res.status(200).json(results)
  } catch (error) {
    if (error instanceof CustomError) {
      return res
        .status(error.code)
        .send({ message: error.message, code: error.code })
    }
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.errors, code: 400 })
    }

    return res.sendStatus(500)
  }
}

module.exports = {
  getDonors
}
