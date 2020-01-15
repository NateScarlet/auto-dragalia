import { ImageAssets } from '@/assets/images/type';

export const img: ImageAssets = (() => {
  const fallback: ImageAssets = require(`./${FALLBACK_ASSET}`);
  const target: Partial<ImageAssets> = require(`./${TARGET_ASSET}`);
  return { ...fallback, ...target };
})();
