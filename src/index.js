import { Colors } from './colors.js';
const $idcolors = new Colors();
export class ConsoleUtils {
    constructor(params) {
        this._time = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        this._stdout = process.stdout;
        this._stderr = process.stderr;
        this._stdin = process.stdin;
        this.params = params;
    }
    _socketEmit(arg) {
    }
    _printStdOut(mode, args) {
        const doPrint = new Array();
        for (const arg of args) {
            const typearg = typeof arg;
            if (!arg)
                doPrint.push($idcolors.black + $idcolors.bright + 'undefined' + $idcolors.reset);
            else if (typearg === 'bigint') {
                doPrint.push($idcolors.yellow + arg.toString());
            }
            else if (typearg === 'boolean') {
                doPrint.push($idcolors.green + arg.toString());
            }
            else if (typearg === 'function') {
                doPrint.push($idcolors.blue + arg.toString());
            }
            else if (typearg === 'number') {
                doPrint.push($idcolors.yellow + arg.toString());
            }
            else if (typearg === 'object') {
                doPrint.push(JSON.stringify(arg));
            }
            else if (typearg === 'string') {
                if (mode === 'log') {
                    doPrint.push($idcolors.cyan + arg.toString());
                }
                else if (mode === 'debug') {
                    doPrint.push($idcolors.blue + arg.toString());
                }
                else if (mode === 'sucess') {
                    doPrint.push($idcolors.green + arg.toString());
                }
                else if (mode === 'group') {
                    doPrint.push($idcolors.magenta + arg.toString());
                }
            }
            else if (typearg === 'symbol') {
                doPrint.push($idcolors.white + arg.toString());
            }
            else {
                doPrint.push($idcolors.cyan + arg.toString());
            }
        }
        this._stdout.write(doPrint.join(' ') + $idcolors.reset + '\n', (err) => {
            if (err)
                throw err;
        });
    }
    _printStdErr(mode, args) {
        if (Array.isArray(args)) {
            this._stderr.write(args.join(' ') + '\n', (err) => {
                if (err)
                    throw err;
            });
        }
        else {
            this._stderr.write(args + '\n', (err) => {
                if (err)
                    throw err;
            });
        }
    }
    _makeTime(format) {
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
export class Console extends ConsoleUtils {
    constructor(params) {
        super(params);
        this.error = this.err;
        this.successful = this.success;
        this.ungroup = this.groupEnd;
        this.grou$idcolorslapsed = this.groupEnd;
        this.info = this.log;
        this.memory = 0;
        this.params = params;
    }
    log(...args) {
        const $args = args;
        if (this.params?.options?.dated.on) {
            $args.unshift(this._makeTime(this.params.options.dated.format));
        }
        this._printStdOut('log', args);
    }
    send(...args) {
        this._printStdOut('log', args);
    }
    debug(...args) {
        this._printStdOut('debug', args);
    }
    warn(...args) {
        this._printStdErr('warn', args);
    }
    err(...args) {
        this._printStdErr('err', args);
    }
    fatalE(arg) {
        this._printStdErr('ferr', arg);
    }
    success(...args) {
    }
    dir(opt, ...args) {
    }
    dirxml(opt, ...args) {
    }
    group(...args) {
    }
    groupEnd(...args) {
    }
    trace(message, ...args) {
    }
    assert(value, message, args) {
    }
    count(label) {
    }
    countReset(label) {
    }
    time(label) {
    }
    timeStamp(label, ...args) {
    }
    timeEnd(label) {
    }
    table(args) {
    }
    exception(args) {
    }
}
