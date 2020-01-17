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
  ): MatchingResult;
  interface Match {
    point: Point;
    similarity: number;
  }
  /** https://hyb1996.github.io/AutoJs-Docs/#/images?id=matchingresult */
  interface MatchingResult {
    matches: Match[];
    points: Point[];
    first(): Match | null;
    last(): Match | null;
    leftmost(): Match | null;
    topmost(): Match | null;
    rightmost(): Match | null;
    bottommost(): Match | null;
    best(): Match | null;
    worst(): Match | null;
    sortBy(cmp: (a: Match, b: Match) => number | string): MatchingResult;
  }
}
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=settimeoutcallback-delay-args */
declare function setTimeout(
  callback: () => unknown,
  delay: number,
  ...args: unknown[]
): number;
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=setintervalcallback-delay-args */
declare function setInterval(
  callback: () => unknown,
  delay: number,
  ...args: unknown[]
): number;
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=setimmediatecallback-args */
declare function setImmediate(
  callback: () => unknown,
  ...args: unknown[]
): number;
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=clearintervalid */
declare function clearInterval(id: number): void;
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=cleartimeoutid */
declare function clearTimeout(id: number): void;
/** https://hyb1996.github.io/AutoJs-Docs/#/timers?id=clearimmediateid */
declare function clearImmediate(id: number): void;
