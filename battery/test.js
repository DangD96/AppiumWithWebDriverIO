// Need to put the path to 'adb' executable in PATH. The adb executable is in ANDROID_HOME/platform-tools

const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.android.settings',
  'appium:appActivity': '.Settings',
  'appium:udid' : 'emulator-5554'  // AVD created in Android Studio. ID retrieved using [adb devices]
};

const wdOpts = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  // Can run Appium on port 4724 instead of the default 4723 by doing [appium --port 4724]
  // port: parseInt(process.env.APPIUM_PORT, 10) || 4724,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  console.log("APPIUM HOST: " + wdOpts.host);
  console.log("APPIUM PORT: " + wdOpts.port);
  try {
    const batteryItem = await driver.$('//*[@text="Battery"]');
    await batteryItem.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
