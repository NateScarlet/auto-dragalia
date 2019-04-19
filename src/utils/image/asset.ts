import { assets } from '@/assets/images';
import lodashSortby from 'lodash.sortby';

export function loadAssets(name: string): void {
  toastLog(`Load assets: ${name}`);
  Object.assign(images, assets[name]);
}

export function getAssetByResolution(
  width: number = device.width,
  height: number = device.height
): string {
  const pattern: RegExp = /(\d+)x(\d+)/;
  interface IResolution {
    name: string;
    width: number;
    height: number;
  }
  const resolutions: IResolution[] = Object.keys(assets)
    .map((i: string) => i.match(pattern))
    .filter((i: RegExpMatchArray | null) => i)
    .map(
      (i: RegExpMatchArray | null): IResolution => {
        if (!i) {
          throw new Error('Unexpected');
        }

        return {
          name: i[0],
          width: Number.parseInt(i[1], 10),
          height: Number.parseInt(i[2], 10)
        };
      }
    );

  return lodashSortby(resolutions, (i: IResolution) => [
    Math.abs(i.height / i.width - height / width),
    Math.abs(i.height - height) + Math.abs(i.width - width)
  ])[0].name;
}
