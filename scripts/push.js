const { execSync } = require('child_process');
const version = require('../package.json').version;
const glob = require('glob');

glob.Glob(`dist/auto-dragalia-*-${version}-*.auto.js`, {}, (err, files) => {
  for (const i of files) {
    execSync(`adb push ${i} /sdcard/脚本/`, {
      stdio: 'inherit'
    });
  }
});
