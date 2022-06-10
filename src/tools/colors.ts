export interface SrColorsOpt {
    BLACK: string;
    RED: string;
    GREEN: string;
    YELLOW: string;
    BLUE: string;
    MAGENTA: string;
    CYAN: string;
    WHITE: string;
    BG_BLACK: string;
    BG_RED: string;
    BG_GREEN: string;
    BG_YELLOW: string;
    BG_BLUE: string;
    BG_MAGENTA: string;
    BG_CYAN: string;
    BG_WHITE: string;
    T_RESET: string;
    T_BRIGHT: string;
    T_DIM: string;
    T_UNDERSCORE: string;
    T_BLINK: string;
    T_RESERVE: string;
    T_HIDDEN: string;
    T_STRIKETHROUGHT: string;
}

export default class SrColors {
    public static BLACK: string = "\x1b[30m";
    public static RED: string = "\x1b[31m";
    public static GREEN: string = "\x1b[32m";
    public static YELLOW: string = "\x1b[33m";
    public static BLUE: string = "\x1b[34m";
    public static MAGENTA: string = "\x1b[35m";
    public static CYAN: string = "\x1b[36m";
    public static WHITE: string = "\x1b[37m";
    public static BG_BLACK: string = "\x1b[40m";
    public static BG_RED: string = "\x1b[41m";
    public static BG_GREEN: string = "\x1b[42m";
    public static BG_YELLOW: string = "\x1b[43m";
    public static BG_BLUE: string = "\x1b[44m";
    public static BG_MAGENTA: string = "\x1b[45m";
    public static BG_CYAN: string = "\x1b[46m";
    public static BG_WHITE: string = "\x1b[47m";
    public static T_RESET: string = "\x1b[0m";
    public static T_BRIGHT: string = "\x1b[1m";
    public static T_DIM: string = "\x1b[2m";
    public static T_UNDERSCORE: string = "\x1b[4m";
    public static T_BLINK: string = "\x1b[5m";
    public static T_RESERVE: string = "\x1b[7m";
    public static T_HIDDEN: string = "\x1b[8m";
    public static T_STRIKETHROUGHT: string = "\x1b[9m";

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