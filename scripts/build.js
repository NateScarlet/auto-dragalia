const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ajv = require('ajv');

function listDir(pathname) {
  return fs.readdirSync(pathname).map(i => path.join(pathname, i));
}

function buildAllAssets(locale) {
  for (const i of listDir('src/assets/images')) {
    if (!fs.statSync(i).isDirectory()) {
      continue;
    }
    execSync(`npx webpack -p`, {
      env: {
        ...process.env,
        TARGET_ASSET: path.basename(i),
        TARGET_LOCALE: locale
      },
      stdio: 'inherit'
    });
  }
}

(() => {
  const validate = new ajv().compile(require('../src/locale/schema.json'));
  const locales = [];
  for (const i of listDir('src/locale').filter(i => i.endsWith('.json'))) {
    if (i.endsWith('schema.json')) {
      continue;
    }
    const locale = path.basename(i, '.json');
    if (!validate(require(`../src/locale/${locale}.json`))) {
      console.log({
        msg: 'Invalid locale data',
        locale,
        errors: validate.errors
      });
      process.exit(1);
    }
    locales.push(locale);
  }
  for (const locale of locales) {
    buildAllAssets(locale);
  }
})();
