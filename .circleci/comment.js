#!/usr/bin/env node

const bot = require('circle-github-bot').create();
const filename = `auto-dragalia-${process.env.CIRCLE_TAG ||
  process.env.CIRCLE_SHA1.slice(0, 8)}.zip`;

bot.comment(
  process.env.GITHUB_TOKEN,
  `[bot] 自动构建 ${bot.artifactLink(`artifacts/${filename}`, filename)}`
);
