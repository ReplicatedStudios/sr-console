import { stderr, stdout } from 'process';
import { SrConsoleTools } from './tools.js';
const SrTools = new SrConsoleTools();
class ConsoleUtils {
    constructor(params) {
        this.memory = 0;
        this.groupTab = 0;
        this._time = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        if (params)
            this.options = params;
        else
            this.options = {};
    }
    _printStdOut(firstMessage, ...optionalMessages) {
        let tabsToDo = '';
        let countTab = 0;
        for (let i = 0; i < this.groupTab; i++) {
            tabsToDo += ' ';
        }
        let dateToDo = '';
        if (this.options.options?.dated) {
            dateToDo = this._makeADate();
        }
        let concated = tabsToDo;
        stdout.write(concated + firstMessage + this._makeADate() + ' ' + optionalMessages.join(' ') + '\n');
    }
    _printStdErr(firstMessage, ...optionalMessages) {
        let tabsToDo = '';
        let countTab = 0;
        while (countTab < this.groupTab) {
            tabsToDo += '  ';
        }
        ;
        let dateToDo = '';
        if (this.options.options?.dated) {
            dateToDo = this._makeADate();
        }
        let concated = tabsToDo;
        stderr.write(concated + firstMessage + this._makeADate() + ' ' + optionalMessages.join(' ') + '\n');
        this._processMemory();
    }
    _processMemory() {
        this.memory = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
    }
    _stringingToPrint(param) {
        const typeParam = typeof param;
        if (typeParam === 'string')
            return param;
        else if (typeParam === 'object')
            return this._objectToPrint(param);
        else if (typeParam === 'number')
            return param.toString();
        else if (typeParam === 'bigint')
            return param.toString();
        else if (typeParam === 'boolean')
            if (param)
                return 'true';
            else
                return 'false';
        else if (typeParam === 'function')
            return this._objectToPrint(param);
        else if (typeParam === 'symbol')
            return param.toString();
        else if (typeParam === 'undefined')
            return 'undefined';
        else
            return 'undefined';
    }
    _objectToPrint(param) {
        return param.toString();
    }
    _makeADate() {
        let _date = new Date();
        if (typeof this._time !== 'object')
            return `[ERR:ERR:ERR]`;
        this._time.hours = _date.getHours();
        this._time.minutes = _date.getMinutes();
        this._time.seconds = _date.getSeconds();
        if (this._time.hours <= 9)
            this._time.hours = `0${this._time.hours}`;
        if (this._time.minutes <= 9)
            this._time.minutes = `0${this._time.minutes}`;
        if (this._time.seconds <= 9)
            this._time.seconds = `0${this._time.seconds}`;
        return `[${this._time.hours}:${this._time.minutes}:${this._time.seconds}]`;
    }
}
class Console extends ConsoleUtils {
    constructor(params) {
        super(params);
        this.params = params;
    }
    log(message, ...optional) {
        const __message = this._stringingToPrint(message);
        this._printStdOut(SrTools.colors('blue'), __message, ...optional);
    }
    send(message, ...optional) {
        const __message = this._stringingToPrint(message);
        this._printStdOut(SrTools.colors('blue'), __message, ...optional);
    }
    debug(message, ...optional) {
        const __message = this._stringingToPrint(message);
        this._printStdOut(SrTools.colors('cyan'), __message, ...optional);
    }
    warn(message, ...optional) {
        const __message = this._stringingToPrint(message);
        this._printStdErr(SrTools.colors('yellow'), __message, ...optional);
    }
    err(message, ...optional) {
        const __message = this._stringingToPrint(message);
        this._printStdErr(SrTools.colors('red'), __message, ...optional);
    }
    fatalE(message) {
        const __message = this._stringingToPrint(message);
        this._printStdErr(SrTools.colors('red'), __message);
    }
    success(message, ...optional) {
        const __message = this._stringingToPrint(message);
        this._printStdOut(SrTools.colors('green'), __message, ...optional);
    }
    dir(opt, message, ...optional) {
    }
    dirxml(opt, message, ...optional) {
    }
    group(message, ...optional) {
        const __message = this._stringingToPrint(message);
        this.groupTab++;
        this._printStdOut(SrTools.colors('magenta'), __message, ...optional);
    }
    groupEnd(message, ...optional) {
        const __message = this._stringingToPrint(message);
        if (this.groupTab !== 0)
            this.groupTab--;
        this._printStdOut(SrTools.colors('magenta'), __message, ...optional);
    }
    trace(message, ...optional) {
        const __message = this._stringingToPrint(message);
        this._printStdErr(SrTools.colors('red'), __message, ...optional);
    }
    assert(value, message, ...optional) {
        const __message = this._stringingToPrint(message);
        this._printStdOut(SrTools.colors('white'), __message, ...optional);
    }
    count(label) {
    }
    countReset(label) {
    }
    time(label) {
    }
    timeStamp(message, label, ...optional) {
    }
    timeEnd(label) {
    }
    table(args) {
    }
    exception(args) {
    }
}
export default Console;
