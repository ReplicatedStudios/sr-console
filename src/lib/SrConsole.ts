import { stderr, stdout, cwd } from "process";
import fs from "fs";
import path from "path";

import iSrTime from "../interface/iSrTime.js";
import iSrColors, { iSrColorsList } from "../interface/iSrColors.js";
import { counts, PrintData, PrintObject } from "../interface/iSrUtil.js";
import iSrConfig from "../interface/iSrConfig.js";
import { Writable } from "stream";
import Socket from "socket.io";
import SrPrint from "./SrPrint.js";


export default class SrConsole {
    // DEFAULTS
    static readonly #D_PRINT: SrPrint = new SrPrint("SYSTEM");
    static readonly #D_GPREFIX = "• ";
    static #D_CONFIG: iSrConfig;
    public static setConfig(config: iSrConfig) { 
        if (!this.#D_CONFIG) this.#D_CONFIG = config; 
        else throw new Error("No se puede ingresar 2 veces la configuracion. ¡IDIOTA!")
    }

    // CLASES DUMP
    public readonly Console: typeof SrConsole = SrConsole;
    public readonly SrConsole: typeof SrConsole = SrConsole;
    public readonly SrPrint: typeof SrPrint = SrPrint;

    // STDs
    readonly #OUT: NodeJS.WritableStream;
    readonly #ERR: NodeJS.WritableStream;

    // UTILITY
    readonly #WRITABLES: (Writable | null)[] = [null, null, null];
    readonly #COUNTS: counts = { default: 0 };
    readonly #TIMERS: { [key: string]: Date } = {};
    readonly #CONFIG: iSrConfig;
    #IO?: Socket.Server;
    #G_COUNT = 0;

    // CONSTRUCTOR
    constructor(stdout: NodeJS.WritableStream, stderr?: NodeJS.WritableStream, ignoreErrors?: boolean, config?: iSrConfig) {
        this.#CONFIG = config ?? SrConsole.#D_CONFIG;
        this.#OUT = stdout;
        this.#ERR = stderr ?? stdout;

        const DIR = path.join(cwd(), this.#CONFIG.FILE_DIR);
        if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
        if (this.#CONFIG.FILE_USE) this.#WRITABLES[0] = fs.createWriteStream(path.join(DIR, "lastest.log"), { encoding: "utf-8", flags: "w" });
        if (this.#CONFIG.FILE_USE_RAW) this.#WRITABLES[1] = fs.createWriteStream(path.join(DIR, "lastest.log"), { encoding: "utf-8", flags: "w" });
        if (this.#CONFIG.FILE_DIR) this.#WRITABLES[2] = fs.createWriteStream(path.join(DIR, "lastest.html"), { encoding: "utf-8", flags: "w" });
    }

    #print(data: PrintData) {
        for (let i = 0; i < data.values.length; i++) data.values.push(iSrColors.parseTypeof(data.values.shift(), data.colors));
        
        // PRIMEROS PASOS
        const GP = SrConsole.#D_GPREFIX.repeat(this.#G_COUNT);
        const TS = new iSrTime(this.#CONFIG.TIME);
        const PX = (this.#CONFIG.LOG_PREFIX ? `${TS.toString().length == 0 ? TS : TS + " "}${data.prefix}` : TS);
        const LG = data.values.join(" ").replace(/\n/gi, "\n".concat(GP));

        const output = `${iSrColors.get("MAGENTA")}${GP}${data.colors}${PX == "" ? "::" : PX + ":"} ${LG}${iSrColors.get("TRESET")}\n`;

        this.#WRITABLES[0]?.write(iSrColors.parseColorToText(output));
        this.#WRITABLES[1]?.write(iSrColors.parseToNone(output));

        if (this.#CONFIG.HTML5) {
            const outputH5 = iSrColors.parseColorToHTML5(iSrColors.parseColorToText(output));
            this.#IO?.send(`srconsole:${data.std}`, outputH5);
            this.#WRITABLES[2]?.write(outputH5)
        } else this.#IO?.send(`srconsole:${data.std}`, iSrColors.parseToNone(output));

    
        if (data.std === "out") stdout.write(output);
        else if (data.std === "err") stderr.write(output);
        else throw new Error("No STD string specified, app is on a broken state?");
    }

    public get memory() { return Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100; }
    public get defaultPrint() { return SrConsole.#D_PRINT; }
    public setSocketIO(socket: Socket.Server) {
        if (typeof socket.send !== "function") {
            this.#print(new PrintObject("err", "SR-CONSOLE", iSrColors.get("RED"), "No se pudo instalar el Socket en la consola"));
            return false;
        } else { 
            this.#IO = socket;
            this.#print(new PrintObject("out", "SR-CONSOLE", iSrColors.get("GREEN", "TBRIGHT"), "Se monto el Socket en la consola exitosamente"));
            return true;
        }
    }

    /** 
     * Lee los archivos .log de la consola y te regresa el contenido en un Buffer
     * @param {string} from
    */
    public fileLoad(from: "RAW" | "NORMAL" | "H5") {
        switch(from) {
            case "RAW": return fs.readFileSync(path.join(this.#CONFIG.FILE_DIR, "raw.log"));
            case "NORMAL": return fs.readFileSync(path.join(this.#CONFIG.FILE_DIR, "lastest.log"));
            case "H5": return fs.readFileSync(path.join(this.#CONFIG.FILE_DIR, "lastest.html"));
            default: this.fatal(new Error("No es valido el archivo" + from + "solicitado"));
        }
    }

    /**
     * Regresa los colores argumentados en un solo String
     */
    public color(...color: (keyof iSrColorsList)[]) { return iSrColors.get(...color); }
    /**
     * Regresa un unico REGEXP del registro de colores disponible
     */
    public colorRex(color: keyof iSrColorsList) { return iSrColors.rex(color); }

    public assert(validate: true): void;
    public assert(validate: false): never;
    public assert(validate: boolean): void | never;
    public assert(validate: boolean) {
        if (!validate) return this.fatal(new Error("Comprobacion de Assert no permitida"));
    }

    public count(label?: string): void {
        const l = label ?? "default"
        const c = this.#COUNTS[l] == undefined ? this.#COUNTS[l] = 0 : this.#COUNTS[l] += 1;
        this.debug(`Contador '${l}' cambio a`, c);
    }

    public countReset(label?: string): void {
        this.#COUNTS[label ?? "default"] = 0;
        this.debug(`Contador '${label ?? "default"}' fue reiniciado`)
    }

    public debug(message: unknown, ...optionalParams: unknown[]): void {
        this.#print(new PrintObject("out", "DEBUG", iSrColors.get("BLACK", "TBRIGHT"), message, ...optionalParams));
        debugger;
    }

    public err(message: unknown, ...optionalParams: unknown[]): void { this.error(message, ...optionalParams) }
    public error(message: unknown, ...optionalParams: unknown[]): void {
        this.#print(new PrintObject("err", "ERROR", iSrColors.get("RED"), message, ...optionalParams));
    }

    public group(message: any, ...optionalParams: any[]): void {
        this.#print(new PrintObject("out", "INFO", iSrColors.get("MAGENTA"), message, ...optionalParams));
        this.#G_COUNT++;
    }

    /** Elimina un grupo de logs. no emitira nada si no hay grupos activos */
    public groupCollapsed(message: any): void {
        if (!(this.#G_COUNT > 0)) return;
        this.#G_COUNT--;
        this.#print(new PrintObject("out", "INFO", iSrColors.get("MAGENTA"), message));
    }

    /** Alias de `groupCollapsed(:string)`
     *
     * Elimina un grupo de logs. no emitira nada si no hay grupos activos */
    public unGroup(message: any) {
        this.#G_COUNT = 0;
        this.#print(new PrintObject("out", "INFO", iSrColors.get("MAGENTA"), message));
    }

    /** Elimina todos los grupos activos. no emitira nada si no hay grupos activos */
    public groupEnd(): void;
    public groupEnd(message: any): void;
    public groupEnd(message?: any): void { this.groupCollapsed(message ?? "<--"); }
    public info(message: any, ...optionalParams: any[]): void {
        this.#print(new PrintObject("out", "INFO", iSrColors.get("CYAN"), message, ...optionalParams));
    }

    public send(message: any, ...optionalParams: any[]) {
        const data = [message, ...optionalParams];
        for (let i = 0; i < data.length; i++) for (const toHide of SrConsole.#D_CONFIG.FILTER) {
                if (typeof data[i] === "string") data[i] = data[i].replace(new RegExp(toHide, "gi"), "[REDACTED]")
        }

        this.#print(new PrintObject("out", `L${iSrColors.get("RED")}OG${iSrColors.get("BLUE")}S`, iSrColors.get("BLUE"), ...data));
    }

    public success(message: any, ...optionalParams: any[]) {
        this.#print(new PrintObject("out", "SUCCESS", iSrColors.get("GREEN"), message, ...optionalParams));
    }

    /** Envia un error fatal a la consola pero sin finalizar el proceso */
    public fatalBack(message: Error): void {
        this.#print(new PrintObject("err", "FATAL-ERROR", iSrColors.get("ZWHITE", "TBRIGHT", "RED"), message.stack));
    }

    /** Envia un error fatal a la consola y finaliza el proceso */
    public fatal(message: Error): never {
        this.fatalBack(message);
        process.exit(1);
    }

    /** Alias de `SrConsole.fatal()` */
    public trace(message: Error) { return this.fatal(message); }

    public log(message: any, ...optionalParams: any[]): void {
        this.#print(new PrintObject("out", "LOGS", iSrColors.get("BLUE"), message, ...optionalParams));
    }

    /** Returna el primer valor ingresado (ignorando posteriores) y Envia a SrConsole.info() todos los parametros  **/
    public spy<T>(message: T, ...optionalParams: any[]): T {
        this.debug(message, ...optionalParams);
        return message;
    }

    public warn(message: any, ...optionalParams: unknown[]): void {
        this.#print(new PrintObject("err", "WARN", iSrColors.get("YELLOW"), message, ...optionalParams));
    }

    public time(label?: string) { 
        this.#TIMERS[label ?? "default"] = new Date();
        this.debug(`Temporizador '${label ?? "default"}' iniciado`);
    }

    public timeEnd(label?: string) {
        const saved = this.#TIMERS[label ?? "default"];
        // @ts-expect-error
        this.#TIMERS[label ?? "default"] = undefined;
        this.debug(`Temporizador '${label ?? "default"}' finalizado: ${Math.abs(new Date().getTime() - saved.getTime())}ms`)
    }

    public timeLog(label?: string) {
        const saved = this.#TIMERS[label ?? "default"];
        this.debug(`Tiempo del temporizador '${label ?? "default"}': ${Math.abs(new Date().getTime() - saved.getTime())}ms`);
    }

    public timeStamp(label?: string) {
        this.timeLog(label);
        return this.#TIMERS[label ?? "default"];
    }
    public clear() { stdout.write("\u001b[2J\u001b[0;0H"); stderr.write("\u001b[2J\u001b[0;0H"); }
    
    // INVALIDATED FUNCTIONS
    public dir(obj?: any, options?: any): never { throw new Error("dir isn't working on NODE. Plz remove it"); }
    public dirxml(...data: any[]): never { throw new Error("dirxml isn't working on NODE. Plz remove it"); }
    public table(tabularData?: any, properties?: readonly string[]): never { throw new Error("table isn't working on SR-CONSOLE yet."); }
    public profile(label?: unknown): never { throw new Error("profile isn't working on NODE. Plz remove it"); }
    public profileEnd(label?: unknown): never { throw new Error("profileEnd isn't working on NODE. Plz remove it"); }
}