// GO TO HELL NODE with your until shit.

import { valueof } from "./iSrUtil";

// https://nodejs.org/api/util.html#util_customizing_util_inspect_colors
export class iSrColor {
    public CODE: string;
    public REGEXP: RegExp;
    constructor(code: string, rex: RegExp) {
        this.CODE = code;
        this.REGEXP = rex;
    }
}

export class iSrColorsList {
    public static readonly instance: iSrColorsList = new this();
    public readonly BLACK = new iSrColor("\x1b[30m", /\x1b\[30m/gi);
    public readonly RED = new iSrColor("\x1b[31m", /\x1b\[31m/gi);
    public readonly GREEN = new iSrColor("\x1b[32m", /\x1b\[32m/gi);
    public readonly YELLOW = new iSrColor("\x1b[33m", /\x1b\[33m/gi);
    public readonly BLUE = new iSrColor("\x1b[34m", /\x1b\[34m/gi);
    public readonly MAGENTA = new iSrColor("\x1b[35m", /\x1b\[35m/gi);
    public readonly CYAN = new iSrColor("\x1b[36m", /\x1b\[36m/gi);
    public readonly WHITE =new iSrColor("\x1b[37m", /\x1b\[37m/gi);
    public readonly BG_BLACK = new iSrColor("\x1b[40m", /\x1b\[40m/gi);
    public readonly BG_RED = new iSrColor("\x1b[41m", /\x1b\[41m/gi);
    public readonly BG_GREEN =new iSrColor("\x1b[42m", /\x1b\[42m/gi);
    public readonly BG_YELLOW = new iSrColor("\x1b[43m", /\x1b\[43m/gi);
    public readonly BG_BLUE = new iSrColor("\x1b[44m", /\x1b\[44m/gi);
    public readonly BG_MAGENTA = new iSrColor("\x1b[45m", /\x1b\[45m/gi);
    public readonly BG_CYAN = new iSrColor("\x1b[46m", /\x1b\[46m/gi);
    public readonly BG_WHITE = new iSrColor("\x1b[47m", /\x1b\[47m/gi);
    public readonly T_RESET =new iSrColor("\x1b[0m", /\x1b\[0m/gi);
    public readonly T_BRIGHT = new iSrColor("\x1b[1m", /\x1b\[1m/gi);
    public readonly T_DIM = new iSrColor("\x1b[2m", /\x1b\[2m/gi);
    public readonly T_UNDERSCORE = new iSrColor("\x1b[4m", /\x1b\[4m/gi);
    public readonly T_BLINK = new iSrColor("\x1b[5m", /\x1b\[5m/gi);
    public readonly T_RESERVE = new iSrColor("\x1b[7m", /\x1b\[7m/gi);
    public readonly T_HIDDEN = new iSrColor("\x1b[8m", /\x1b\[8m/gi);
    public readonly T_STRIKETHROUGHT = new iSrColor("\x1b[9m", /\x1b\[9m/gi);
}

export default class iSrColors {
    public static parseToNone(data: string) {
        const colorKeys = Object.keys(iSrColorsList.instance);
        const colorValues: valueof<iSrColorsList>[] = Object.values(iSrColorsList.instance);
        for (let i = 0; i < Object.values(iSrColorsList.instance).length; i++) data = data.replace(new RegExp(colorValues[i].REGEXP, "g"), "")
        return data;
    }

    public static parseTextToColor(data: string) {
        const colorKeys = Object.keys(iSrColorsList.instance);
        const colorValues: valueof<iSrColorsList>[] = Object.values(iSrColorsList.instance);
        for (let i = 0; i < Object.values(iSrColorsList.instance).length; i++) data = data.replace(new RegExp(`_%${colorKeys[i]}%_`, "gi"), colorValues[i].CODE)
        return data;
    }

    public static parseColorToText(data: string) {
        const colorKeys = Object.keys(iSrColorsList.instance);
        const colorValues: valueof<iSrColorsList>[] = Object.values(iSrColorsList.instance);
        for (let i = 0; i < Object.values(iSrColorsList.instance).length; i++) data = data.replace(new RegExp(colorValues[i].REGEXP, "g"), `_%${colorKeys[i]}%_`)
        return data;
    }

    public static parseTypeof(data: any, defaults: string) {
        switch (typeof data) {
            case 'string': return `${defaults}${data}${this.get("T_RESET")}`;
            case 'number': return `${this.get("GREEN")}${data}${this.get("T_RESET")}`;
            case 'boolean': return `${this.get("BLUE")}${this.get("T_BRIGHT")}${data ? "true" : "false"}${this.get("T_RESET")}`;
            case 'bigint': return `${this.get("GREEN")}${data}${this.get("T_RESET")}`;
            case 'function': return `${this.get("YELLOW")}${data.name == "" ? this.get("T_BLINK") + "annonymous" : data.name}${this.get("T_RESET")}`;
            case 'object': return `${this.get("CYAN")}${JSON.stringify(data, null, 4)}${this.get("T_RESET")}`;
            case 'symbol': return `${this.get("MAGENTA")}${data.toString()}${this.get("T_RESET")}`;
            case 'undefined': return `${this.get("BLACK")}${this.get("T_BRIGHT")}${this.get("T_UNDERSCORE")}undefined${this.get("T_RESET")}`;
        }
    }
    
    public static get(...names: (keyof iSrColorsList)[]): string {
        const output = [];
        for (const name of names) output.push(iSrColorsList.instance[name].CODE);
        return output.join("");
    }

    public static rex(name: keyof iSrColorsList): RegExp {
        return iSrColorsList.instance[name].REGEXP;
    }
}
