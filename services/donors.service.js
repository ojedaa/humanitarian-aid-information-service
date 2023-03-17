/*
 * @Author: Allan Ojeda
 * @Date: 2023-03-14 22:00:39
 * @Last Modified by: Allan Ojeda
 * @Last Modified time: 2023-03-17 12:07:36
 */

const httpClient = require('./http-client.service')

const getByCountryAndYear = async (countryCode, year) => {
  try {
    const results = await httpClient.getData(countryCode, year)
    return generateOrderedResponse(results)
  } catch (error) {
    throw error
  }
}

// ---------- private

/**
 * @description Generate custom formatted response to client
 * @param data {array} raw data
 * @returns {object} Return oject with formatted data.
 */

function generateOrderedResponse (data = []) {
  const formatted = data.map((row) => {
    const dateInRow = new Date(row.transaction_transaction_date_iso_date[0])

    return {
      amount: row.transaction_value[0],
      donor: row.reporting_org_narrative[0],
      year: dateInRow.getFullYear()
    }
  })

  const unorderedResult = formatted.reduce((acc, cur) => {
    acc[cur.year] = acc[cur.year] || {}
    acc[cur.year] = retrieveDonorAccumulator(acc[cur.year], {
      amount: cur.amount,
      donor: cur.donor
    })
    return acc
  }, {})

  const orderedResult = {}

  for (const yearKey in unorderedResult) {
    const sortableKeys = Object.fromEntries(
      Object.entries(unorderedResult[yearKey]).sort(([, a], [, b]) => a - b)
    )
    orderedResult[yearKey] = sortableKeys
  }

  return orderedResult
}

function retrieveDonorAccumulator (acc, cur) {
  if (acc.hasOwnProperty(cur.donor)) {
    acc[cur.donor] = acc[cur.donor] + cur.amount
  } else {
    acc[cur.donor] = cur.amount
  }
  return acc
}

module.exports = {
  getByCountryAndYear
}
