const options = {
  info: {
    version: '1.0.0',
    title: 'Humanitarian aid information Service',
    description:
      'This service is intended to retreive information about donations given to countries from donors of all type. The current implementation to obtain the information is throught the International Aid Transparency Initiative API.',
    license: {
      name: 'MIT'
    }
  },
  swaggerUIPath: '/api-docs',
  filesPattern: './docs/*.js',
  baseDir: __dirname,
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic'
    }
  },
  servers: [
    {
      url: 'http://localhost:{port}/',
      variables: {
        port: {
          default: '8080'
        }
      },
      description: 'Default development server'
    }
  ]
}

module.exports = {
  options
}
