# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.12.0](https://github.com/NateScarlet/auto-dragalia/compare/v0.11.0...v0.12.0) (2019-04-20)

### Bug Fixes

- **farm-rare-item:** add more rare item images ([510079c](https://github.com/NateScarlet/auto-dragalia/commit/510079c)), closes [#23](https://github.com/NateScarlet/auto-dragalia/issues/23)

### Features

- remove `IWaitImageOptions.retry` ([16ed02b](https://github.com/NateScarlet/auto-dragalia/commit/16ed02b))
- support load asset by resolution ([2f5409e](https://github.com/NateScarlet/auto-dragalia/commit/2f5409e)), closes [#26](https://github.com/NateScarlet/auto-dragalia/issues/26)

### Performance Improvements

- only match images for current resolution ([991a3d6](https://github.com/NateScarlet/auto-dragalia/commit/991a3d6))

## [0.11.0](https://github.com/NateScarlet/auto-dragalia/compare/v0.10.1...v0.11.0) (2019-04-11)

### Bug Fixes

- **farm-rare-item:** add back level select detect ([0c427bc](https://github.com/NateScarlet/auto-dragalia/commit/0c427bc))
- **feed-dragon,feed-four-leaf-clover:** improve dialog handling ([f130501](https://github.com/NateScarlet/auto-dragalia/commit/f130501)), closes [#21](https://github.com/NateScarlet/auto-dragalia/issues/21)

### Features

- add `IWaitImageOptions.retry` ([3a9b1ce](https://github.com/NateScarlet/auto-dragalia/commit/3a9b1ce))
- modify arguments of waitImage, waitAnyImage ([0242695](https://github.com/NateScarlet/auto-dragalia/commit/0242695))
- remove `waitLoading` ([1319917](https://github.com/NateScarlet/auto-dragalia/commit/1319917))
- **feedFourLeafClover:** new task ([c3ffde5](https://github.com/NateScarlet/auto-dragalia/commit/c3ffde5)), closes [#20](https://github.com/NateScarlet/auto-dragalia/issues/20)

### Performance Improvements

- remove screen cache since it has no effect ([41ce5c9](https://github.com/NateScarlet/auto-dragalia/commit/41ce5c9))

## [0.10.1](https://github.com/NateScarlet/auto-dragalia/compare/v0.10.0...v0.10.1) (2019-04-06)

### Bug Fixes

- **farm-rare-item:** increase waiting timeout ([bc6a789](https://github.com/NateScarlet/auto-dragalia/commit/bc6a789))

## [0.10.0](https://github.com/NateScarlet/auto-dragalia/compare/v0.9.2...v0.10.0) (2019-04-06)

Added image ids for logging.

### Bug Fixes

- **farm-rare-item:** invalid click during animation ([1d1fc6b](https://github.com/NateScarlet/auto-dragalia/commit/1d1fc6b)), closes [#14](https://github.com/NateScarlet/auto-dragalia/issues/14)

### Features

- add `IFindImageOptions` ([601d0cb](https://github.com/NateScarlet/auto-dragalia/commit/601d0cb))
- add `IWaitImageOptions.id` ([078a2bb](https://github.com/NateScarlet/auto-dragalia/commit/078a2bb))
- add version to error message ([6ba53c2](https://github.com/NateScarlet/auto-dragalia/commit/6ba53c2))
- **farm-rare-item:** add menu animation waiting ([b907394](https://github.com/NateScarlet/auto-dragalia/commit/b907394))
- **farm-rare-item:** set finding ids ([3711f65](https://github.com/NateScarlet/auto-dragalia/commit/3711f65))
- **farm-rare-item:** set waiting ids ([c6217bb](https://github.com/NateScarlet/auto-dragalia/commit/c6217bb))

## [0.9.2](https://github.com/NateScarlet/auto-dragalia/compare/v0.9.1...v0.9.2) (2019-04-06)

### Bug Fixes

- **farm-rare-item:** add more rare item images ([2cceec5](https://github.com/NateScarlet/auto-dragalia/commit/2cceec5)), closes [#12](https://github.com/NateScarlet/auto-dragalia/issues/12)
- **farm-rare-item:** menu click may be blocked by skill casting ([0df2710](https://github.com/NateScarlet/auto-dragalia/commit/0df2710))

## [0.9.1](https://github.com/NateScarlet/auto-dragalia/compare/v0.9.0...v0.9.1) (2019-04-06)

### Bug Fixes

- **repeat-raid:** fix may click continue button ([69ee5e7](https://github.com/NateScarlet/auto-dragalia/commit/69ee5e7))
- remove toast that may block skill cast ([bb5201d](https://github.com/NateScarlet/auto-dragalia/commit/bb5201d))

## [0.9.0](https://github.com/NateScarlet/auto-dragalia/compare/v0.8.1...v0.9.0) (2019-04-05)

### Features

- vibrate when task occurs error ([d582d57](https://github.com/NateScarlet/auto-dragalia/commit/d582d57))
- **farm-rare-item:** add waiting timeout ([87141b9](https://github.com/NateScarlet/auto-dragalia/commit/87141b9))

## [0.8.1](https://github.com/NateScarlet/auto-dragalia/compare/v0.8.0...v0.8.1) (2019-04-05)

### Bug Fixes

- **farm-rare-item:** support low graphics quality ([0490f04](https://github.com/NateScarlet/auto-dragalia/commit/0490f04)), closes [#10](https://github.com/NateScarlet/auto-dragalia/issues/10)

### Performance Improvements

- improve waiting delay logic ([9150bd5](https://github.com/NateScarlet/auto-dragalia/commit/9150bd5))
- use cache with screen capture ([7028068](https://github.com/NateScarlet/auto-dragalia/commit/7028068)), closes [#11](https://github.com/NateScarlet/auto-dragalia/issues/11)

## [0.8.0](https://github.com/NateScarlet/auto-dragalia/compare/v0.7.2...v0.8.0) (2019-04-05)

refactor with async functions

### Features

- add `IWaitImageOptions.findOptions` ([9387aad](https://github.com/NateScarlet/auto-dragalia/commit/9387aad))
- auto retry when waiting any image ([94684b7](https://github.com/NateScarlet/auto-dragalia/commit/94684b7)), closes [#9](https://github.com/NateScarlet/auto-dragalia/issues/9)

### Performance Improvements

- **feed-dragon:** improve finished detect ([a7a0fcf](https://github.com/NateScarlet/auto-dragalia/commit/a7a0fcf))

## [0.7.2](https://github.com/NateScarlet/auto-dragalia/compare/v0.7.1...v0.7.2) (2019-04-05)

### Bug Fixes

- support blue retry button ([1c77da2](https://github.com/NateScarlet/auto-dragalia/commit/1c77da2)), closes [#8](https://github.com/NateScarlet/auto-dragalia/issues/8)

## [0.7.1](https://github.com/NateScarlet/auto-dragalia/compare/v0.7.0...v0.7.1) (2019-04-05)

### Bug Fixes

- **farm-rare-item:** correct level priority ([db64fc2](https://github.com/NateScarlet/auto-dragalia/commit/db64fc2)), closes [#7](https://github.com/NateScarlet/auto-dragalia/issues/7)

## [0.7.0](https://github.com/NateScarlet/auto-dragalia/compare/v0.6.1...v0.7.0) (2019-04-04)

### Bug Fixes

- **farm-rare-item:** click blue continue button ([d2ea378](https://github.com/NateScarlet/auto-dragalia/commit/d2ea378)), closes [#5](https://github.com/NateScarlet/auto-dragalia/issues/5)
- **farm-rare-item:** use other level select button image ([ab71c16](https://github.com/NateScarlet/auto-dragalia/commit/ab71c16)), closes [#4](https://github.com/NateScarlet/auto-dragalia/issues/4)

### Features

- show console when error occurs during task ([44b0eb3](https://github.com/NateScarlet/auto-dragalia/commit/44b0eb3))
- **farm-rare-item:** reduce menu click delay ([23c7c3b](https://github.com/NateScarlet/auto-dragalia/commit/23c7c3b))

## [0.6.1](https://github.com/NateScarlet/auto-dragalia/compare/v0.6.0...v0.6.1) (2019-04-03)

### Bug Fixes

- auto retry connect to server ([7320c2b](https://github.com/NateScarlet/auto-dragalia/commit/7320c2b))
- improve rare item detect accuracy ([10d4d41](https://github.com/NateScarlet/auto-dragalia/commit/10d4d41))

## [0.6.0](https://github.com/NateScarlet/auto-dragalia/compare/v0.5.9...v0.6.0) (2019-04-03)

### Features

- new task `farmRareItem` ([df8dcd9](https://github.com/NateScarlet/auto-dragalia/commit/df8dcd9)), closes [#1](https://github.com/NateScarlet/auto-dragalia/issues/1)

## [0.5.9](https://github.com/NateScarlet/auto-dragalia/compare/0.5.8...0.5.9) (2019-04-03)

### Bug Fixes

- remove task name toast message ([1c0f2ee](https://github.com/NateScarlet/auto-dragalia/commit/1c0f2ee)), closes [#2](https://github.com/NateScarlet/auto-dragalia/issues/2)
