// GO TO HELL NODE with your until shit.
// https://nodejs.org/api/util.html#util_customizing_util_inspect_colors
import { stdout } from "process";
import { valueof } from "./iSrUtil";
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
    public readonly ZBLACK = new iSrColor("\x1b[40m", /\x1b\[40m/gi);
    public readonly ZRED = new iSrColor("\x1b[41m", /\x1b\[41m/gi);
    public readonly ZGREEN =new iSrColor("\x1b[42m", /\x1b\[42m/gi);
    public readonly ZYELLOW = new iSrColor("\x1b[43m", /\x1b\[43m/gi);
    public readonly ZBLUE = new iSrColor("\x1b[44m", /\x1b\[44m/gi);
    public readonly ZMAGENTA = new iSrColor("\x1b[45m", /\x1b\[45m/gi);
    public readonly ZCYAN = new iSrColor("\x1b[46m", /\x1b\[46m/gi);
    public readonly ZWHITE = new iSrColor("\x1b[47m", /\x1b\[47m/gi);
    public readonly TRESET =new iSrColor("\x1b[0m", /\x1b\[0m/gi);
    public readonly TBRIGHT = new iSrColor("\x1b[1m", /\x1b\[1m/gi);
    public readonly TDIM = new iSrColor("\x1b[2m", /\x1b\[2m/gi);
    public readonly TUNDERSCORE = new iSrColor("\x1b[4m", /\x1b\[4m/gi);
    public readonly TBLINK = new iSrColor("\x1b[5m", /\x1b\[5m/gi);
    public readonly TRESERVE = new iSrColor("\x1b[7m", /\x1b\[7m/gi);
    public readonly THIDDEN = new iSrColor("\x1b[8m", /\x1b\[8m/gi);
    public readonly TSTRIKETHROUGHT = new iSrColor("\x1b[9m", /\x1b\[9m/gi);
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
            case 'string': return `${defaults}${data}${this.get("TRESET")}`;
            case 'number': return `${this.get("GREEN")}${data}${this.get("TRESET")}`;
            case 'boolean': return `${this.get("BLUE")}${this.get("TBRIGHT")}${data ? "true" : "false"}${this.get("TRESET")}`;
            case 'bigint': return `${this.get("GREEN")}${data}${this.get("TRESET")}`;
            case 'function': return `${this.get("YELLOW")}${data.name == "" ? this.get("TBLINK") + "annonymous" : data.name}${this.get("TRESET")}`;
            case 'object': return `${this.get("CYAN")}${JSON.stringify(data, null, 4)}${this.get("TRESET")}`;
            case 'symbol': return `${this.get("MAGENTA")}${data.toString()}${this.get("TRESET")}`;
            case 'undefined': return `${this.get("BLACK")}${this.get("TBRIGHT")}${this.get("TUNDERSCORE")}undefined${this.get("TRESET")}`;
        }
    }

    public static parseColorToHTML5(data: string) {
        const colorKeys = <(keyof iSrColorsList)[]>Object.keys(iSrColorsList.instance);

        const state = {
            suspect: false,
            placeholder: "",
            detected: 0,
            output: ""
        };

        for (const str of data.split("")) {
            if (str == "_") {
                if (state.suspect) {
                    state.placeholder+=str;
                    state.suspect = false;
                    for (const key of colorKeys) {
                        if (state.placeholder === `_%${key}%_`) {
                            // SI ES RESET HAY QUE CERRAR TODAS LAS TAGS SI SE DETECTARON
                            if (key === "TRESET") {
                                state.output+="</span>".repeat(state.detected);
                                state.detected = 0;
                            } else {
                                state.output+= `<span class="srconsole-output ${key}">`
                                state.detected++;
                            }
                            state.placeholder = "";
                            break;
                        }
                    }
                } else state.suspect = (state.placeholder+=str) != null;
            } else state[state.suspect ? "placeholder" : "output"]+= str;
        }
        return state.output.replace(/\n/g, "\n<br>\n")
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
