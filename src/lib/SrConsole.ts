import { stderr, stdout, cwd } from "process";
import fs from "fs";
import path from "path";

import iSrTime from "../interface/iSrTime.js";
import iSrColors from "../interface/iSrColors.js";
import { counts, PrintData, PrintObject } from "../interface/iSrUtil.js";
import iSrConfig from "../interface/iSrConfig.js";
import { Writable } from "stream";
import Socket from "socket.io";
import SrPrint from "./SrPrint.js";

export default class SrConsole {
    static readonly SRCOLORS = iSrColors;
    static readonly #DEFAULTPRINT: SrPrint = new SrPrint("SYSTEM");
    static FILELOG?: Writable;
    static FILERAW?: Writable;
    static FILEHTML5?: Writable;
    static IO?: Socket.Server;
    
    static #counts: counts = { default: 0 };
    static #timers: { [key: string]: Date } = {};
    static #config: iSrConfig;
    static #groups = 0;

    /** Clase por defecto de SrConsole, No utilizar la clase para sub-instanciar nuevas consolas durante el tiempo de ejecucion
     * la clase no fue diseñada para ser instanciada mas de una vez*/
    constructor(config: iSrConfig) {
        SrConsole.#config = config;
        const logdir = path.join(cwd(), config.FILE);

        if (!fs.existsSync(logdir)) fs.mkdirSync(logdir, { recursive: true });
        if (config.FILE_USE) SrConsole.FILELOG = fs.createWriteStream(path.join(logdir, "lastest.log"), { encoding: "utf-8", flags: "a" });
        if (config.FILE_USE_RAW) SrConsole.FILERAW = fs.createWriteStream(path.join(logdir, "raw.log"), { encoding: "utf-8", flags: "a" });
        if (config.HTML5) SrConsole.FILEHTML5 = fs.createWriteStream(path.join(logdir, "lastest.html"), { encoding: "utf-8", flags: "w" });

        // PREVENIR NUEVAS INSTANCIAS
        if (console instanceof SrConsole) console.fatal(new Error("Ya existe una instancia de SrConsole. ¡NO LO VUELVAS A HACER!"));
    }

    public static isInstanceExisting() { return this.#config && console instanceof this; }
    static #print(data: PrintData) {
        for (let i = 0; i < data.values.length; i++) data.values.push(iSrColors.parseTypeof(data.values.shift(), data.colors));

        // BUILD
        const output = `${iSrColors.get("MAGENTA") + "• ".repeat(this.#groups)}${data.colors}${new iSrTime(this.#config.TIME ?? iSrTime.D_CLASSIC)} ${this.#config.LOG_PREFIX ? data.values.shift() : ""}${data.colors}: ${data.values.join(" ").replace(/\n/gi, "\n" + "  ".repeat(this.#groups))}${this.SRCOLORS.get("TRESET")}\n`;
        SrConsole.FILELOG?.write(iSrColors.parseColorToText(output));
        SrConsole.FILERAW?.write(iSrColors.parseToNone(output));

        if (this.#config.HTML5) {
            const outputHTML5 = iSrColors.parseColorToHTML5(iSrColors.parseColorToText(output));
            SrConsole.FILEHTML5?.write(outputHTML5);
            SrConsole.IO?.emit(`srconsole:${data.std}`, outputHTML5);
        } else SrConsole.IO?.emit(`srconsole:${data.std}`, iSrColors.parseToNone(output));

        if (data.std === "out") stdout.write(output);
        else if (data.std === "err") stderr.write(output);
        else throw new Error("No STD string specified");
    }

    public readonly SrConsole: typeof SrConsole = SrConsole;
    public readonly SrPrint: typeof SrPrint = SrPrint;

    public get memory() { return Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100; }
    public get defaultPrint() { return SrConsole.#DEFAULTPRINT; }
    public setSocketIO(socket: Socket.Server) {
        if (!socket.engine) { this.err("[SR-CONSOLE] No se pudo instalar el Socket a la consola"); return false;} 
        else { this.success("[SR-CONSOLE] Se monto el Socket a la consola exitosamente"); return true; }
    }

    public assert(validate: true): void;
    public assert(validate: false): never;
    public assert(validate: boolean): void | never;
    public assert(validate: boolean) {
        if (!validate) return this.fatal(new Error("Comprobacion de Assert no permitida"));
    }

    public count(label?: string): void {
        const l = label ?? "default"
        const c = SrConsole.#counts[l] == undefined ? SrConsole.#counts[l] = 0 : SrConsole.#counts[l] += 1;
        this.debug(`Contador '${l}' cambio a`, c);
    }

    public countReset(label?: string): void {
        SrConsole.#counts[label ?? "default"] = 0;
        this.debug(`Contador '${label ?? "default"}' fue reiniciado`)
    }

    public debug(message: unknown, ...optionalParams: unknown[]): void {
        SrConsole.#print(new PrintObject("out", iSrColors.get("BLACK", "TBLINK"), [SrConsole.#config.LOG_PREFIX ? "[DEBUG]" : "", message, ...optionalParams]));
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
        SrConsole.#print(new PrintObject("out", iSrColors.get("MAGENTA"), [SrConsole.#config.LOG_PREFIX ? "[INFO]" : "", message]));
    }

    /** Elimina todos los grupos activos. no emitira nada si no hay grupos activos */
    public groupEnd(message: any): void { this.groupCollapsed(message); }
    public info(message: any, ...optionalParams: any[]): void {
        SrConsole.#print(new PrintObject("out", iSrColors.get("CYAN"), [SrConsole.#config.LOG_PREFIX ? "[INFO]" : "", message, ...optionalParams]));
    }

    public send(message: any, ...optionalParams: any[]) {
        const data = [message, ...optionalParams];
        for (let i = 0; i < data.length; i++) for (const toHide of SrConsole.#config.FILTER) {
                if (typeof data[i] === "string") data[i] = data[i].replace(new RegExp(toHide, "gi"), "[REDACTED]")
        }

        SrConsole.#print(new PrintObject("out", iSrColors.get("BLUE"), [SrConsole.#config.LOG_PREFIX ? `[L${iSrColors.get("RED")}OG${iSrColors.get("BLUE")}S]` : "", ...data]));
    }

    public success(message: any, ...optionalParams: any[]) {
        SrConsole.#print(new PrintObject("out", iSrColors.get("GREEN"), [SrConsole.#config.LOG_PREFIX ? "[SUCCESS]" : "", message, ...optionalParams]));
    }

    public fatalBack(message: Error): void {
        SrConsole.#print(new PrintObject("out", iSrColors.get("ZWHITE", "TBRIGHT", "RED"), [SrConsole.#config.LOG_PREFIX ? "[FATAL-ERROR]" : "", message.stack]));
    }

    public fatal(message: Error): never {
        this.fatalBack(message);
        process.exit(1);
    }

    public trace(message: Error) { return this.fatal(message); }

    public log(message: any, ...optionalParams: any[]): void {
        SrConsole.#print(new PrintObject("out", iSrColors.get("BLUE"), [SrConsole.#config.LOG_PREFIX ? "[LOGS]" : "", message, ...optionalParams]));
    }

    /** Returna el primer valor ingresado (ignorando posteriores) y Envia a SrConsole.info() todos los parametros  **/
    public spy<T>(message: T, ...optionalParams: any[]): T {
        this.info(message, ...optionalParams);
        return message;
    }

    public warn(message: any, ...optionalParams: unknown[]): void {
        SrConsole.#print(new PrintObject("err", iSrColors.get("YELLOW"), [SrConsole.#config.LOG_PREFIX ? "[WARN]" : "", message, ...optionalParams]));
    }

    public time(label?: string) { 
        SrConsole.#timers[label ?? "default"] = new Date();
        this.debug(`Temporizador '${label ?? "default"}' iniciado`);
    }

    public timeEnd(label?: string) {
        const saved = SrConsole.#timers[label ?? "default"];
        // @ts-expect-error
        SrConsole.#timers[label ?? "default"] = undefined;
        this.debug(`Temporizador '${label ?? "default"}' finalizado: ${Math.abs(new Date().getTime() - saved.getTime())}ms`)
    }

    public timeLog(label?: string) {
        const saved = SrConsole.#timers[label ?? "default"];
        this.debug(`Tiempo del temporizador '${label ?? "default"}': ${Math.abs(new Date().getTime() - saved.getTime())}ms`);
    }

    public timeStamp(label?: string) {
        this.timeLog(label);
        return SrConsole.#timers[label ?? "default"];
    }
    public clear() { stdout.write("\u001b[2J\u001b[0;0H"); stderr.write("\u001b[2J\u001b[0;0H"); }
    
    // INVALIDATED FUNCTIONS
    public dir(obj?: any, options?: any): never { throw new Error("dir isn't working on NODE. Plz remove it"); }
    public dirxml(...data: any[]): never { throw new Error("dirxml isn't working on NODE. Plz remove it"); }
    public table(tabularData?: any, properties?: readonly string[]): never { throw new Error("table isn't working on SR-CONSOLE yet."); }
    public profile(label?: unknown): never { throw new Error("profile isn't working on NODE. Plz remove it"); }
    public profileEnd(label?: unknown): never { throw new Error("profileEnd isn't working on NODE. Plz remove it"); }
}