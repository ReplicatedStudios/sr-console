export type SrColorsMatch = 
"BLACK" | "RED" | "GREEN" | "YELLOW" | "BLUE" | "MAGENTA" | "CYAN" | "WHITE" | 
"BG_BLACK" | "BG_RED" | "BG_GREEN" | "BG_YELLOW" | "BG_BLUE" | "BG_MAGENTA" | "BG_CYAN" | "BG_WHITE" |
"T_RESET" | "T_BRIGHT" | "T_DIM" | "T_UNDERSCORE" | "T_BLINK" | "T_RESERVE" | "T_HIDDEN" | "T_STRIKETHROUGHT";

export default class SrColors {
    public static readonly BLACK: string = "\x1b[30m";
    public static readonly RED: string = "\x1b[31m";
    public static readonly GREEN: string = "\x1b[32m";
    public static readonly YELLOW: string = "\x1b[33m";
    public static readonly BLUE: string = "\x1b[34m";
    public static readonly MAGENTA: string = "\x1b[35m";
    public static readonly CYAN: string = "\x1b[36m";
    public static readonly WHITE: string = "\x1b[37m";
    public static readonly BG_BLACK: string = "\x1b[40m";
    public static readonly BG_RED: string = "\x1b[41m";
    public static readonly BG_GREEN: string = "\x1b[42m";
    public static readonly BG_YELLOW: string = "\x1b[43m";
    public static readonly BG_BLUE: string = "\x1b[44m";
    public static readonly BG_MAGENTA: string = "\x1b[45m";
    public static readonly BG_CYAN: string = "\x1b[46m";
    public static readonly BG_WHITE: string = "\x1b[47m";
    public static readonly T_RESET: string = "\x1b[0m";
    public static readonly T_BRIGHT: string = "\x1b[1m";
    public static readonly T_DIM: string = "\x1b[2m";
    public static readonly T_UNDERSCORE: string = "\x1b[4m";
    public static readonly T_BLINK: string = "\x1b[5m";
    public static readonly T_RESERVE: string = "\x1b[7m";
    public static readonly T_HIDDEN: string = "\x1b[8m";
    public static readonly T_STRIKETHROUGHT: string = "\x1b[9m";

    public static parseToPatten(v: string): string {
        let r: string = v;
        let cKeys = Object.keys(SrColors);
        let cVal = Object.values(SrColors);
        for (let i = 0; i < cVal.length; i++) {
            r = r.replace(cVal[i], `%${cKeys[i]}%`);
        }
        return r;
    }

    public static parseToColor(v: string): string {
        let r: string = v;
        let cKeys = Object.keys(SrColors);
        let cVal = Object.values(SrColors);
        for (let i = 0; i < cVal.length; i++) {
            r = r.replace(new RegExp(`%${cKeys[i]}%`, "gi"), cVal[i]);
        }
        return r;
    }
}