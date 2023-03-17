/*
 * @Author: Allan Ojeda
 * @Date: 2023-03-15 08:46:57
 * @Last Modified by: Allan Ojeda
 * @Last Modified time: 2023-03-17 12:05:54
 */

const fetch = require('node-fetch')
const {
  apiConfig,
  openAidQueryValues,
  openAidQueryFields
} = require('../config')
const { getDatesRangeFromFiveYears } = require('../utils/date.helper')
const { CustomErrorMessage } = require('../utils/error')

/**
 * @description Request data until there is no data to consume.
 * @param countryCode {string} Country code
 * @param year {number} Year
 * @returns {array} Return array with raw data.
 */

const getData = async (countryCode, year) => {
  try {
    const rows = openAidQueryValues.rows
    let start = openAidQueryValues.start
    let toContinue = true
    let content = []

    while (toContinue) {
      const { data, total } = await getPage(countryCode, year, { rows, start })
      content = content.concat(data)
      start = start + rows

      if (start >= total) {
        toContinue = false
      }
    }

    if (content.length == 0) {
      throw new CustomErrorMessage('Not found', 404)
    }

    return content
  } catch (error) {
    throw error
  }
}

/**
 * @description Request data from a service using a http request.
 * @param countryCode {string} Country code
 * @param year {number} Year
 * @param pagination {object} Pagination content.
 * @returns {object} Return object raw data and count of the docs total.
 */

const getPage = async (countryCode, year, pagination) => {
  try {
    const queryParams = queryParamsObject(countryCode, year, pagination)
    const url = new URL(apiConfig.url)

    for (const field in queryParams) {
      url.searchParams.append(field, queryParams[field])
    }

    const response = await fetch(url.href, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        [apiConfig.tokenFieldName]: apiConfig.token
      }
    })

    if (response.ok) {
      const data = await response.json()

      return {
        data: data.response.docs || [],
        total: data.response.numFound || 0
      }
    } else {
      throw new CustomErrorMessage('API Error', 500)
    }
  } catch (error) {
    throw new CustomErrorMessage('API Error', 500)
  }
}

const queryParamsObject = (countryCode, year, pagination) => {
  const { topDate, bottomDate } = getDatesRangeFromFiveYears(year)

  const params = {
    [openAidQueryFields.query]: '',
    [openAidQueryFields.fields]: openAidQueryValues.selectionFields || '*',
    [openAidQueryFields.queryOperator]: openAidQueryValues.queryOperator,
    [openAidQueryFields.sow]: openAidQueryValues.sow,
    [openAidQueryFields.format]: openAidQueryValues.format,
    [openAidQueryFields.rows]: pagination.rows,
    [openAidQueryFields.start]: pagination.start
  }

  const queryTransaction = `${openAidQueryValues.transactionCodesField}:(${openAidQueryValues.transactionCodes})`
  const queryCountry = `(${openAidQueryValues.countryCodeField}:${countryCode} OR ${openAidQueryValues.countryCodeFieldAlternative}:${countryCode})`
  const queryDates = `${openAidQueryValues.dateField}:[${bottomDate} TO ${topDate}]`
  const queryTransactionValues = `${openAidQueryValues.transactionField}:[1 TO *]`

  params[
    openAidQueryFields.query
  ] = `${queryTransaction} AND ${queryCountry} AND ${queryDates} AND ${queryTransactionValues}`

  return params
}

module.exports = {
  getData,
  getPage
}
