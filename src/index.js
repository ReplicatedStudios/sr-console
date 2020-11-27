"use strict";
const colors = require('./colors.js');
const fs = require('fs');

class timestamp {
    constructor () {
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

class load {
    constructor(settings) {
        if (settings) {
            if (settings.dirname) this.filelog = fs.createWriteStream(`${settings.dirname}/log.txt`, { flags: 'a'});
            try { this.filter = settings.filter; } catch (e) { this.filter = undefined; }
            // try { this.socket = settings.io;} catch (e) { this.socket = undefined; }
        }


        this.socket = undefined;
        this.memory = console.memory;
        this.createSocket = (io) => {
            if (!io) return false; 
            this.socket = io;
            return true;
        }
        this.send = (...argumentus) => {
            if (!settings && !this.filter) return this.fatalError('NO PUEDES EJECUTAR .send() SIN ESTABLECER PARAMETROS A FILTRAR')
            let textfiltered = consoleFilter(settings.filter, argumentus.join(' '));
            console.log(`${colors["blue"]}[${new timestamp().timestring()}]`, textfiltered, colors["red"]);
            if (this.filelog) this.filelog.write(`b[${new timestamp().timestring()}] ${textfiltered}\n`);
            if (this.socket) socketEmisor(this.socket);
            
            return this;
        }
        this.log = (...argumentus) => {
            console.log(`${colors["blue"]}[${new timestamp().timestring()}]`, ...argumentus, colors["red"]);
            if (this.filelog) this.filelog.write(`b[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
            if (this.socket) socketEmisor(this.socket);
            return this;
        }
        this.warn = (...argumentus) => {
            console.warn(`${colors["yellow"]}[${new timestamp().timestring()}]`, ...argumentus, colors["red"]);
            if (this.filelog) this.filelog.write(`y[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
            if (this.socket) socketEmisor(this.socket);
            return this;
        }    
        this.err = (...argumentus) => {
            console.error(`${colors["red"]}[${new timestamp().timestring()}]`, ...argumentus, colors["red"]);
            if (this.filelog) this.filelog.write(`r[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
            if (this.socket) socketEmisor(this.socket);
            return this;
        }
        this.error = this.err;
        this.fatalError = (...argumentus) => {
            console.error(`${colors["yellow"] + colors["bg-red"]}[${new timestamp().timestring()}]`, ...argumentus, colors["reset"] + colors["red"]);
            if (this.filelog) this.filelog.write(`y bgr[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
            if (this.socket) socketEmisor(this.socket);
            process.exit(1);
        }
        this.success = (...argumentus) => {
            console.log(`${colors["green"]}[${new timestamp().timestring()}]`, ...argumentus, colors["reset"]);
            if (this.filelog) this.filelog.write(`g[${new timestamp().timestring()}] ${argumentus.join(' ')}\n`);
            if (this.socket) socketEmisor(this.socket);
            return this;
        }

        this.assert = console.assert;
        this.clear = console.clear;
        this.count = console.count;
        this.countReset = console.countReset;
        this.debug = console.debug;
        this.dir = console.dir;
        this.dirxml = console.dirxml;
        this.group = console.group;
        this.groupCollapsed = console.groupCollapsed;
        this.groupEnd = console.groupEnd;
        this.profile = console.profile;
        this.profileEnd = console.profileEnd;
        this.table = console.table;
        this.time = console.time;
        this.timeEnd = console.timeEnd;
        this.timeLog = console.timeLog;
        this.timeStamp = console.timeStamp;
        this.trace = console.trace;
    }
}

function consoleFilter(filter, value) {
    let result = value;
    for(let i = 0; i <= Object.keys(filter).length; i++) {
      result = result.replace(filter[i], "");
  
      if (i == Object.keys(filter).length) return result;
    }
  }

function socketEmisor(io) {
    try {
        io.sockets.emit("console" , value);
    } catch (e) {
        throw new Error('Algo salio mal al intentar emitir un Websocket').stack;
    }
}

module.exports = {
    load: load,
    timestamp: timestamp
}