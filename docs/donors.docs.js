/**
 * A donor response
 * @typedef {object} Year
 * @property {number} donor - The total donations of the current year
 */

/**
 * Resume donations response
 * @typedef {object} Donations
 * @property {object} Year - The year parent
 */

/**
 * GET /api/donors/resume
 * @summary Retrieves total donations given to a country grouped by the last five years.
 * @tags donors
 * @param {string} countryCode.query.required - Country code
 * @param {string} year.query.required - Year
 * @return {Donations} 200 - success response - application/json
 * @return {object} 400 - bad request response
 * @return {object} 404 - not found response
 * @example response - 200 - success response example
 *
 *   {
 *     "2022": {
 *          "UNICEF": 350000
 *      }
 *   }
 * @example response - 400 - example error response
 * {
 *   "message": ["year must be a `number` type, but the final value was: `NaN` (cast from the value `\"2012a\"`)."],
 *   "code": 400
 * }
 * @example response - 404 - example error response
 *{
 *    "message": "Not found",
 *    "code": 404
 *}
 */
