import "dotenv/config";
import SrConsole from './lib/console.js';

const filter = process.env.SR_CONSOLE_FILTER?.split('|');
const time = process.env.SR_CONSOLE_TIME;
const logs = {
    active: process.env.SR_CONSOLE_LOG,
    path: '/'
};

const options = { filter, time, logs };
// @ts-expect-error
global.console = SrConsole;
// @ts-expect-error
global.Console = SrConsole;

declare global {
    interface Console extends SrConsole {}
}

export default SrConsole;