const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4201',
    projectId: process.env['CYPRESS_PROJECT_ID'],
    defaultCommandTimeout: 10000, // pode esperar até 10 segundos por comando
    video: true,
    screenshotOnRunFailure: true, // tira print automático em falhas
    trashAssetsBeforeRuns: true, // limpa vídeos antigos antes de rodar
    videoCompression: 32, // (opcional) reduz tamanho dos vídeos
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
