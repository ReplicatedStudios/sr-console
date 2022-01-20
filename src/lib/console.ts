// Librerias
import fs from "fs";
import path from "path";
import { stderr, stdin, stdout } from 'process';
import SocketIO from "socket.io";

// Modulos
import Colors, { ConsoleColors, ConsoleFilteredColors } from "../tools/colors.js";
import Time, { TimeMethod } from "../tools/time.js";

// Configuraciones
export interface SrConsoleConfig {
    filter?: string[];
    time?: keyof TimeMethod;
    logs?: { 
        active: boolean,
        path: string
    }
}

// Utilidades
class SrConsoleUtil {
    config: SrConsoleConfig;
    _fileStream?: fs.WriteStream;
    constructor(config?: SrConsoleConfig) {
        this.config = !config ? {} : config;
        this._fileStream = this.config.logs?.active ? fs.createWriteStream(path.join(process.cwd(), this.config.logs.path, '/logs.txt'), 'utf-8') : undefined;
    }

    public memory: number = 0;
    protected _groups: number = 0;
    protected _counts: object = new Object({ index: 0 });
    protected stdOut = stdout;
    protected stdErr = stderr;
    protected stdIn = stdin;
    protected socketIO?: SocketIO.Server;

    protected _readMemory(): void {
        this.memory = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
        return;
    }

    protected _resolveTypeOfColor(values: any[], color: keyof ConsoleFilteredColors, method: 'normal' | 'filtered'): string {
        if (method === 'normal') {
            let resolvedString: string = '';

            values.forEach((msg, i, arr) => {
                try {
                    typeof msg === 'string' && (resolvedString += `${Colors[color] + msg} `);
                    typeof msg === 'number' && (resolvedString += `${Colors['green'] + msg.toString()} `);
                    typeof msg === 'boolean' && (resolvedString += `${Colors['green'] + msg} `);
                    typeof msg === 'bigint' && (resolvedString += `${Colors['green'] + msg.toString()} `);
                    typeof msg === 'function' && (resolvedString += `${Colors['yellow'] + msg.toString()} `);
                    typeof msg === 'object' && (resolvedString += `${Colors['red'] + msg.toString()} `);
                    typeof msg === 'symbol' && (resolvedString += `${Colors['magenta'] + msg.toString()} `);
                    typeof msg === 'undefined' && (resolvedString += `${Colors[color] + Colors['underscore'] + 'undefined'} `);
                } catch (e) {
                    resolvedString += e;
                }
            });
            return resolvedString;

        } else {
            let resolvedString: string = '';
            values.forEach((msg, i, arr) => {
                try {
                    typeof msg === 'string' && (resolvedString += `${Colors.Filtered['blue'] + msg} `);
                    typeof msg === 'number' && (resolvedString += `${Colors.Filtered['green'] + msg.toString()} `);
                    typeof msg === 'boolean' && (resolvedString += `${Colors.Filtered['green'] + msg} `);
                    typeof msg === 'bigint' && (resolvedString += `${Colors.Filtered['green'] + msg.toString()} `);
                    typeof msg === 'function' && (resolvedString += `${Colors.Filtered['yellow'] + msg.toString()} `);
                    typeof msg === 'object' && (resolvedString += `${Colors.Filtered['red'] + msg.toString()} `);
                    typeof msg === 'symbol' && (resolvedString += `${Colors.Filtered['magenta'] + msg.toString()} `);
                    typeof msg === 'undefined' && (resolvedString += `${Colors.Filtered['blue'] + Colors.Filtered['underscore'] + 'undefined'} `);
                } catch (e) {
                    resolvedString += e;
                }
            });

            return resolvedString;
        };
    }

    protected _sendToSockets(method: 'in' | 'out' | 'err', msg: string) {
        this.socketIO?.emit(`console:${method}`, msg);
    }

    protected async _printToConsole(color: keyof ConsoleFilteredColors, std: 'in' | 'out' | 'err', message: any, optMessage: any[]): Promise<void> {
        let spaceGroups: string = ``;
        let i: number = 0;
        while (this._groups > i) { spaceGroups+= `  `; i++; }

        const msg = `${spaceGroups}${new Time().build(this.config.time)}${message} `;

        std === 'err' && (this.stdErr.write(Colors[color] + msg + this._resolveTypeOfColor(optMessage, color, 'normal')  + '\n' + Colors.reset));
        std === 'in' && (this.stdIn.write(Colors[color] + msg + this._resolveTypeOfColor(optMessage, color, 'normal')  + '\n' + Colors.reset));
        std === 'out' && (this.stdOut.write(Colors[color] + msg + this._resolveTypeOfColor(optMessage, color, 'normal')  + '\n' + Colors.reset));

        this._sendToSockets(std, Colors.Filtered[color] + msg + this._resolveTypeOfColor(optMessage, color, 'filtered') + Colors.Filtered.reset);
        this._fileStream?.write(Colors.Filtered[color] + msg + this._resolveTypeOfColor(optMessage, color, 'filtered') + '\n' + Colors.Filtered.reset);
        this._readMemory();
    }
}

export class SrConsole extends SrConsoleUtil {
    constructor(config?: SrConsoleConfig) {
        super(config);
    }

    public SocketIO (server: SocketIO.Server): boolean {
        this.socketIO = server;
        if (this.socketIO.engine) return true;
        else return false;
    }

    /**
     * @color Azul/Clasico
     * @description Imprime en la consola los argumentos enviados en color Azul
     */
    public log(msg: any, ...optMessage: any[]) {
        this._printToConsole('blue', 'out', msg, optMessage);
    }

    /**
     * @color Azul/Clasico
     * @description Filtra palabras o simbolos (de un string) e imprime el resultado [solo funciona para el primer argumento]
     */
    public send(msg: string, ...optMessage: any[]) {
        let msgClean = msg;
        if (this.config.filter) {
            this.config.filter.forEach((word, i, arr) => { 
                msgClean = msgClean.replace(new RegExp(word, 'gi'), ' ');
            });
        }
        this._printToConsole('blue', 'out', msgClean, optMessage);
    }

    /**
     * @color Amarillo/Clasico
     * @description Envia un mensaje a stderr con color amarillo
     */
    public warn(msg: any, ...optMessage: any[]) {
        this._printToConsole('yellow', 'err', msg, optMessage);
    }

    /**
     * @color Celeste/Clasico
     * @description Envia un mensaje a stdout con color celeste
     */
    public debug(msg: any, ...optMessage: any[]) {
        this._printToConsole('cyan', 'out', msg, optMessage);
    }

    /**
     * @color Azul/Profundo
     * @description Envia un mensaje a stdout con color azul profundo
     */
    public info(msg: any, ...optMessage: any[]) {
        this._printToConsole('cyan', 'out', msg, optMessage);
    }

    /**
     * @color Rojo/Clasico
     * @description Envia un mensaje de error o un Error con color Rojo
     */
    public error(msg: any, ...optMessage: any[]) {
        this._printToConsole('red', 'err', msg, optMessage);
    }

    /**
     * @color Rojo/Clasico
     * @description Alias de `console.error();`
     */
    public err(msg: any, ...optMessage: any[]) {
        this._printToConsole('red', 'err', msg, optMessage);
    }

    public success(msg: any, ...optMessage: any[]) {
        this._printToConsole('green', 'out', msg, optMessage);
    }

    public FatalE(msg: Error) {
        this._printToConsole('bg_white', 'out', Colors['red'] + msg, []);
    }

    public assert(msg: any, ...optMessage: any[]) {
        this._printToConsole('white', 'err', msg, optMessage);
    }

    public clear() {
        this._printToConsole('reset', 'out', '\n\n\n\n\n\n\n\n\n\n\n\n\n', []);
    }

    public group(msg: any, ...optMessage: any[]) {
        this._printToConsole('magenta', 'out', msg, optMessage);
        this._groups++
    }

    public groupEnd(msg: any, ...optMessage: any[]) {
        if (this._groups !== 0) this._groups--;
        this._printToConsole('magenta', 'out', msg, optMessage);
    }

    public groupCollapsed(msg: any, ...optMessage: any[]) {
        if (this._groups !== 0) this._groups--;
        this._printToConsole('magenta', 'out', msg, optMessage);
    }

    /**
     * @private
     */
    public count() {
        //SOON
    }

    /**
     * @private
     */
    public countReset() {
        //SOON
    }

    /**
     * @private
     */
    public dir() {
        //SOON
    }

    /**
     * @private
     */
    public dirxml() {
        //SOON
    }

    /**
     * @private
     */
    public table() {
        //SOON
    }

    /**
     * @private
     */
    public time() {
        //SOON
    }

    /**
     * @private
     */
    public timeEnd() {
        //SOON
    }

    /**
     * @private
     */
    public timeLog() {
        //SOON
    }

    /**
     * @private
     */
    public timeStamp() {
        //SOON
    }

    /**
     * @private
     */
    public trace() {
        //SOON
    }

    /**
     * @private
     */
    public profile() {
        //SOON
    }

    /**
     * @private
     */
    public profileEnd() {
        //SOON
    }

}

export default SrConsole;
