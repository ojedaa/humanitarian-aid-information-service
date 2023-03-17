const { __set__ } = require('../../services/http-client.service')
const httpClient = require('../../services/http-client.service')
const { CustomError } = require('../../utils/error')

describe('Http client service tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('call getData', () => {
    const countryCode = 'SD'
    const year = '2012'
    const clientResponse = {
      data: [
        {
          transaction_value: [93328.0],
          transaction_transaction_date_iso_date: ['2011-07-04T00:00:00Z'],
          reporting_org_narrative: ['Mannion Danniels']
        }
      ],
      total: 1
    }
    const emptyResponse = {
      data: [],
      total: 0
    }

    it('calls successfully', async () => {
      __set__('getPage', () => clientResponse)

      const result = await httpClient.getData(countryCode, year)
      expect(result).toEqual(clientResponse.data)
    })

    it('throws not found error when no data is retrieved', async () => {
      __set__('getPage', () => emptyResponse)

      try {
        await httpClient.getData(countryCode, year)
        expect.assertions(2)
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError)
      }
    })
  })
})
