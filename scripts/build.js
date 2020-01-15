const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

(() => {
  const imgFolder = 'src/assets/images';
  for (const i of fs.readdirSync(imgFolder)) {
    if (!fs.statSync(path.join(imgFolder, i)).isDirectory()) {
      continue;
    }
    execSync(`npx webpack -p`, {
      env: {
        ...process.env,
        TARGET_ASSET: i
      },
      stdio: 'inherit'
    });
  }
})();
