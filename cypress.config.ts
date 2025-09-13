import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4201',
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
