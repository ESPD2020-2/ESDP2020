exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3010',
      show: !process.env.CI,
      headless: !!process.env.CI,
      windowSize: '800x600'
    }
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    }
  },
  translation: "ru-RU",
  tests: './*_test.js',
  name: 'shop-tests'
};