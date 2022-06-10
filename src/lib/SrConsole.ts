/* LIBRERIAS */
import { join } from "path";
import { Console, time } from "console";
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


export default class SrConsole extends Console {
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
        super(stdout, stderr, false);
        this.#config = config;
        this.#file = config.FILE.ACTIVE ? createWriteStream(join(cwd(), this.#config.FILE.PATH, this.#config.FILE.NAME)) : undefined;
    }

    static #overPrint(p: Print) {
        const colors = [];
        for (const c of p.Colors) colors.push(c.toString());

        const parseStr: string[] = [];
        for (const opt of p.Values) SrColors.toTypeof(opt, p.Colors);

        const str = `${colors.join("")}${new SrTime(p.Config?.TIME ?? SrTime.F_BASIC)}${parseStr.join(" ")}${SrColors["RESET"].color}\n`;

        switch (p.STD) {
            case "OUT": stdout.write(str); break;
            case "ERR": stderr.write(str); break;
            default: throw new Error("No STD string specified")
        }

        p.File?.write(`${str}`);
        p.Io?.write(`${str}`);
    }

    setSocket(server: IO.Server): void { this.#io = server; }

    

    override assert(value: any, message: string, ...optionalParams: any[]): void {
        if (this) {if (!value) SrConsole.#overPrint(new Print("ERR", [SrColors.RED], ["Assert failed", message, ...optionalParams], this.#config, this.#file, this.#io));}
        else if (!value) SrConsole.#overPrint(new Print("ERR", [SrColors.RED], ["Assert failed", message, ...optionalParams]));
    }

    override clear(): void {
        SrConsole.#overPrint(new Print("OUT", [], ["\n".repeat(29)], this.#config, this.#file, this.#io));
    }

    override count(label?: string): void {
        const l = label ?? "default"
        SrConsole.#counts[l] ? 
            SrConsole.#counts[l] = 0 :
            SrConsole.#counts[l]++;
    }

    override countReset(label?: string): void {
        SrConsole.#counts[label ?? "default"] = 0;
    }

    override debug(message?: unknown, ...optionalParams: unknown[]): void {
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.CYAN], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.CYAN], [message, ...optionalParams]));
    }


    override dir(obj?: any, options?: any): void {
        throw new Error("Method not implemented.");
    }


    override dirxml(...data: any[]): void {
        throw new Error("Method not implemented.");
    }

    override error(message?: unknown, ...optionalParams: unknown[]): void {
        if (this) SrConsole.#overPrint(new Print("ERR", [SrColors.RED], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("ERR", [SrColors.RED], [message, ...optionalParams]));
    }

    public err(message?: unknown, ...optionalParams: unknown[]): void {
        this.error(message, ...optionalParams)
    }


    override group(message?: any, ...optionalParams: any[]): void {
        SrConsole.#groups++;
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [message, ...optionalParams]));
    }

    /** Elimina un grupo de logs. no emitira nada si no hay grupos activos */
    override groupCollapsed(message: any): void {
        if (SrConsole.#groups > 0) {
            SrConsole.#groups--;
            if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [message], this.#config, this.#file, this.#io));
            else SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [message]));
        }
    }

    /** Alias de `groupCollapsed(:string)`
     * 
     * Elimina un grupo de logs. no emitira nada si no hay grupos activos */
    unGroup(message: any) {
        this.groupCollapsed(message);
    }

    /** Elimina todos los grupos activos. no emitira nada si no hay grupos activos */
    override groupEnd(): void {
        if (SrConsole.#groups > 0) {
            SrConsole.#groups == 0;
            if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], [], this.#config, this.#file, this.#io));
            else SrConsole.#overPrint(new Print("OUT", [SrColors.MAGENTA], []));
        }
    }

    override info(message?: any, ...optionalParams: any[]): void {
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.CYAN, SrColors.BRIGHT], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.CYAN, SrColors.BRIGHT], [message, ...optionalParams]));
    }

    public send(message?: any, ...optionalParams: any[]) {
        const list = [message, ...optionalParams];
        list.forEach(v => {
            if (typeof v === "string") 
                for (const hide of this.#config?.FILTER ?? []) if (v.includes(hide)) v.replace(new RegExp("v", "gi"), "[REDACTED]");
                
        });
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.BLUE], [...list], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.BLUE], [...list]));
    }

    public success(message?: any, ...optionalParams: any[]) {
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.GREEN], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.GREEN], [message, ...optionalParams]));
    }

    public fatal(message?: any, ...optionalParams: any[]) {
        if (this) SrConsole.#overPrint(new Print("ERR", [SrColors.BG_YELLOW, SrColors.BRIGHT, SrColors.BG_RED], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("ERR", [SrColors.BG_YELLOW, SrColors.BRIGHT, SrColors.BG_RED], [message, ...optionalParams]));
    }

    override log(message?: any, ...optionalParams: any[]): void {
        if (this) SrConsole.#overPrint(new Print("OUT", [SrColors.BLUE], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("OUT", [SrColors.BLUE], [message, ...optionalParams]));
    }

    override table(tabularData?: any, properties?: readonly string[]): void {
        super.table(tabularData, properties);
    }


    override time(label?: string): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
        super.time(label);
    }

    override timeEnd(label?: string): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
        super.time(label);
    }

    override timeLog(label?: string, ...data: any[]): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
        super.timeLog(label, ...data);
    }

    override timeStamp(label?: string): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
        super.timeStamp(label);
    }

    override trace(message?: string, ...optionalParams: any[]): void {
        SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], ["Warning:", "Metodo no implementado"]));
        super.trace(message, optionalParams)
    }

    override warn(message?: unknown, ...optionalParams: unknown[]): void {
        if (this) SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], [message, ...optionalParams], this.#config, this.#file, this.#io));
        else SrConsole.#overPrint(new Print("ERR", [SrColors.YELLOW], [message, ...optionalParams]));
    }

    override profile(label?: unknown): void {
        throw new Error("Method not implemented.");
    }
    
    override profileEnd(label?: unknown): void {
        throw new Error("Method not implemented.");
    }

}