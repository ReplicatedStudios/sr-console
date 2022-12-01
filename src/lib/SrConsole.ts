/* LIBRERIAS */
import { join } from "path";
import { createWriteStream, WriteStream } from "fs";
import { stderr, stdout, cwd } from "process";
import IO from "socket.io";

/* UTIL */
import SrTime from "../util/SrTime.js";
import SrColors from "../util/SrColors.js";
import SrConfig from "../util/SrConfig.js";
import { InspectOptions } from "util";

class Print {
    readonly STD: "OUT" | "ERR";
    readonly Colors: SrColors[];
    readonly Values: any[];
    readonly Config?: SrConfig;
    readonly File?: WriteStream;
    readonly Io?: IO.Server;

    constructor (std: "OUT" | "ERR", colors: SrColors[], values: any[], config?: SrConfig, file?: WriteStream, io?: IO.Server) {
        this.STD = std;
        this.Colors = colors;
        this.Config = config;
        this.Values = values;
        this.File = file;
        this.Io = io;
    }
}


export default class SrConsole {
    /* STATIC */
    static readonly SrTime = SrTime;
    static readonly SrColors = SrColors;
    static readonly SrConfig = SrConfig;
    static #groups = 0;
    static #memory = 0;
    static #counts: { [i: string]: number} = { default: 0 };


    readonly #config?: SrConfig;
    readonly #file?: WriteStream;
    #io?: IO.Server;
    constructor(config: SrConfig) {
        this.#config = config;
        this.#file = config.FILE.ACTIVE ? createWriteStream(join(cwd(), this.#config.FILE.PATH, this.#config.FILE.NAME)) : undefined;
    }

    static #overPrint(p: Print) {
        this.#memory = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;

        const colors = [];
        for (const c of p.Colors) colors.push(c.toString());

        const parseStr: string[] = [];
        for (const opt of p.Values) parseStr.push(SrColors.toTypeof(opt, p.Colors));

        const str = `${"    ".repeat(this.#groups)}${colors.join("")}${new SrTime(p.Config?.TIME ?? SrTime.F_BASIC)}${parseStr.join(" ")}${SrColors["RESET"].color}\n`;


        switch (p.STD) {
            case "OUT": stdout.write(str); break;
            case "ERR": stderr.write(str); break;
            default: throw new Error("No STD string specified")
        }

        p.File?.write(`${str}`);
        p.Io?.write(`${str}`);
    }

    public setSocket(server: IO.Server): void { this.#io = server; }
    public get memory() { return SrConsole.#memory }

    

    public assert(value: any, message: string, ...optionalParams: any[]): void {
        if (this) {if (!value) SrConsole.#overPrint(new Print("ERR", [SrColors.RED], ["Assert failed", message, ...optionalParams], this.#config, this.#file, this.#io));}
        else if (!value) SrConsole.#overPrint(new Print("ERR", [SrColors.RED], ["Assert failed", message, ...optionalParams]));
    }

    public clear(): void {
        SrConsole.#overPrint(new Print("OUT", [], ["\n".repeat(29)], this.#config, this.#file, this.#io));
    }

    public count(label?: string): void {
        const l = label ?? "default"
        SrConsole.#counts[l] ? 
            SrConsole.#counts[l] = 0 :
            SrConsole.#counts[l]++;
    }

    public countReset(label?: string): void {
        SrConsole.#counts[label ?? "default"] = 0;
    }

    public debug(message?: unknown, ...optionalParams: unknown[]): void {
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.CYAN], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.CYAN], [message, ...optionalParams]));
    }


    public dir(obj?: any, options?: any): void {
        throw new Error("Method not implemented.");
    }


    public dirxml(...data: any[]): void {
        throw new Error("Method not implemented.");
    }

    public error(message?: unknown, ...optionalParams: unknown[]): void {
        if (this) SrConsole.#overPrint(new Print("ERR", [SrColors.RED], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("ERR", [SrColors.RED], [message, ...optionalParams]));
    }

    public err(message?: unknown, ...optionalParams: unknown[]): void {
        this.error(message, ...optionalParams)
    }


    public group(message?: any, ...optionalParams: any[]): void {
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [message, ...optionalParams]));
        SrConsole.#groups++;
    }

    /** Elimina un grupo de logs. no emitira nada si no hay grupos activos */
    public groupCollapsed(message: any): void {
        if (SrConsole.#groups > 0) {
            SrConsole.#groups--;
            if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [message], this.#config, this.#file, this.#io));
            else SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [message]));
        }
    }

    /** Alias de `groupCollapsed(:string)`
     * 
     * Elimina un grupo de logs. no emitira nada si no hay grupos activos */
    public unGroup(message: any) {
        this.groupCollapsed(message);
    }

    /** Elimina todos los grupos activos. no emitira nada si no hay grupos activos */
    public groupEnd(message?: any): void {
        SrConsole.#groups = 0;
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [message], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [message]));
    }

    public info(message?: any, ...optionalParams: any[]): void {
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.CYAN, SrColors.BRIGHT], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.CYAN, SrColors.BRIGHT], [message, ...optionalParams]));
    }

    public send(message?: any, ...optionalParams: any[]) {
        const strings = [message, ...optionalParams];
        if (this) {
            for (let i = 0; i < strings.length; i++) {
                for (const filter of this.#config?.FILTER ?? []) 
                    if (typeof strings[i] === "string") strings[i] = strings[i].replace(new RegExp(filter, "gi"), "[REDACTED]");
                
            }
            SrConsole.#overPrint(new Print("OUT", [SrColors.BLUE], [...strings], this.#config, this.#file, this.#io));
        } else SrConsole.#overPrint(new Print("OUT", [SrColors.BLUE], [...strings]));

    }

    public success(message?: any, ...optionalParams: any[]) {
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.GREEN], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.GREEN], [message, ...optionalParams]));
    }

    public fatal(message?: any, ...optionalParams: any[]) {
        if (this) SrConsole.#overPrint(new Print("ERR", [SrColors.BG_YELLOW, SrColors.BRIGHT, SrColors.BG_RED], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("ERR", [SrColors.BG_YELLOW, SrColors.BRIGHT, SrColors.BG_RED], [message, ...optionalParams]));
    }

    public log(message?: any, ...optionalParams: any[]): void {
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.BLUE], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.BLUE], [message, ...optionalParams]));
    }

    public table(tabularData?: any, properties?: readonly string[]): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
    }


    public time(label?: string): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
    }

    public timeEnd(label?: string): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
    }

    public timeLog(label?: string, ...data: any[]): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
    }

    public timeStamp(label?: string): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
    }

    public trace(message?: string, ...optionalParams: any[]): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
    }

    public warn(message?: unknown, ...optionalParams: unknown[]): void {
        if (this) SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], [message, ...optionalParams]));
    }

    public profile(label?: unknown): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
    }
    
    public profileEnd(label?: unknown): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
    }

}