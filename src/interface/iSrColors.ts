// GO TO HELL NODE with your until shit.
// https://nodejs.org/api/util.html#util_customizing_util_inspect_colors
import util from "util";
util.inspect.colors.reset

export class iSrColorsList {
    public static readonly instance: iSrColorsList = new this();
    public readonly BLACK ="\x1b[30m";
    public readonly RED ="\x1b[31m";
    public readonly GREEN ="\x1b[32m";
    public readonly YELLOW ="\x1b[33m";
    public readonly BLUE ="\x1b[34m";
    public readonly MAGENTA ="\x1b[35m";
    public readonly CYAN ="\x1b[36m";
    public readonly WHITE ="\x1b[37m";
    public readonly BG_BLACK ="\x1b[40m";
    public readonly BG_RED ="\x1b[41m";
    public readonly BG_GREEN ="\x1b[42m";
    public readonly BG_YELLOW ="\x1b[43m";
    public readonly BG_BLUE ="\x1b[44m";
    public readonly BG_MAGENTA ="\x1b[45m";
    public readonly BG_CYAN ="\x1b[46m";
    public readonly BG_WHITE ="\x1b[47m";
    public readonly T_RESET ="\x1b[0m";
    public readonly T_BRIGHT ="\x1b[1m";
    public readonly T_DIM ="\x1b[2m";
    public readonly T_UNDERSCORE ="\x1b[4m";
    public readonly T_BLINK ="\x1b[5m";
    public readonly T_RESERVE ="\x1b[7m";
    public readonly T_HIDDEN ="\x1b[8m";
    public readonly T_STRIKETHROUGHT ="\x1b[9m";
}

export default class iSrColors {
    public static parseToNone(data: string) {
        const colorKeys = Object.keys(iSrColorsList.instance);
        const colorValues = Object.values(iSrColorsList.instance);
        for (let i = 0; i < Object.values(iSrColorsList.instance).length; i++) data = data.replaceAll(colorValues[i], "")
        return data;
    }

    public static parseTextToColor(data: string) {
        const colorKeys = Object.keys(iSrColorsList.instance);
        const colorValues = Object.values(iSrColorsList.instance);
        for (let i = 0; i < Object.values(iSrColorsList.instance).length; i++) data = data.replace(new RegExp(`_%${colorKeys[i]}%_`, "gi"), colorValues[i])
        return data;
    }

    public static parseColorToText(data: string) {
        const colorKeys = Object.keys(iSrColorsList.instance);
        const colorValues = Object.values(iSrColorsList.instance);
        for (let i = 0; i < Object.values(iSrColorsList.instance).length; i++) data = data.replaceAll(colorValues[i], `_%${colorKeys[i]}%_`)
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
        for (const name of names) output.push(iSrColorsList.instance[name]);
        return output.join("");
    }
}
