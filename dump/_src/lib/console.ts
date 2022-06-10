/* LIBRERIAS */
import { WriteStream, createWriteStream } from "fs";
import ph from "path";
import { stderr, stdout, stdin, cwd } from "process";
import IO from "socket.io";
import { Console } from "console";

/* UTILIDADES */
import SrTime, {SrTimeMatch} from "../tools/time.js";
import SrColors, { SrColorsMatch } from "../tools/colors.js";

/* MODELOS (o lo que sea) */
import Config from '../tools/config.js';
import Print from "../tools/print.js";
import {config} from "dotenv";

export default class SrConsole extends Console {
    //DEFAULT CLASS EXPORT
    public static readonly Config: typeof Config = Config;
    public static readonly Print: typeof Print = Print;
    public static readonly Time: typeof SrTime = SrTime;
    public static readonly Colors: typeof SrColors = SrColors;

    //CONFIG
    readonly #config: Config;
    readonly #fileSrt?: WriteStream | undefined;
    static #space: number = 0;
    /**
     * Muestra el uso de RAM obtenido tras el ultimo `console.method();`
     */
    static memory = 0;
    static #counts: { [i: string]: number } = {
        default: 0,
    }
    static _gspace: any;

    /**
     * Crea una nueva instancia de Sr-console
     *
     * Aunque la configuracion sea dinamica (por objeto instanciado) el entorno es estatico. 
     * Por lo que puede presentar problemas al usar `console.group()` o `console.count(label: string);`
     * 
     * Uselo manualmente bajo su propio riesgo
     * @since v0.2.0
     */
    constructor(c: Config) {
        super(stdout, stderr, false);

        this.#config = c;
        this.#fileSrt = this.#config.FILE.ACTIVE ? createWriteStream(ph.join(cwd(), this.#config.FILE.PATH, this.#config.FILE.NAME), "utf-8") : undefined;
    }

    //STATIC PRINTER
    static #overPrint(p: Print) {
        const out = `${SrColors[p.CL]}${new SrTime(p.CG.TIME)} ${p.VL.join(" ")} ${SrColors["T_RESET"]}\n`

        switch(p.STD) {
            case "OUT": return stdout.write(out);
            case "ERR": return stderr.write(out);
            default: throw new Error("Not specified a STD:OUT or STD:ERR output var in SrConsole.Print");
        }
    }

    private static printing(c: SrColorsMatch, ...v: any[]) {
        const stringW = `${SrColors[c]}${new SrTime(SrTime.FORMAT_BASIC).toString()} ${v.join(" ")} \n`;

        stdout.write(stringW);
    }



    /* NON STATIC METHODS */

    /**
     * 
     */
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
        if (!label) SrConsole.#counts.main++

    }

    public countReset() {
        
    }
}