import fs from "fs";
import path from "path";
import { stderr, stdout, stdin } from "process";
import IO from "socket.io";

/* MY SHIT */
import SrTime, { SrTimeOpt } from "../tools/time.js";
import SrColors, { SrColorsOpt } from "../tools/colors.js";

/* MY SHIT BUT ABSTRACT */
interface SrConsoleConfig { unwords: string[]; time: keyof SrTimeOpt; log?: { active: boolean, path: string, filename: string } }

export default class SrConsole {
    private static _config: SrConsoleConfig = {
        unwords: [""],
        time: "FORMAT_DATE_SHORT",
        log: {
            active: true,
            path: "/logs",
            filename: "app.txt"
        }
    };

    private static _fileW = SrConsole._config.log?.active 
        ? fs.createWriteStream(path.join(process.cwd(), SrConsole._config.log.path, SrConsole._config.log.filename), "utf-8") 
        : undefined;

    private static printing(c: keyof SrColorsOpt, ...v: any[]) {
        const stringW = `${SrColors[c]}${new SrTime(SrTime.FORMAT_DATE_BASIC).toString()} ${v.join(" ")} \n`;

        stdout.write(stringW);
    }
    private static _gspace = 0;
    private static _counts = {
        main: 0
    }
    public static memory = 0;

    /* NON STATIC METHODS */

    public send(...messages: any[]): void {
        SrConsole.printing("BLUE", ...messages);
    };

    /**
     * @color Azul/Clasico
     * @description Imprime en la consola los argumentos enviados en color Azul
     */
    public log(...messages: any[]): void {
        SrConsole.printing("BLUE", ...messages);
    };
    
    /**
     * Envia un mensaje de error color rojo al stderr
     * @param {any} messages Valores a mostrar en la consola
     */
    public error(...messages: any[]): void {
        SrConsole.printing("RED", ...messages);
    };

    /**
     * Alias de 
     * ```ts
     * SrConsole.error(...v);
     * ```
     * IMPORTANTE: esta funcion solo debe ser usada de forma nativa mas no extraida
     * @param {any} messages Valores a mostrar en la consola
     */
    public err(...messages: any[]): void {
        this.error(...messages);
    };

    /**
     * Alias de
     * ```ts
     * SrConsole.send(...v);
     * ```
     * IMPORTANTE: esta funcion solo debe ser usada de forma nativa mas no extraida
     * Esta implementacion se conservo ya que se va a dar una utilidad adicional a este metodo muy olvidado
     * @param {any} messages Valores a mostrar en la consola
     */
    public info(...messages: any[]): void {
        this.send(...messages);
    };

    /**
     * Envia un mensaje de color verde al stdout
     * @param {any} messages Valores a mostrar en la consola
     */
    public success(...messages: any[]): void {
        SrConsole.printing("GREEN", ...messages);
    };

    /**
     * Envia un mensaje de color rojo al stderr y finalmente detiene todo el proceso
     * @param {Error} err Valores a mostrar en la consola
     */
    public fatal(err: Error) {
        SrConsole.printing("BG_RED", SrColors.WHITE, err.stack?.toString());
    };

    /**
     * Compara un valor booleano. si es TRUE enviara un mensaje, si es FALSE enviara un mensaje "%assert% failed"
     * 
     * @param {boolean} bol Parametro a comparar
     * @param {string} name Nombre del assert
     * @param {any} messages Valores a mostrar en la consola
     * 
     * @example 
     * ```ts
     * console.assert(isReady, "ReadyCheckStatus", "ReadyOperation")
     * ```
     * @returns si es FALSE: ``[00:00:00]: ReadyCheckStatus failed``
     * @returns si es TRUE: ``[00:00:00]: [ReadyCheckStatus]: ReadyOperation``
     */
    public assert(bol: boolean, name: string, ...messages: any[]) {
        bol ? SrConsole.printing("BG_WHITE", SrColors.BLACK, ...messages) : SrConsole.printing("BG_RED", SrColors.WHITE, ...messages);
    };

    /**
     * Envia un mensaje de color morado al stdout
     * Tambien cada que se use una funcion que imprima texto en consola agrega 1 linea vacia al inicio
     * si se usa varias veces agrega mas lineas de espacio al inicio
     * @param {any} messages Valores a mostrar en la consola
     */
    public group(...messages: any[]) {
        SrConsole._gspace++;
        SrConsole.printing("MAGENTA", ...messages);
    }

    /**
     * Envia un mensaje de color morado al stdout
     * Elimina las lineas activas que se crearon al usar `console.group();`
     * @param {any} messages Valores a mostrar en la consola
     */
    public groupEnd(...messages: any[]) {
        SrConsole._gspace > 0 ? SrConsole._gspace-- : SrConsole._gspace = 0;
        SrConsole.printing("MAGENTA", ...messages);
    }

    /**
     * Envia un mensaje de color morado al stdout
     * Elimina las lineas activas que se crearon al usar `console.group();`
     * @param {any} messages Valores a mostrar en la consola
     */
     public groupCollasep(...messages: any[]) {
        SrConsole._gspace > 0 ? SrConsole._gspace-- : SrConsole._gspace = 0;
        SrConsole.printing("MAGENTA", ...messages);
    }

    /**
     * Agrega varias lineas en blanco simulando una limpieza
     * @param {any} messages Valores a mostrar en la consola
     */
    public clear() {
        SrConsole.printing("T_RESET", "\n".repeat(20));
    }

    /**
     * Envia un mensaje de color 
     * Elimina las lineas activas que se crearon al usar `console.group();`
     * @param {any} messages Valores a mostrar en la consola
     */
    public count(label?: string) {
        if (!label) SrConsole._counts.main++

    }

    public countReset() {
        
    }
}