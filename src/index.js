"use strict";
const colors = require('./colors.js');
const fs = require('fs');

class timestamp {
    constructor() {
        let _date = new Date();

        this.hours = _date.getHours();
        this.minutes = _date.getMinutes();
        this.seconds = _date.getSeconds();

        if (this.hours <= 9) this.hours = `0${this.hours}`;
        if (this.minutes <= 9) this.minutes = `0${this.minutes}`;
        if (this.seconds <= 9) this.seconds = `0${this.seconds}`;

        this.timestring = () => {
            return `${this.hours}:${this.minutes}:${this.seconds}`;
        }
    }
}

class srconsole {
    constructor(settings) {
        this.__params = {
            socket: undefined,
            filter: undefined,
            dirname: undefined,
            filestream: undefined
        }

        if (typeof settings === "object") {
            if (settings.dirname) {
                this.__params.filestream = fs.createWriteStream(`${settings.dirname}/log.txt`, { encoding: "utf-8" });
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

    loadConsole() {
        try { return fs.readFileSync(`${this.__params.dirname}/log.txt`, { encoding: "utf-8" }); } catch (e) { return new Error(`Ocurrio un error al cargar la consola`); }
    }

    clearConsole() {
        try { fs.writeFileSync(`${settingsthis.__params.dirname}`, ""); } catch (e) { /* Nothing */ }
    }



    //PARAMS
    send(...argumentus) {
        if (!this.__params.filter) return this.log(...argumentus);
        let textfiltered = consoleFilter(this.__params.filter, argumentus.join(' '));
        console.log(`${colors["blue"]}[${new timestamp().timestring()}]`, textfiltered, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%bl%[${new timestamp().timestring()}] ${textfiltered}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%bl%[${new timestamp().timestring()}] ${textfiltered}\n`);
        return this;
    }
    log(...argumentus) {
        console.log(`${colors["blue"]}[${new timestamp().timestring()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%bl%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%bl%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    debug(...argumentus) {
        console.log(`${colors["cyan"]}[${new timestamp().timestring()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%cy%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%cy%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    warn(...argumentus) {
        console.warn(`${colors["yellow"]}[${new timestamp().timestring()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%yl%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%yl%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    err(...argumentus) {
        console.error(`${colors["red"]}[${new timestamp().timestring()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%rd%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%rd%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    error(...argumentus) {
        console.error(`${colors["red"]}[${new timestamp().timestring()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%rd%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%rd%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    fatalError(...argumentus) {
        console.error(`${colors["yellow"] + colors["bg-red"]}[${new timestamp().timestring()}]`, ...argumentus, colors["reset"] + colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%y% %bgrd%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%y% %bgrd%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        process.exit(1);
    }
    success(...argumentus) {
        console.log(`${colors["green"]}[${new timestamp().timestring()}]`, ...argumentus, colors["reset"]);
        if (this.__params.filestream) this.__params.filestream.write(`%gn%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%gn%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    dir(argumentu, options) {
        console.dir(argumentu, options)
    }
    group(...argumentus) {
        console.group(`${colors["magenta"]}[${new timestamp().timestring()}]`, ...argumentus, colors["reset"]);
        if (this.__params.filestream) this.__params.filestream.write(`%mg%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%mg%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    groupEnd() {
        console.groupEnd();
        return this;
    }
    trace(...argumentus) {
        console.trace(`${colors["yellow"] + colors["bg-red"]}[${new timestamp().timestring()}]`, ...argumentus, colors["reset"] + colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%y% %bgrd%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%y% %bgrd%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
    }


    //DEPRECATED FUNCTIONS [SE ELIMINARAN EN LA VERSION FINAL]
    /**
     * @deprecated
     */
    groupCollapsed() {
        console.group(`${colors["magenta"]}[${new timestamp().timestring()}]`, ...argumentus, colors["reset"]);
        if (this.__params.filestream) this.__params.filestream.write(`%gn%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%gn%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        return this;
    }
    /**
     * @deprecated
     * @param  {...any} argumentus 
     */
    dirxml(...argumentus) {
        console.log(`${colors["blue"]}[${new timestamp().timestring()}]`, ...argumentus, colors["red"]);
        if (this.__params.filestream) this.__params.filestream.write(`%bl%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        if (this.__params.socket) socketEmisor(this.__params.socket, `%bl%[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
        return this;
    }
}

function consoleFilter(filter, value) {
    let result = value;
    for (let i = 0; i <= Object.keys(filter).length; i++) {
        result = result.replace(filter[i], "");
        if (i == Object.keys(filter).length) return result;
    }
}

function socketEmisor(io, value) {
    try {
        io.sockets.emit("console", value);
        return { status: true, err: null }
    } catch (e) {
        return { status: false, err: e };
    }
}

module.exports = srconsole;