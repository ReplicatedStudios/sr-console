import "dotenv/config";
import SrConsole from './lib/console.js';
import { TimeMethod } from './tools/time.js';

const filter = process.env.SR_CONSOLE_FILTER?.split('|');
const time = process.env.SR_CONSOLE_TIME;
const logs = {
    active: process.env.SR_CONSOLE_LOG,
    path: '/'
};

const options = { filter, time, logs };
// @ts-expect-error
global.console = new SrConsole(options);
global.Console = SrConsole;

declare global {
    interface Console extends SrConsole {}
}

export default SrConsole;