const { execSync } = require('child_process');
const version = require('../package.json').version;

execSync(`adb push dist/auto-dragalia-${version}.auto.js /sdcard/脚本/`, {
  stdio: 'inherit'
});
