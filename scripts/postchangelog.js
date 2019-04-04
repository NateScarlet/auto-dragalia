const { readFile, writeFileSync } = require('fs');
const { resolve } = require('path');
const changelog = resolve(__dirname, '../CHANGELOG.md');

readFile(changelog, (err, data) => {
  writeFileSync(
    changelog,
    data
      .toString()
      .replace(/\n# /, '\n## ')
      .replace('Change Log', 'Changelog')
  );
});
