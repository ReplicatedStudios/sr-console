import "dotenv/config";
import SrConsole from "./lib/SrConsole.js";
import iSrConfig from "./interface/iSrConfig.js";
import iSrTime, { iDateMode } from "./interface/iSrTime.js";
import SrPrint from "./lib/SrPrint.js";
import Processor from "./handlers/processor.js";

/**
SRCONSOLE_LIST_USE_FILTER=xxxxx-yyyyy|nigga

SRCONSOLE_MODE_TIME=DMAX

SRCONSOLE_FILE_DIR=./logs
SRCONSOLE_FILE_USE=false
SRCONSOLE_FILE_RAW_USE=false

SRCONSOLE_HTML5_USE=false
SRCONSOLE_PREFIX_USE=false
SRCONSOLE_OVERRIDE=true
*/

const env = process.env;
const override = env.SRCONSOLE_OVERRIDE;
const config: iSrConfig = {
    FILTER: env.SRCONSOLE_LIST_USE_FILTER ? env.SRCONSOLE_LIST_USE_FILTER.split('|') : [],
    TIME: <keyof iDateMode>env.SRCONSOLE_MODE_TIME ?? "DBASIC", // POR DEFECTO USA EL BASIC INCLUSO SI SE INGRESA MAL
    FILE_DIR: env.SRCONSOLE_FILE_DIR ?? "./logs/",
    FILE_USE: !(!env.SRCONSOLE_FILE_USE) || env.SRCONSOLE_FILE_USE === "true",
    FILE_USE_RAW: !(!env.SRCONSOLE_FILE_RAW_USE) || env.SRCONSOLE_FILE_RAW_USE === "true",
    HTML5: !(!env.SRCONSOLE_HTML5_USE) || env.SRCONSOLE_HTML5_USE === "true",
    LOG_PREFIX: !(!env.SRCONSOLE_PREFIX_USE),
};

declare global { 
    var LOG: SrConsole;
    var PRINT: SrPrint;
    interface Console extends SrConsole {}
}

global.LOG = new SrConsole(config);
globalThis.LOG = new SrConsole(config);

global.PRINT = LOG.defaultPrint;
globalThis.PRINT = LOG.defaultPrint;

// @ts-expect-error
if (!(override != undefined) || override) global.console = global.LOG;
// HANDLERS
new Processor(PRINT);

// @ts-expect-error
export = SrConsole;
export default SrConsole;