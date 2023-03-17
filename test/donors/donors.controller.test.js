const donorService = require('../../services/donors.service')
const donorsController = require('../../controllers/donors.controller')

describe('Donors controller tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('call getDonors', () => {
    const countryCode = 'SD'
    const year = '2012'
    const yearValue = 2012
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const req = { query: { countryCode, year } }

    const expectedResult = {
      2012: {
        'Mannion Danniels': 93328
      }
    }

    it('calls successfully', async () => {
      const getByCountryAndYearSpy = jest.spyOn(
        donorService,
        'getByCountryAndYear'
      )
      getByCountryAndYearSpy.mockResolvedValueOnce(expectedResult)

      await donorsController.getDonors(req, res)

      expect.assertions(3)
      expect(getByCountryAndYearSpy).toBeCalledWith(countryCode, yearValue)
      expect(res.status).toBeCalledWith(200)
      expect(res.json).toBeCalledWith({
        results: expectedResult
      })
    })

    it('throws bad request error when query validation fails', async () => {
      const invalidReq = { query: { countryCode, year: 'a' } }

      await donorsController.getDonors(invalidReq, res)

      expect.assertions(2)
      expect(res.status).toBeCalledWith(400)
      expect(res.json).toHaveBeenCalledTimes(1)
    })
  })
})
