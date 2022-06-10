import "dotenv/config";
import SrConsole from './lib/SrConsole.js';

const filter = process.env.SR_CONSOLE_FILTER?.split('|');
const time = process.env.SR_CONSOLE_TIME;
const logs = {
    active: process.env.SR_CONSOLE_LOG,
    path: '/'
};

const options = { filter, time, logs };
// @ts-expect-error
global.console = new SrConsole();
// @ts-expect-error
global.Console = SrConsole;

export default SrConsole;