// @ts-nocheck
import SRCONSOLE, { ConsoleConfig } from './src/index.js';
import { TimeBuildMethods } from './src/tools/time.js';

class SrConsole {
    options: ConsoleConfig
    constructor(dirname: string, filter: Array<string>, time: keyof TimeBuildMethods){ 
        this.options = { dirname, filter, time };

        global.console = new SRCONSOLE(this.options);
        global.Console = SRCONSOLE;
    }
}

declare global {
    interface Console extends SRCONSOLE{};
}
export default SrConsole;