import "dotenv/config";
import SrConsole from "./lib/SrConsole.js";
import iSrConfig from "./interface/iSrConfig.js";
import iSrTime from "./interface/iSrTime.js";
import SrPrint from "./lib/SrPrint.js";
import Processor from "./handlers/processor.js";

/**
 * SRCONSOLE_EXPLICIT_OVERRIDE_CONSOLE=true
 * SRCONSOLE_USE_HTML5=false
 * SRCONSOLE_USE_FILE=false
 * SRCONSOLE_DIR_FILE=./logs/lastest.log
 * SRCONSOLE_LIST_USE_FILTER=words|censored
 * SRCONSOLE_MODE_TIME=D_MIN #D_MAX - D_OFF - D_CLASSIC
*/

const env = process.env;
const override = env.SRCONSOLE_EXPLICIT_OVERRIDE_CONSOLE;
const config: iSrConfig = {
    FILTER: env.SRCONSOLE_LIST_USE_FILTER ? env.SRCONSOLE_LIST_USE_FILTER.split('|') : [],
    TIME: env.SRCONSOLE_MODE_TIME ? (typeof env.SRCONSOLE_MODE_TIME === "number" ? env.SRCONSOLE_MODE_TIME : iSrTime.D_CLASSIC) : iSrTime.D_CLASSIC,
    HTML5: !(!env.SRCONSOLE_USE_HTML5) || env.SRCONSOLE_USE_HTML5 === "true",
    FILE_USE: !(!env.SRCONSOLE_USE_FILE) || env.SRCONSOLE_USE_FILE === "true",
    FILE_USE_RAW: !(!env.SRCONSOLE_USE_FILE_RAW) || env.SRCONSOLE_USE_FILE_RAW === "true",
    FILE: env.SRCONSOLE_DIR_FILE ?? "./lastest.log",
    LOG_PREFIX: !(!env.SRCONSOLE_USE_PREFIX),
};

declare global { 
    var LOG: SrConsole;
    var PRINT: SrPrint;
}

global.LOG = new SrConsole(config);
globalThis.LOG = new SrConsole(config);

global.PRINT = LOG.defaultPrint;
globalThis.PRINT = LOG.defaultPrint;

// @ts-expect-error
if (!(override != undefined) || override) global.console = global.LOG;
interface Console extends SrConsole {};

// HANDLERS
new Processor(PRINT);

// @ts-expect-error
export = SrConsole;
export default SrConsole;