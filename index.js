import Console from './src/index.js';

class SrConsole {
    constructor(options){ 
        this.options = options;
        this.ready = false;
    }

    global() {
        if (this.ready) return;
        global.consol = new Console(this.options);
        global.Consol = Console;
        this.ready = true;
    }

    globalize() {
        if (this.ready) return;
        global.console = new Console(this.options);
        global.Console = Console;
        this.ready = true;
    }

    dualGlobal() {
        if (this.ready) return;
        global.console = global.consol = new Console(this.options);
        global.Console = global.Consol = Console;
        this.ready = true;
    }
}

export default SrConsole;