// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {
    const waitTime = 5000;
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', waitTime)
      .assert.title("commercetools demo")
      .end()
  }
}
