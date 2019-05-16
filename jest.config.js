// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    // "client/**/*.js",
    "routes/**/*.js"
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "test/coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/build/"
  ],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "json-summary"
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // This option allows the use of a custom results processor
  // testResultsProcessor: "jest-bamboo-reporter",
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test/',
        outputName: 'jesttest.xml'
      }
    ]
  ],

  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },

  "setupFilesAfterEnv": ['<rootDir>/__mocks__/setupFiles.js']
};
