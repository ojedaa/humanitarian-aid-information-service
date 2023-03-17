const serverConfig = {
  port: process.env.PORT || 3000,
};

const apiConfig = {
  tokenFieldName:
    process.env.API_TOKEN_FIELD_NAME || 'Ocp-Apim-Subscription-Key',
  token: process.env.API_TOKEN || '',
  url:
    process.env.API_URL ||
    'https://api.iatistandard.org/datastore/transaction/select',
};

const openAidQueryValues = {
  transactionCodesField: 'transaction_transaction_type_code',
  transactionCodes: '1 OR 9',
  countryCodeField: 'recipient_country_code',
  countryCodeFieldAlternative: 'transaction_recipient_country_code',
  dateField: 'transaction_transaction_date_iso_date',
  selectionFields:
    'transaction_value,transaction_transaction_date_iso_date,reporting_org_narrative',
  queryOperator: 'OR',
  sow: false,
  format: 'json',
  transactionField: 'transaction_value',
  rows: 1000,
  start: 0,
};

const openAidQueryFields = {
  query: 'q',
  queryOperator: 'q.op',
  fields: 'fl',
  sow: 'sow',
  format: 'wt',
  rows: 'rows',
  start: 'start',
};

module.exports = {
  serverConfig,
  apiConfig,
  openAidQueryValues,
  openAidQueryFields,
};
