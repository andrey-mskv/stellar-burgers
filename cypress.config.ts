import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'fffe6y',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4000',
  },
});
