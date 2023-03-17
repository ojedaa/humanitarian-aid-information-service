const httpClient = require('../../services/http-client.service')
const donorsService = require('../../services/donors.service')
const { CustomErrorMessage, CustomError } = require('../../utils/error')

describe('Donors service tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('call getByCountryAndYear', () => {
    const countryCode = 'SD'
    const year = '2012'
    const clientResponse = [
      {
        transaction_value: [93328.0],
        transaction_transaction_date_iso_date: ['2011-07-04T00:00:00Z'],
        reporting_org_narrative: ['Mannion Danniels']
      }
    ]

    const expectedResult = {
      2011: {
        'Mannion Danniels': 93328
      }
    }

    it('calls successfully', async () => {
      const getDataFromClientSpy = jest.spyOn(httpClient, 'getData')
      getDataFromClientSpy.mockResolvedValueOnce(clientResponse)

      const result = await donorsService.getByCountryAndYear(countryCode, year)
      expect(result).toEqual(expectedResult)
    })

    it('throws error when http client fails', async () => {
      const getDataFromClientSpy = jest.spyOn(httpClient, 'getData')
      getDataFromClientSpy.mockImplementationOnce(() => {
        throw new CustomErrorMessage()
      })

      try {
        expect.assertions(2)
        await donorsService.getByCountryAndYear(countryCode, year)
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError)
      }
      expect(getDataFromClientSpy).toHaveBeenCalledTimes(1)
    })
  })
})
