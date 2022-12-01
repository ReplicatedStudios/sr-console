import util from "util";
export default class SrColors extends Object {
    public static readonly BLACK = new SrColors("BLACK", "\x1b[30m");
    public static readonly RED = new SrColors("RED", "\x1b[31m");
    public static readonly GREEN = new SrColors("GREEN", "\x1b[32m");
    public static readonly YELLOW = new SrColors("YELLOW", "\x1b[33m");
    public static readonly BLUE = new SrColors("BLUE", "\x1b[34m");
    public static readonly MAGENTA = new SrColors("MAGENTA", "\x1b[35m");
    public static readonly CYAN = new SrColors("CYAN", "\x1b[36m");
    public static readonly WHITE = new SrColors("WHITE", "\x1b[37m");
    
    public static readonly BG_BLACK = new SrColors("BG_BLACK", "\x1b[40m");
    public static readonly BG_RED = new SrColors("BG_RED", "\x1b[41m");
    public static readonly BG_GREEN = new SrColors("BG_GREEN", "\x1b[42m");
    public static readonly BG_YELLOW = new SrColors("BG_YELLOW", "\x1b[43m");
    public static readonly BG_BLUE = new SrColors("BG_BLUE", "\x1b[44m");
    public static readonly BG_MAGENTA = new SrColors("BG_MAGENTA", "\x1b[45m");
    public static readonly BG_CYAN = new SrColors("BG_CYAN", "\x1b[46m");
    public static readonly BG_WHITE = new SrColors("BG_WHITE", "\x1b[47m");

    public static readonly RESET = new SrColors("T_RESET", "\x1b[0m");
    public static readonly BRIGHT = new SrColors("T_BRIGHT", "\x1b[1m");
    public static readonly DIM = new SrColors("T_DIM", "\x1b[2m");
    public static readonly UNDERSCORE = new SrColors("T_UNDERSCORE", "\x1b[4m");
    public static readonly BLINK = new SrColors("T_BLINK", "\x1b[5m");
    public static readonly RESERVE = new SrColors("T_RESERVE", "\x1b[7m");
    public static readonly HIDDEN = new SrColors("T_HIDDEN", "\x1b[8m");
    public static readonly STRIKETHROUGHT = new SrColors("T_STRIKETHROUGHT", "\x1b[9m");

    readonly #id: string;
    readonly #color: string
    constructor(
        id: "BLACK" | "RED" | "GREEN" | "YELLOW" | "BLUE" | "MAGENTA" | "CYAN" | "WHITE" | 
            "BG_BLACK" | "BG_RED" | "BG_GREEN" | "BG_YELLOW" | "BG_BLUE" | "BG_MAGENTA" | "BG_CYAN" | "BG_WHITE" |
            "T_RESET" | "T_BRIGHT" | "T_DIM" | "T_UNDERSCORE" | "T_BLINK" | "T_RESERVE" | "T_HIDDEN" | "T_STRIKETHROUGHT", 
        code: string) {
        super();
        this.#id = id;
        this.#color = code;
    }

    public get id() { return this.#id; }
    public get color() { return this.#color; }
    public override toString() {
        return this.#color;
    }

    public static toTypeof(varof: any, dfault: SrColors[]): string {
        switch (typeof varof) {
            case 'string': return `${dfault.join("")}${varof}${this.RESET}`;
            case 'number': return `${this.GREEN}${varof}${this.RESET}`;
            case 'boolean': return `${this.BLUE}${this.BRIGHT}${varof ? "true" : "false"}${this.RESET}`;
            case 'bigint': return `${this.GREEN}${varof}${this.RESET}`;
            case 'function': return `${this.YELLOW}${varof.name == "" ? this.BLINK + "annonymous" : varof.name}${this.RESET}`;
            case 'object': return `${this.CYAN}${JSON.stringify(varof, null, 4)}${this.RESET}`;
            case 'symbol': return `${this.MAGENTA}${varof.toString()}${this.RESET}`;
            case 'undefined': return `${this.BLACK}${this.BRIGHT}${this.UNDERSCORE}undefined${this.RESET}`;
        }
    }

    public static toParser(color: string) {
        const ids = Object.keys(SrColors);
        const values = Object.values(SrColors);
        for (let i = 0; i < values.length; i++) color = color.replace(new RegExp(values[i], "gi"), `%${ids[i]}%`);
        return color;
    }

    public static toColor(parser: string) {
        let cKeys = Object.keys(SrColors);
        let cVal = Object.values(SrColors);
        for (let i = 0; i < cVal.length; i++) parser = parser.replace(new RegExp(`%${cKeys[i]}%`, "gi"), cVal[i]);
        return parser;
    }
}