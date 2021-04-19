import { Socket } from "dgram";
import SocketIO from "socket.io";
import fs from 'fs';
import { Colors } from './colors.js';
import { type } from "os";

const $idcolors = new Colors();

interface Params {
    socket?: Socket | SocketIO.Server;
    filter?: Array<String>;
    dirname?: String;
    options?: {
        global: boolean;
        dated: {
            on: boolean;
            format: string;
        };
    }
}

interface propTime {
    hours: number | string;
    minutes: number | string;
    seconds: number | string;
}

export class ConsoleUtils {
    params?: Params;
    constructor(params?: Params) {
        this.params = params;
    }

    private _time?: propTime = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    private _stdout = process.stdout;
    private _stderr = process.stderr;
    private _stdin = process.stdin;

    protected _socketEmit(arg: string) {

    }

    protected _printStdOut(mode: string, args: Array<Object | Array<any> | String | Object | Number | Function | Boolean | Symbol | undefined>) {
        const doPrint: Array<string | any> = new Array();
        for (const arg of args) {
            const typearg = typeof arg;
            if (!arg) doPrint.push($idcolors.black + $idcolors.bright + 'undefined' + $idcolors.reset);
            else if (typearg === 'bigint') {
                doPrint.push($idcolors.yellow + arg.toString());
            } else if (typearg === 'boolean') {
                doPrint.push($idcolors.green + arg.toString());
            } else if (typearg === 'function') {
                doPrint.push($idcolors.blue + arg.toString());
            } else if (typearg === 'number') {
                doPrint.push($idcolors.yellow + arg.toString());
            } else if (typearg === 'object') {
                doPrint.push(JSON.stringify(arg));
            } else if (typearg === 'string') {
                if (mode === 'log') {
                    doPrint.push($idcolors.cyan + arg.toString());
                } else if (mode === 'debug') {
                    doPrint.push($idcolors.blue + arg.toString());
                } else if (mode === 'sucess') {
                    doPrint.push($idcolors.green + arg.toString());
                } else if (mode === 'group') {
                    doPrint.push($idcolors.magenta + arg.toString());
                }
            } else if (typearg === 'symbol') {
                doPrint.push($idcolors.white + arg.toString());
            } else {
                doPrint.push($idcolors.cyan + arg.toString());
            }
        }
        this._stdout.write(doPrint.join(' ') + $idcolors.reset + '\n', (err) => {
            if (err) throw err;

        })
    }

    protected _printStdErr(mode: string, args: Array<string> | Error) {
        if (Array.isArray(args)) {
            this._stderr.write(args.join(' ') + '\n', (err) => {
                if (err) throw err;
            });
        } else {
            this._stderr.write(args + '\n', (err) => {
                if (err) throw err;
            });
        }
    }

    protected _makeTime(format: string) {
        let _date = new Date();
        if (typeof this._time !== 'object') return `[ERR:ERR:ERR]`
        this._time.hours = _date.getHours();
        this._time.minutes = _date.getMinutes();
        this._time.seconds = _date.getSeconds();

        if (this._time.hours <= 9) this._time.hours = `0${this._time.hours}`;
        if (this._time.minutes <= 9) this._time.minutes = `0${this._time.minutes}`;
        if (this._time.seconds <= 9) this._time.seconds = `0${this._time.seconds}`;

        return `[${this._time.hours}:${this._time.minutes}:${this._time.seconds}]`;
    }

    protected _filterMessage(filter: Array<string>) {

    }
}

export class Console extends ConsoleUtils {
    memory: Number;
    constructor(params?: Params) {
        super(params);
        this.memory = 0;
        this.params = params;
    }

    /**
     * Prints to stdout with a new line [common color]
     * @param {any} args
     */
    public log(...args: any) {
        const $args: Array<any> = args;
        if (this.params?.options?.dated.on) {
            $args.unshift(this._makeTime(this.params.options.dated.format));
        } 
        this._printStdOut('log', args);
    }

    /**
     * Prints to stdout with a new line using a word-filter [common color]
     * @param {any} args
     */
    public send(message: any, ...optional: any) {
        this._printStdOut('log', optional);
    }

    /**
     * Prints to stdout with a new line and show the JS line [non-common color]
     * @param {any} args
     */
    public debug(message: any, ...optional: any) {

    }

    /**
     * Prints Warnings to stderr with a new line [warn color]
     * @param {any} args
     */
    public warn(message: any, ...optional: any) {

    }

    /**
     * Prints Errors to stderr with a new line [error color]
     * @param {any} args
     */
    public err(message: any, ...optional: any) {

    }

    /**
     * Prints Errors to stderr with a new line and exit procees with 500 [FError color] 
     * @param {Error} arg
     */
    public fatalE(message: Error) {

    }

    /**
     * Prints a successful operation to stdout with a new line
     * @param {Error} arg
     */
    public success(message: any, ...optional: any) {

    }

    /**
     * WARNING: Dir functions isn't full implement on sr-console module
     * @param {arg} opt 
     * @param {any} args 
     */
    public dir(opt: Object, ...args: any) {

    }

    /**
     * WARNING: Dir functions isn't full implement on sr-console module
     * Real support for DIRXML (but why are you using XML if JSON exist?)
     * @param {arg} opt 
     * @param {any} args
     * @deprecated Since 30 January
     */
    public dirxml(opt: Object, ...args: any) {

    }

    /**
     * Prints a log message with a initial space and all new lines print a new-line message
     * @param {any} args
     */
    public group(message: any, ...optional: any) {

    }

    /**
     * Prints a log message with a initial spacea and clear the group created before
     * @param {any} args
     */
    public groupEnd(message: any, ...optional: any) {

    }

    /**
     * Prints 'Message' and a trace of the function
     * @param {any} args
     */
    public trace(message: any, ...optional: any) {
    }

    /**
     * Prints a message verifies value is true (if is false do nothing) [white color]
     * @param {any} value
     * @param {string} message
     * @param {any} args
     */
    public assert(value: any, message: string, args: any) {

    }

    /**
     * Maintains an internal counter specific to `label` and outputs to stdout the number of times `count()` has been called with the given label.
     * @param args 
     */
    public count(label: string) {

    }

    /**
     * Resets the internal counter specific to `label`.
     * @param {string} args 
     */
    public countReset(label: string) {

    }

    /**
     * Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique label.
     * @param {string} label 
     */
    public time(label?: string) {

    }

    /**
     * For a timer that was previously started by calling {@link console._time()}, prints the elapsed time and other data arguments to stdout.
     * @param label 
     */
    public timeStamp(label?: string, ...args: any) {

    }

    /**
     * Stops a timer that was previously started by calling {@link console._time()} and prints the result to stdout.
     * @param label 
     */
    public timeEnd(label?: string) {

    }

    /**
    * WARNING: table function isn't full implement on sr-console module
    */
    public table(args: Object | Array<any>) {

    }

    /**
     * WARNING: table function isn't full implement on sr-console module
     * Well... microsoft. i make this function, now have sence to put this function in the type files
     * @param {any} args
     */
    public exception(args: any) {

    }


    /* ALIAS FOR ANY FUNCTION */
    public error: Function = this.err;
    public successful: Function = this.success;
    public ungroup: Function = this.groupEnd;
    public groupCollapsed: Function = this.groupEnd;
    public info: Function = this.log;
}