const fs = require('fs');

const fallbackLocale = require('../src/locales/zh.json');

(() => {
  const keys = Object.keys(fallbackLocale);
  fs.writeFileSync(
    'src/locales/schema.json',
    JSON.stringify(
      {
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id:
          'https://raw.githubusercontent.com/NateScarlet/auto-dragalia/master/src/locale/schema.json',
        type: 'object',
        properties: (() => {
          const ret = {};
          for (const i of keys) {
            ret[i] = { type: 'string' };
          }
          return ret;
        })(),
        required: keys
      },
      null,
      4
    )
  );
})();
