const yup = require('yup')

const getDonorsSchema = yup
  .object({
    countryCode: yup.string().required(),
    year: yup.number().min(1980).max(new Date().getFullYear()).required()
  })
  .required()

module.exports = {
  getDonorsSchema
}
