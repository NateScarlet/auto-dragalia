declare type IRegion = [number, number, number, number];
// declare function click(x: number, y: number): boolean;
declare const console: Console;
declare namespace images {
  function fromBase64(base64: string): null;
  /** 4.1+ https://hyb1996.github.io/AutoJs-Docs/#/images?id=imagesmatchtemplateimg-template-options */
  function matchTemplate(
    img: Image,
    template: Image,
    options?: {
      max?: number;
      level?: number;
    } & FindColorOptions
  ): IMatchingResult;
  interface IMatch {
    point: Point;
    similarity: number;
  }
  /** https://hyb1996.github.io/AutoJs-Docs/#/images?id=matchingresult */
  interface IMatchingResult {
    matches: IMatch[];
    points: Point[];
    first(): IMatch | null;
    last(): IMatch | null;
    leftmost(): IMatch | null;
    topmost(): IMatch | null;
    rightmost(): IMatch | null;
    bottommost(): IMatch | null;
    best(): IMatch | null;
    worst(): IMatch | null;
    sortBy(cmp: (a: IMatch, b: IMatch) => number | string): IMatchingResult;
  }
}
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=settimeoutcallback-delay-args */
declare function setTimeout(
  callback: () => any,
  delay: number,
  ...args: any[]
): number;
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=setintervalcallback-delay-args */
declare function setInterval(
  callback: () => any,
  delay: number,
  ...args: any[]
): number;
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=setimmediatecallback-args */
declare function setImmediate(callback: () => any, ...args: any[]): number;
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=clearintervalid */
declare function clearInterval(id: number): void;
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=cleartimeoutid */
declare function clearTimeout(id: number): void;
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=clearimmediateid */
declare function clearImmediate(id: number): void;
