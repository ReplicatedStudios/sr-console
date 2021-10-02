import { createWriteStream } from "fs";
import Colors from "./tools/colors.js";
import Time from "./tools/time.js";
import { stderr, stdin, stdout } from 'process';
class ConsoleUtil {
    config;
    _fileStream;
    constructor(config) {
        this.config = !config ? {} : config;
        this._fileStream = this.config.dirname ? createWriteStream(this.config.dirname + '/logs.txt', 'utf-8') : undefined;
    }
    memory = 0;
    _groups = 0;
    _counts = new Object({ index: 0 });
    stdOut = stdout;
    stdErr = stderr;
    stdIn = stdin;
    _readMemory() {
        this.memory = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
        return;
    }
    _resolveTypeOfColor(values, color, method) {
        if (method === 'normal') {
            let resolvedString = '';
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
                }
                catch (e) {
                    resolvedString += e;
                }
            });
            return resolvedString;
        }
        else {
            let resolvedString = '';
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
                }
                catch (e) {
                    resolvedString += e;
                }
            });
            return resolvedString;
        }
        ;
    }
    _sendToSockets(method, msg) {
        this.config.socketIO?.emit(`console:${method}`, msg);
        this.config.websocket?.send(msg);
    }
    async _printToConsole(color, std, message, optMessage) {
        let spaceGroups = ``;
        let i = 0;
        while (this._groups > i) {
            spaceGroups += `  `;
            i++;
        }
        const msg = `${spaceGroups}${new Time().build(this.config.time)}${message} `;
        std === 'err' && (this.stdErr.write(Colors[color] + msg + this._resolveTypeOfColor(optMessage, color, 'normal') + '\n' + Colors.reset));
        std === 'in' && (this.stdIn.write(Colors[color] + msg + this._resolveTypeOfColor(optMessage, color, 'normal') + '\n' + Colors.reset));
        std === 'out' && (this.stdOut.write(Colors[color] + msg + this._resolveTypeOfColor(optMessage, color, 'normal') + '\n' + Colors.reset));
        this._sendToSockets(std, Colors.Filtered[color] + msg + this._resolveTypeOfColor(optMessage, color, 'filtered') + Colors.Filtered.reset);
        this._fileStream?.write(Colors.Filtered[color] + msg + this._resolveTypeOfColor(optMessage, color, 'filtered') + '\n' + Colors.Filtered.reset);
        this._readMemory();
    }
}
export class Console extends ConsoleUtil {
    constructor(config) {
        super(config);
    }
    log(msg, ...optMessage) {
        this._printToConsole('blue', 'out', msg, optMessage);
    }
    send(msg, ...optMessage) {
        let messageFiltered = msg;
        if (this.config.filter) {
            this.config.filter.forEach((word, i, arr) => {
                messageFiltered.replace(new RegExp(word, 'gi'), ' ');
            });
        }
        this._printToConsole('blue', 'out', msg, optMessage);
    }
    warn(msg, ...optMessage) {
        this._printToConsole('yellow', 'err', msg, optMessage);
    }
    debug(msg, ...optMessage) {
        this._printToConsole('cyan', 'out', msg, optMessage);
    }
    info(msg, ...optMessage) {
        this._printToConsole('cyan', 'out', msg, optMessage);
    }
    error(msg, ...optMessage) {
        this._printToConsole('red', 'err', msg, optMessage);
    }
    assert(msg, ...optMessage) {
        this._printToConsole('white', 'err', msg, optMessage);
    }
    clear() {
        this._printToConsole('reset', 'out', '\n\n\n\n\n\n\n\n\n\n\n\n\n', []);
    }
    group(msg, ...optMessage) {
        this._printToConsole('magenta', 'out', msg, optMessage);
        this._groups++;
    }
    groupEnd(msg, ...optMessage) {
        if (this._groups !== 0)
            this._groups--;
        this._printToConsole('magenta', 'out', msg, optMessage);
    }
    groupCollapsed(msg, ...optMessage) {
        if (this._groups !== 0)
            this._groups--;
        this._printToConsole('magenta', 'out', msg, optMessage);
    }
    count() {
    }
    countReset() {
    }
    dir() {
    }
    dirxml() {
    }
    table() {
    }
    time() {
    }
    timeEnd() {
    }
    timeLog() {
    }
    timeStamp() {
    }
    trace() {
    }
    profile() {
    }
    profileEnd() {
    }
    Console = Console;
}
export default Console;
