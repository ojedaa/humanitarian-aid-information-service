const dateHelper = require('../../utils/date.helper')

describe('Date helper tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('call getDatesRangeFromFiveYears', () => {
    const year = 2022
    const expectedResult = {
      topDate: '2022-12-31T23:59:59.999Z',
      bottomDate: '2017-01-01T00:00:00.000Z'
    }

    it('calls successfully', async () => {
      const result = await dateHelper.getDatesRangeFromFiveYears(year)
      expect(result).toEqual(expectedResult)
    })
  })
})
