"use strict";
const colors = require('./colors.js');
const colors_code = require('./colors-code.js');
const fs = require('fs');

class srconsole {
    constructor(settings) {
        this.__params = {
            socket: undefined,
            filter: undefined,
            dirname: undefined,
            filestream: undefined,
            tools: new tools()
        }

        if (typeof settings === "object") {
            if (settings.dirname) {
                this.__params.filestream = fs.createWriteStream(`${settings.dirname}/log.txt`, { flags: 'a', encoding: "utf-8" });
                this.__params.dirname = settings.dirname;
            }
            if (settings.filter) {
                this.__params.filter = settings.filter;
            }
        }
        

        //UNFINISHED FUNCTIONS
        this.memory = null;
        this.assert = console.assert;
        this.clear = console.clear;
        this.count = console.count;
        this.countReset = console.countReset;
        this.profile = console.profile;
        this.profileEnd = console.profileEnd;
        this.time = console.time;
        this.timeEnd = console.timeEnd;
        this.timeLog = console.timeLog;
        this.timeStamp = console.timeStamp;

        //Directly define
        this.table = console.table;
    }
    
    /**
     * @param {WebSocket} io
     * @description Solo funciona con la libreria de Socket.io
     */
    createSocket(io) {
        if (!io) return { status: false, err: new Error('El parametro "io" no esta definido') };
        this.__params.socket = io;
        return { status: true };
    }

    /**
     * @param {Boolean} mode Este parametro determina si el string tendra filtro de color o solo el codigo
     * @deprecated Esta funcion sera eliminada en la proxima version. Usar en su lugar loadLogs()
     */
    async loadConsole(mode) {
        if (this.__params.dirname) {
            if (mode) {
                fs.readFile(`${this.__params.dirname}/log.txt`, "utf-8", (err, data) => {
                    if (err) return '--- [ERROR] ---';
                    let result = data;
                    if (result === "") return '--- [VOID] ---';
                    for(let i = 0; i <= Object.keys(colors_code.name).length; i++) {
                        result = result.replace(colors_code.code[colors_code.name[i]], colors[colors_code.name[i]]);
                        if (i == Object.keys(colors_code.name).length) return result;
                    }
                });
            } else {
                let result;
                fs.readFile(`${this.__params.dirname}/log.txt`, "utf-8", (err, data) => {
                    if (err) return '--- [ERROR] ---'
                    result = data;
                    if (result === "") return '--- [VOID] ---';
                    return result;
                });
            }
        } else {
            return '--- [VOID] ---';
        }
    }

    /**
     * @param {String} type 
     * @param {Function} callback 
     */
    loadLogs(type, callback) {
        if (this.__params.dirname) {
            fs.readFile(`${this.__params.dirname}/log.txt`, "utf-8", (err, data) => {
                if (err) return '--- [ERROR] ---';
                switch(type) {
                    case('string'):
                    if (typeof callback === "function") {
                        callback(data.toString());
                        }
                        return data.toString();
                    break;
                    case('json'):
                        let arrlogs = data.trim().split(/\n+/gi);
                        let arrEnd = new Array();

                        for(const arr of arrlogs) {
                            let tempObject = new Object();
                            for(const _color of Object.keys(colors_code.code)) {
                                if (arr.includes(colors_code.code[_color])) {
                                    tempObject.color = tempObject.color || "" + colors_code.code[_color];
                                    tempObject.msg = arr.replace(new RegExp(colors_code.code[_color]), '');
                                }
                            }
                            arrEnd.push(tempObject);
                        }
                        if (typeof callback === "function") {
                            callback(arrEnd);
                        }
                        return arrEnd;
                    break;
                    default:
                        if (typeof callback === "function") {
                            callback(data.toString());
                            }
                            return data.toString();
                    break;
                }
            });
        }
    }

    clearConsole() {
        try { fs.writeFileSync(`${settingsthis.__params.dirname}`, ""); } catch (e) { /* Nothing */ }
    }



    //PARAMS
    send(...argumentus) {
        if (!this.__params.filter) return this.log(...argumentus);
        let textfiltered = this.__params.tools.filtrate(this.__params.filter, argumentus.join(' '));
        console.log(`${colors["blue"]}[${this.__params.tools.timestamp()}]`, textfiltered, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%bl%[${this.__params.tools.timestamp()}] ${textfiltered}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%bl%[${this.__params.tools.timestamp()}] ${textfiltered}\n`);
        return this;
    }
    log(...argumentus) {
        console.log(`${colors["blue"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%bl%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%bl%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    debug(...argumentus) {
        console.log(`${colors["cyan"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%cy%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%cy%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    warn(...argumentus) {
        console.warn(`${colors["yellow"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%yl%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%yl%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    err(...argumentus) {
        console.error(`${colors["red"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%rd%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%rd%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    error(...argumentus) {
        console.error(`${colors["red"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%rd%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%rd%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    fatalError(...argumentus) {
        console.error(`${colors["yellow"] + colors["bg-red"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["reset"] + colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%yl% %bgrd%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%yl% %bgrd%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        process.exit(1);
    }
    success(...argumentus) {
        console.log(`${colors["green"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["reset"]);
        if (this.__params.filestream) this.__params.filestream.write(`%gn%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%gn%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    dir(argumentu, options) {
        console.dir(argumentu, options)
    }
    group(...argumentus) {
        console.group(`${colors["magenta"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["reset"]);
        if (this.__params.filestream) this.__params.filestream.write(`%mg%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%mg%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    groupEnd() {
        console.groupEnd();
        return this;
    }
    trace(...argumentus) {
        console.trace(`${colors["yellow"] + colors["bg-red"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["reset"] + colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%y% %bgrd%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%y% %bgrd%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
    }


    //DEPRECATED FUNCTIONS [SE ELIMINARAN EN LA VERSION FINAL]
    /**
     * @deprecated
     */
    groupCollapsed() {
        console.group(`${colors["magenta"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["reset"]);
        if (this.__params.filestream) this.__params.filestream.write(`%gn%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%gn%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    /**
     * @deprecated
     * @param  {...any} argumentus 
     */
    dirxml(...argumentus) {
        console.log(`${colors["blue"]}[${this.__params.tools.timestamp()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%bl%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) this.__params.tools.socketEmit(this.__params.socket, `%bl%[${this.__params.tools.timestamp()}] ${argumentus.join(' ')}\n`);
        return this;
    }
}

class tools {
    constructor () {
        this.settings = null;
    }

    filtrate(filter, value) {
        let result = value, i;
        for (i = 0; i <= Object.keys(filter).length; i++) {
            result = result.replace(filter[i], "");
            if (i == Object.keys(filter).length) return result;
        }
    }
    socketEmit(io, value) {
        try {
            io.sockets.emit("console", value);
            return { status: true, err: null }
        } catch (e) {
            return { status: false, err: e };
        }
    }
    timestamp() {
        let _date = new Date();

        this.hours = _date.getHours();
        this.minutes = _date.getMinutes();
        this.seconds = _date.getSeconds();

        if (this.hours <= 9) this.hours = `0${this.hours}`;
        if (this.minutes <= 9) this.minutes = `0${this.minutes}`;
        if (this.seconds <= 9) this.seconds = `0${this.seconds}`;

        return `${this.hours}:${this.minutes}:${this.seconds}`;
    }
}

module.exports = srconsole;