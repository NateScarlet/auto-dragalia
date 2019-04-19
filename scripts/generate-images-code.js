const fs = require('fs');
const path = require('path');

/** @param {string} str */
function toCamelCase(str) {
  return str.replace(/[-\.](.)/g, match => match[1].toUpperCase());
}
const imageNames = new Set();
const commonHeader = [
  '// This file is auto generated',
  '// Use `npm run code-generate:images` to update this file'
];

async function generateImageIndex(folder) {
  return new Promise((resolve, reject) => {
    const relativePath = path.posix.relative('src', folder);
    fs.readdir(folder, (err, files) => {
      if (err) {
        throw err;
      }
      /** @type {string[]} */
      const importLines = [];
      /** @type {string[]} */
      const exportLines = [];
      for (const i of files) {
        if (i.endsWith('.ts')) {
          continue;
        }
        const importName = toCamelCase(i);
        const imageName = toCamelCase(path.posix.parse(i).name);
        imageNames.add(imageName);

        importLines.push(
          `import * as ${importName} from '@/${relativePath}/${i}';`
        );
        exportLines.push(
          `index.${imageName} = images.fromBase64(${importName});`
        );
      }
      updateIndex(folder, importLines, exportLines).then(resolve, reject);
    });
  });
}

(async function() {
  const baseDir = 'src/assets/images';

  const folders = fs
    .readdirSync(baseDir)
    .map(i => path.posix.join(baseDir, i))
    .filter(i => fs.lstatSync(i).isDirectory());
  await Promise.all(folders.map(generateImageIndex));

  fs.writeFileSync(
    path.posix.join(baseDir, 'type.ts'),
    [
      ...commonHeader,
      'export type ImageAssets = Record<',
      ...Array.from(imageNames)
        .sort()
        .map(i => `| '${i}'`),
      ', Image>;',
      ''
    ].join('\n')
  );
  fs.writeFileSync(
    path.posix.join(baseDir, 'index.ts'),
    [
      ...commonHeader,
      ...folders
        .map(i => path.posix.basename(i))
        .map(i => `import { index as img${i} } from '@/assets/images/${i}';`),
      `\
import { ImageAssets } from '@/assets/images/type';

export const assets: Record<string, Partial<ImageAssets>> = {`,
      ...folders
        .map(i => path.posix.basename(i))
        .map(i => `  '${i}': img${i},`),
      `};

export const img: ImageAssets = { ...(<ImageAssets>img1080x2160) };
`
    ].join('\n')
  );
})();

async function updateIndex(folder, importLines, exportLines) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      `${folder}/index.ts`,
      [
        ...commonHeader,
        ...importLines,
        '',
        'export const index: Record<string, Image> = {};',
        '',
        ...exportLines,
        '',
        'Object.freeze(index);',
        ''
      ].join('\n'),
      err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
}
