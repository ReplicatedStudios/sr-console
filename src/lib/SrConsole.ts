import { stderr, stdout, cwd } from "process";
import fs from "fs";
import path from "path";

import iSrTime from "../interface/iSrTime.js";
import iSrColors from "../interface/iSrColors.js";
import { counts, iStd, PrintData, PrintObject, SrWriteStream } from "../interface/iSrUtil.js";
import iSrConfig from "../interface/iSrConfig.js";

export default class SrConsole {
    static readonly SRCOLORS = iSrColors;
    static readonly STREAMS: SrWriteStream<any>[] = [];

    static STREAMS_RAW?: fs.WriteStream;
    static #counts: counts = { default: 0 };
    static #config: iSrConfig;
    static #groups = 0;

    constructor(config: iSrConfig) {
        // super(null, null);
        SrConsole.#config = config;
        const logdir = path.join(cwd(), config.FILE);

        if (!fs.existsSync(logdir)) fs.mkdirSync(logdir, { recursive: true });
        if (!fs.existsSync(path.join(logdir, "lastest.log"))) fs.writeFileSync(path.join(logdir, "lastest.log"), "");
        if (config.FILE_USE) SrConsole.STREAMS.push(fs.createWriteStream(path.join(logdir, "lastest.log")));
        if (config.FILE_USE_RAW) SrConsole.STREAMS_RAW = fs.createWriteStream(path.join(logdir, "raw.log"));
        if (console instanceof SrConsole) console.warn("Ya existe una instancia de SrConsole. ¿Esto es un error?");
    }

    public static isInstanceExisting() { return this.#config && console instanceof this; }

    static #print(data: PrintData) {
        for (let i = 0; i < data.values.length; i++) data.values.push(iSrColors.parseTypeof(data.values.shift(), data.colors));

        // BUILD
        const output = `${"  ".repeat(this.#groups)}${data.colors}${new iSrTime(this.#config.TIME ?? iSrTime.D_CLASSIC)} ${this.#config.LOG_PREFIX ? data.values.shift() : ""}${data.colors}: ${data.values.join(" ").replaceAll("\n", "\n" + "  ".repeat(this.#groups))}${this.SRCOLORS.get("T_RESET")}\n`;
        for (const STREAM of this.STREAMS) STREAM?.write(iSrColors.parseColorToText(output));
        SrConsole.STREAMS_RAW?.write(iSrColors.parseToNone(output));

        if (data.std === "out") stdout.write(output);
        else if (data.std === "err") stderr.write(output);
        else throw new Error("No STD string specified");
    }

    public Console: unknown = SrConsole;
    public get memory() { return Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100; }
    public static addStream<T>(writer: SrWriteStream<T>) { this.STREAMS.push(writer); return; }

    public assert(validate: boolean, ...values: any[]) {
        // if (!validate) return SrConsole.#print({ colors: [iSrColors.get("RED"), iSrColors.get("T_BRIGHT")], std: "err", values });
        if (!validate) return SrConsole.#print(new PrintObject("out", iSrColors.get("RED", "T_BRIGHT"), [SrConsole.#config.LOG_PREFIX ? "[LOGS]" : "",  ...values]));
    }

    public count(label?: string): void {
        const l = label ?? "default"
        const c = SrConsole.#counts[l] == undefined ? SrConsole.#counts[l] = 0 : SrConsole.#counts[l] += 1;
        SrConsole.#print(new PrintObject("out", iSrColors.get("CYAN", "T_DIM"), [SrConsole.#config.LOG_PREFIX ? "[INFO]" : "", `Contador '${l}' cambio a`, c]));
    }

    public countReset(label?: string): void {
        SrConsole.#counts[label ?? "default"] = 0;
        SrConsole.#print(new PrintObject("out", iSrColors.get("CYAN"), [SrConsole.#config.LOG_PREFIX ? "[INFO]" : "", `Contador '${label ?? "default"}' fue reiniciado`]));
    }

    public debug(message: unknown, ...optionalParams: unknown[]): void {
        SrConsole.#print(new PrintObject("out", iSrColors.get("CYAN", "T_DIM"), [SrConsole.#config.LOG_PREFIX ? "[DEBUG]" : "", message, ...optionalParams]));
    }

    public err(message: unknown, ...optionalParams: unknown[]): void { this.error(message, ...optionalParams) }
    public error(message: unknown, ...optionalParams: unknown[]): void {
        SrConsole.#print(new PrintObject("err", iSrColors.get("RED"), [SrConsole.#config.LOG_PREFIX ? "[ERROR]" : "" , message, ...optionalParams]));
    }

    public group(message: any, ...optionalParams: any[]): void {
        SrConsole.#print(new PrintObject("out", iSrColors.get("MAGENTA"), [SrConsole.#config.LOG_PREFIX ? "[INFO]" : "", message, ...optionalParams]));
        SrConsole.#groups++;
    }

    /** Elimina un grupo de logs. no emitira nada si no hay grupos activos */
    public groupCollapsed(message: any): void {
        if (!(SrConsole.#groups > 0)) return;
        SrConsole.#print(new PrintObject("out", iSrColors.get("MAGENTA"), [SrConsole.#config.LOG_PREFIX ? "[INFO]" : "", message]));
        SrConsole.#groups--;
    }

    /** Alias de `groupCollapsed(:string)`
     *
     * Elimina un grupo de logs. no emitira nada si no hay grupos activos */
    public unGroup(message: any) {
        SrConsole.#groups = 0;
        SrConsole.#print(new PrintObject("out", iSrColors.get("MAGENTA"), [SrConsole.#config.LOG_PREFIX ? "[LOGS]" : "", message]));
    }

    /** Elimina todos los grupos activos. no emitira nada si no hay grupos activos */
    public groupEnd(message?: any): void { this.groupCollapsed(message); }
    public info(message?: any, ...optionalParams: any[]): void {
        SrConsole.#print(new PrintObject("out", iSrColors.get("CYAN"), [SrConsole.#config.LOG_PREFIX ? "[INFO]" : "", message, ...optionalParams]));
    }

    public send(message?: any, ...optionalParams: any[]) {
        const data = [message, ...optionalParams];
        for (let i = 0; i < data.length; i++) for (const toHide of SrConsole.#config.FILTER) {
                if (typeof data[i] === "string") data[i] = data[i].replace(new RegExp(toHide, "gi"), "[REDACTED]")
        }

        SrConsole.#print(new PrintObject("out", iSrColors.get("CYAN"), [SrConsole.#config.LOG_PREFIX ? `[L${iSrColors.get("RED")}OG${iSrColors.get("CYAN")}S]` : "", ...data]));
    }

    public success(message?: any, ...optionalParams: any[]) {
        SrConsole.#print(new PrintObject("out", iSrColors.get("GREEN"), [SrConsole.#config.LOG_PREFIX ? "[SUCCESS]" : "", message, ...optionalParams]));
    }

    public fatal(message?: any, ...optionalParams: any[]): never {
        SrConsole.#print(new PrintObject("out", iSrColors.get("RED", "BG_WHITE"), [SrConsole.#config.LOG_PREFIX ? "[FATAL-ERROR]" : "", message, ...optionalParams]));
        process.exit(1);
    }

    public log(message?: any, ...optionalParams: any[]): void {
        SrConsole.#print(new PrintObject("out", iSrColors.get("BLUE"), [SrConsole.#config.LOG_PREFIX ? "[LOGS]" : "", message, ...optionalParams]));
    }

    public warn(message?: unknown, ...optionalParams: unknown[]): void {
        SrConsole.#print(new PrintObject("err", iSrColors.get("YELLOW"), [SrConsole.#config.LOG_PREFIX ? "[WARN]" : "", message, ...optionalParams]));
    }
    
    public trace(message?: string, ...optionalParams: any[]) { return this.fatal(message, ...optionalParams); }


    public time(label?: string) { throw new Error("time isn't working yet."); }
    public timeEnd(label?: string) { throw new Error("timeEnd isn't working yet."); }
    public timeLog(label?: string, ...data: any[]) { throw new Error("timeLog isn't working yet."); }
    public timeStamp(label?: string) { throw new Error("timeStamp isn't working yet."); }

    
    // INVALIDATED FUNCTIONS
    public dir(obj?: any, options?: any): void { throw new Error("dir isn't working on NODE. Plz remove it"); }
    public dirxml(...data: any[]): void { throw new Error("dirxml isn't working on NODE. Plz remove it"); }
    public clear() { throw new Error("clear isn't working on NODE. Plz remove it"); }
    public table(tabularData?: any, properties?: readonly string[]){ throw new Error("table isn't working on NODE. Plz remove it"); }
    public profile(label?: unknown) { throw new Error("profile isn't working on NODE. Plz remove it"); }
    public profileEnd(label?: unknown) { throw new Error("profileEnd isn't working on NODE. Plz remove it"); }
}