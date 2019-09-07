# auto-dragalia

[![Build Status](https://img.shields.io/circleci/project/github/NateScarlet/auto-dragalia.svg)](https://circleci.com/gh/NateScarlet/auto-dragalia)
[![Release](https://img.shields.io/github/release/NateScarlet/auto-dragalia.svg)](https://github.com/NateScarlet/auto-dragalia/releases/latest)
[![Auto.js 4.x](https://img.shields.io/badge/Auto.js-4.x-009688.svg)](https://github.com/hyb1996/Auto.js)
![Android 7.x](https://img.shields.io/badge/Android-7+-a4c639.svg?logo=android)
[![Maintainability](https://api.codeclimate.com/v1/badges/619eae52db0e72683d02/maintainability)](https://codeclimate.com/github/NateScarlet/auto-dragalia/maintainability)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/NateScarlet/auto-dragalia.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/NateScarlet/auto-dragalia/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/NateScarlet/auto-dragalia.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/NateScarlet/auto-dragalia/context:javascript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Gitter](https://badges.gitter.im/auto-dragalia/community.svg)](https://gitter.im/auto-dragalia/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

《失落的龙约》 [Auto.js] 辅助脚本

[发布页面](https://github.com/NateScarlet/auto-dragalia/releases)

## 需求

- [Auto.js 4.x](https://github.com/hyb1996/Auto.js/releases) 当前应用商店没有发布 Auto.js 4.x 版本 需要前往官方仓库发布页面下载
- 安卓 7.0 版本以上不需要 Root 权限

2019-09-07: 由于 [Auto.js] 作者删除了官方发布页面，提供 4.0.5-alpha 版本磁力链接: `magnet:?xt=urn:btih:982942ff53262eb60b6a1367a947750f14498b3b&dn=autojs-4.0.5.alpha.apk&tr=udp%3a%2f%2f195.154.52.99%3a80%2fannounce&tr=http%3a%2f%2f176.113.71.19%3a6961%2fannounce&tr=udp%3a%2f%2f208.83.20.20%3a6969%2fannounce&tr=udp%3a%2f%2f54.37.235.149%3a6969%2fannounce&tr=udp%3a%2f%2f37.235.174.46%3a2710%2fannounce&tr=udp%3a%2f%2f5.206.19.247%3a6969%2fannounce&tr=udp%3a%2f%2f95.211.168.204%3a2710%2fannounce&tr=udp%3a%2f%2f89.234.156.205%3a451%2fannounce&tr=udp%3a%2f%2f184.105.151.164%3a6969%2fannounce&tr=udp%3a%2f%2f93.158.213.92%3a1337%2fannounce&tr=udp%3a%2f%2f185.19.107.254%3a80%2fannounce&tr=udp%3a%2f%2f142.44.243.4%3a1337%2fannounce&tr=udp%3a%2f%2f159.100.245.181%3a6969%2fannounce`

## 功能

- [x] 重复战斗

  重复单人战斗

  - [x] 自动打开自动战斗开关

  - [x] 自动龙化

    - [x] 只在周围有敌人的时候龙化

  - [x] 自动使用龙技能

  - [x] 自动使用支援技能

- [x] 自动喂龙

  龙之庭院自动送金币礼物

- [x] 喂四叶草

  龙之庭院自动送幸运四叶草

  - [x] 到 29 级自动停止

- [x] 刷稀有

  金币任务刷幸运四叶草

  - [x] 使用可见任务中目标全部完成并且最高难度的任务

  - [x] 载入第二张图后如果没刷到稀有物品直接放弃任务

- [ ] 重复多人战斗

[auto.js]: https://github.com/hyb1996/Auto.js

## 屏幕分辨率支持

基础适配分辨率为 1080x2160

其他适配过的分辨率见 [src/assets/images](./src/assets/images)

脚本功能利用识图实现, 所以相近分辨率的都应该可以用

欢迎发 PR 添加更多分辨率

## 关于刷稀有出错

### 战斗菜单停留超时

原因是由于稀有物品数量要求高精度识别 不能直接单张图适配所有设备

参考 [#12](https://github.com/NateScarlet/auto-dragalia/issues/12) 截图发 issue 添加更多识别图片即可解决

### 结算界面停留超时

打太快 脚本来不及点菜单

降倍速或者降战力解决

参见 [#13](https://github.com/NateScarlet/auto-dragalia/issues/13)
