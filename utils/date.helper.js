/*
 * @Author: Allan Ojeda
 * @Date: 2023-03-15 12:37:17
 * @Last Modified by: Allan Ojeda
 * @Last Modified time: 2023-03-17 09:06:08
 */

const getDatesRangeFromFiveYears = (year) => {
  const bottomYear = year - 5
  const topDate = new Date(year, 11, 31)
  topDate.setUTCHours(23, 59, 59, 999)
  const bottomDate = new Date(bottomYear, 0, 1)
  bottomDate.setUTCHours(0, 0, 0)

  return {
    topDate: topDate.toISOString(),
    bottomDate: bottomDate.toISOString()
  }
}

module.exports = {
  getDatesRangeFromFiveYears
}
