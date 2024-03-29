import "dotenv/config";
import SrConsole from "./lib/SrConsole.js";
import iSrConfig from "./interface/iSrConfig.js";
import { iDateMode } from "./interface/iSrTime.js";
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
    FILE_USE: env.SRCONSOLE_FILE_USE === "true",
    FILE_USE_RAW: env.SRCONSOLE_HTML5_USE === "true",
    HTML5: env.SRCONSOLE_HTML5_USE === "true",
    LOG_PREFIX: env.SRCONSOLE_PREFIX_USE === "true",
};

declare global { 
    var LOG: SrConsole;
    var PRINT: SrPrint;
    interface Console extends SrConsole {}
}


globalThis.LOG = global.LOG = new SrConsole(process.stdout, process.stderr, true, config);
global.PRINT = globalThis.PRINT = LOG.defaultPrint;

// @ts-expect-error
if (!override || override === "" || override === "true" || override !== "false") global.console = global.LOG;
// HANDLERS EXPERIMENTALES
if (env.SRCONSOLE_EXPERIMENTALS === "true") new Processor(PRINT);

// @ts-expect-error
export = SrConsole;
export default SrConsole;