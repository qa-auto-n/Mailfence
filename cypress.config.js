const { defineConfig } = require("cypress");
const fs = require('fs')

module.exports = defineConfig({
  env: {
    url: 'https://mailfence.com/'
  },
  defaultCommandTimeout : 6000,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        deleteFile(filePath) {
          fs.unlinkSync(filePath)
          return null
        }
      })
    }
  }
})
