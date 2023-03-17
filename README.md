# Humanitarian aid information Service

This service is intended to retreive information about donations given to countries from donors of all type.  The current implementation to obtain the information is throught the International Aid Transparency Initiative ([IATI](https://developer.iatistandard.org/ "IATI")) API.


## Table of contents

- [Tech stack](#wrench-tech-stack)
- [Requirements](#warning-requirements)
- [Quick start](#rocket-quick-start)
- [Running the project](#hammer-running-the-project)
- [Architecture](#pushpin-architecture)
- [What's included](#open_file_folder-whats-included)

##Tech stack

- Node JS
- Express

##Requirements

To be able to develop and/or build the project the next are required:

- Full Access Subscription Token from IATI API.
- Node Js 16.15 (LTS)

###### Note: If token provided does not have full access permissions, the API Calls could fail as regular token only permits 5 concurrent calls when retrieving more than 5000 records.

## Quick start

Follow this steps to start working on the project:

- Clone the repo
- Change to development or feature branch
- Create and fill .env file taking *example.env* as example
- Install npm dependencies
- Run ```
npm start
``` on command line
- Happy coding

## Running the project

In order to improve productivity and fast development, the project includes these commands:

| Command  | Description |
| -------- | ----------- |
| `` npm start `` |starts the service. |
| `` npm run test `` | run unit tests. |
| `` npm run lint:fix `` | run eslint fixes. |

## Architecture

The project follows a 3-layer architecture groupping content in controllers and services, providing highly testable, loosely coupled, and easily maintainable applications.

## API Documentation

Go to web browser and access:  `localhost:{port}/api-docs` 
- port is defined in the *.env* file.

From there will find all the endpoint definitions and make tests.

## What's included

The content could change in the future.

```text
humanitarian-aid-information-service/
├── config/
│   └── index.js
├── controllers/
│   └── donors.controller.js
│   └── validators/
│               └── donors.schema.js
├── docs/
│   └── donors.docs.js
├── loaders/
│   └── server.js
├── routes/
│   └── donors.route.js
├── services/
│   └── donors.service.js
│   └── http-client.service.js
├── test/
│   └── donors/
│               └── donors.controller.test.js
│               └── donors.test.js
│   └── http-client/
│               └── http-client.test.js
│   └── utils/
│               └── date.test.js
├── utils/
│   └── date.helper.js
│   └── error.js
├── example.env
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── babel.config.js
├── doc.config.js
├── package-lock.json
├── package.json
├── README.md
├── index.js
```
