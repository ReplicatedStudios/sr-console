import { writeFileSync, createWriteStream, WriteStream } from "fs";
import Colors, { ConsoleColors, ConsoleFilteredColors } from "./tools/colors.js";
import Time, { TimeBuildMethods } from "./tools/time.js";
import { stderr, stdin, stdout } from 'process';
import SocketIO from "socket.io";

export interface ConsoleConfig {
    dirname?: string;
    filter?: Array<string>;
    time?: keyof TimeBuildMethods;
    socketIO?: SocketIO.Server;
    websocket?: WebSocket;
}

class ConsoleUtil {
    config: ConsoleConfig;
    _fileStream?: WriteStream;
    constructor(config?: ConsoleConfig) {
        this.config = !config ? {} : config;
        this._fileStream = this.config.dirname ? createWriteStream(this.config.dirname + '/logs.txt', 'utf-8') : undefined;
    }

    public memory: number = 0;
    protected _groups: number = 0;
    protected _counts: object = new Object({ index: 0 });
    protected stdOut = stdout;
    protected stdErr = stderr;
    protected stdIn = stdin;

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
        this.config.socketIO?.emit(`console:${method}`, msg);
        this.config.websocket?.send(msg);
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

export class Console extends ConsoleUtil {
    constructor(config?: ConsoleConfig) {
        super(config);
    }

    /**
     * @color Blue/Classic
     * @description Imprime en la consola los argumentos enviados en color Azul
     */
    public log(msg: any, ...optMessage: any[]) {
        this._printToConsole('blue', 'out', msg, optMessage);
    }

    /**
     * @color Blue/Classic
     * @description Filtra palabras o simbolos (de un string) e imprime el resultado [solo funciona para el primer argumento]
     */
    public send(msg: any, ...optMessage: any[]) {
        let messageFiltered = msg;
        if (this.config.filter) {
            this.config.filter.forEach((word, i, arr) => { 
                messageFiltered.replace(new RegExp(word, 'gi'), ' ');
            });
        }
        this._printToConsole('blue', 'out', msg, optMessage);
    }

    public warn(msg: any, ...optMessage: any[]) {
        this._printToConsole('yellow', 'err', msg, optMessage);
    }

    public debug(msg: any, ...optMessage: any[]) {
        this._printToConsole('cyan', 'out', msg, optMessage);
    }

    public info(msg: any, ...optMessage: any[]) {
        this._printToConsole('cyan', 'out', msg, optMessage);
    }

    public error(msg: any, ...optMessage: any[]) {
        this._printToConsole('red', 'err', msg, optMessage);
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

    public count() {
        //SOON
    }

    public countReset() {
        //SOON
    }

    public dir() {
        //SOON
    }

    public dirxml() {
        //SOON
    }

    public table() {
        //SOON
    }

    public time() {
        //SOON
    }

    public timeEnd() {
        //SOON
    }

    public timeLog() {
        //SOON
    }

    public timeStamp() {
        //SOON
    }

    public trace() {
        //SOON
    }

    public profile() {
        //SOON
    }

    public profileEnd() {
        //SOON
    }

    public Console = Console
}

export default Console;
