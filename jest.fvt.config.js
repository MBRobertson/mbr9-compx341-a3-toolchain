// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/?(*.)+(fvt).[tj]s?(x)"
  ],

  // This option allows the use of a custom results processor
  testResultsProcessor: "jest-bamboo-reporter",
};
