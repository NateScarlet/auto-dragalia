const fs = require('fs');
/** @param {string} str */
function toCamelCase(str) {
  return str.replace(/[-\.](.)/g, match => match[1].toUpperCase());
}
(function() {
  fs.readdir('src/assets', (err, files) => {
    /** @type {string[]} */
    const importLines = [];
    /** @type {string[]} */
    const exportLines = [];
    for (const i of files) {
      const importName = toCamelCase(i);
      importLines.push(`import ${importName} from "@/src/assets/${i}"`);
      exportLines.push(
        `export const ${importName.replace(
          /Png$/,
          ''
        )} = images.fromBase64(${importName})`
      );
    }
    fs.writeFile(
      'src/images.ts',
      [
        '// This file is auto generated',
        '// Use `npm run code-gen:images` to update this file',
        ...importLines,
        '',
        ...exportLines
      ].join('\n'),
      () => {}
    );
  });
})();
