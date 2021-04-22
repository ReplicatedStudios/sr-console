import { writeFileSync } from 'fs';
import { stderr, stdin, stdout } from 'process';
import { SrConsoleTools } from './tools.js';
import SocketIO from 'socket.io'


const SrTools = new SrConsoleTools();

interface Params {
    socket?: WebSocket | SocketIO.Server;
    filter?: Array<string>;
    dirname?: string;
    options?: {
        globalEnv?: boolean;
        dated?: {
            mode: 'prefix' | 'suffix';
            format: string;
        };
    }
}

interface propTime {
    hours: number | string;
    minutes: number | string;
    seconds: number | string;
}

class ConsoleUtils {
    options: Params;
    constructor (params?: Params) {
        if (params) this.options = params; else this.options = {}
    }
    /**
     * Returna el estado de la memoria RAM en MB despues de que se llame cualquier funcion de impresion
     */
    public memory: number = 0;
    protected groupTab: number = 0;
    private _time: propTime = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    protected _printStdOut(firstMessage: string, ...optionalMessages: Array<string>) {
        //PROCESADO DE GRUPOS
        let tabsToDo: string = ''
        let countTab: number = 0;
        for (let i = 0; i < this.groupTab; i++) {
            tabsToDo += ' ';
        }

        //PROCESADO DE FECHA-HORA
        let dateToDo: string = ''
        if (this.options.options?.dated) {
            dateToDo = this._makeADate();
        }

        let concated = tabsToDo;
        stdout.write(concated + firstMessage + this._makeADate() + ' ' + optionalMessages.join(' ') + '\n');
    }

    protected _printStdErr(firstMessage: string, ...optionalMessages: Array<string>) {
        let tabsToDo: string = ''
        let countTab: number = 0;
        for (let i = 0; i < this.groupTab; i++) {
            tabsToDo += ' ';
        }

        let dateToDo: string = ''
        if (this.options.options?.dated) {
            dateToDo = this._makeADate();
        }

        let concated = tabsToDo;

        stderr.write(concated + firstMessage + this._makeADate() + ' ' + optionalMessages.join(' ') + '\n');
        this._processMemory();
    }

    protected _processMemory() {
        this.memory = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
    }

    protected _stringingToPrint(param: any): string {
        const typeParam = typeof param;

        if (typeParam === 'string') return param; 
        else if (typeParam === 'object') return this._objectToPrint(param);
        else if (typeParam === 'number') return param.toString();
        else if (typeParam === 'bigint') return param.toString();
        else if (typeParam === 'boolean') if (param) return 'true'; else return 'false'; 
        else if (typeParam === 'function') return this._objectToPrint(param);
        else if (typeParam === 'symbol') return param.toString();
        else if (typeParam === 'undefined') return 'undefined';
        else return 'undefined';
    }

    /**
     * @param {object} param
     */
    protected _objectToPrint(param: object | Array<any>): string {
        return param.toString();
    }

    protected _makeADate() {
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
}

class Console extends ConsoleUtils {
    params?: Params;
    constructor(params?: Params) {
        super(params);
        this.params = params;
    }

    /**
     * Imprime en la consola el mensaje con un salto de linea
     * @color Comun
     * @param {any} message
     * @param {Array<any>} optional
     */
    public log(message: any, ...optional: Array<any>): void {
        const __message = this._stringingToPrint(message);
        
        this._printStdOut(SrTools.colors('blue'), __message, ...optional);
    }

    /**
     * Filtra e Imprime en la consola el mensaje con un salto de linea
     * @color Comun
     * @param {any} message
     * @param {Array<string>} optional
     */
    public send(message: any, ...optional: Array<any>) {
        const __message = this._stringingToPrint(message);
        
        this._printStdOut(SrTools.colors('blue'), __message, ...optional);
    }

    /**
     * Prints to stdout with a new line and show the JS line [non-common color]
     * @param {any} args
     */
    public debug(message: any, ...optional: Array<string>) {
        const __message = this._stringingToPrint(message);
        
        this._printStdOut(SrTools.colors('cyan'), __message, ...optional);
    }

    /**
     * Prints Warnings to stderr with a new line [warn color]
     * @param {any} args
     */
    public warn(message: any, ...optional: Array<string>) {
        const __message = this._stringingToPrint(message);
        
        this._printStdErr(SrTools.colors('yellow'), __message, ...optional);
    }

    /**
     * Prints Errors to stderr with a new line [error color]
     * @param {any} args
     */
    public err(message: any, ...optional: Array<string>) {
        const __message = this._stringingToPrint(message);
        
        this._printStdErr(SrTools.colors('red'), __message, ...optional);
    }

    /**
     * Prints Errors to stderr with a new line and exit procees with 500 [FError color] 
     * @param {Error} arg
     */
    public fatalE(message: any) {
        const __message = this._stringingToPrint(message);
        
        this._printStdErr(SrTools.colors('red'), __message);
    }

    /**
     * Prints a successful operation to stdout with a new line
     * @param {Error} arg
     */
    public success(message: any, ...optional: any) {
        const __message = this._stringingToPrint(message);
        
        this._printStdOut(SrTools.colors('green'), __message, ...optional);
    }

    /**
     * WARNING: Dir functions isn't full implement on sr-console module
     * @param {arg} opt 
     * @param {any} args 
     */
    public dir(opt: Object, message: any, ...optional: any) {

    }

    /**
     * WARNING: Dir functions isn't full implement on sr-console module
     * Real support for DIRXML (but why are you using XML if JSON exist?)
     * @param {arg} opt 
     * @param {any} args
     * @deprecated Since 30 January
     */
    public dirxml(opt: Object, message: any, ...optional: any) {

    }

    /**
     * Prints a log message with a initial space and all new lines print a new-line message
     * @param {any} args
     */
    public group(message: any, ...optional: any) {
        const __message = this._stringingToPrint(message);
        this.groupTab++;

        this._printStdOut(SrTools.colors('magenta'), __message, ...optional);
    }

    /**
     * Prints a log message with a initial spacea and clear the group created before
     * @param {any} args
     */
    public groupEnd(message: any, ...optional: any) {
        const __message = this._stringingToPrint(message);
        if (this.groupTab !== 0) this.groupTab--;
        
        this._printStdOut(SrTools.colors('magenta'), __message, ...optional);
    }

    /**
     * Prints 'Message' and a trace of the function
     * @param {any} args
     */
    public trace(message: string, ...optional: any) {
        const __message = this._stringingToPrint(message);
        
        this._printStdErr(SrTools.colors('red'), __message, ...optional);
    }

    /**
     * Prints a message verifies value is true (if is false do nothing) [white color]
     * @param {any} value
     * @param {string} message
     * @param {any} args
     */
    public assert(value: any, message: string, ...optional: any) {
        const __message = this._stringingToPrint(message);
        
        this._printStdOut(SrTools.colors('white'), __message, ...optional);
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
    public timeStamp(message: any, label?: string, ...optional: any) {

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
}

export default Console;