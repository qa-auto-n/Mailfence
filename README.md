# :star: Automation tests for *mailfence.com*
This repository contains e2e test(s) for the **mailfence.com** website using the Cypress testing framework.

## :rocket: Prerequisites
Before running the tests, make sure you have the following software installed:

* Node.js
* npm

## Installation
To install the necessary dependencies, run the following command in your terminal:

```bash
cd /project/path
```
```bash
npm install
```

## Configuration
Sensitive data, such as the email and password, can be passed as environment variables when running the tests. This helps to keep the credentials secure. To open Cypress with sensitive data, use the following command:

```bash
npx cypress open --env email=[email],password=[password]
```

Replace **email** with your actual email address and **password** with your password.

## Running Tests
To run the tests, use the following command:

```bash
npx cypress run --env email=[email],password=[password]
```

Replace **email** with your actual email address and **password** with your password.

## Test Files
The test cases are located in the cypress/e2e directory.


## :handshake: Feedback
Feedback is welcome!
