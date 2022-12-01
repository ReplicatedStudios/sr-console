import "dotenv/config";
import SrConsole from "./lib/SrConsole.js";
import SrConsoleLib from "./lib/SrConsole.js";
import SrTime from "./util/SrTime.js";

interface Console extends SrConsoleLib {
    groupEnd(): void;
    groupEnd(message: string): void;
}

const env = process.env;

const unwords = env.SR_FILTER ? env.SR_FILTER?.split('|') : [];
const time = env.SR_TIME ? (typeof env.SR_TIME === "number" ? env.SR_TIME : SrTime.F_BASIC) : SrTime.F_BASIC;
const h5 = env.SR_HTML5 ? (typeof env.SR_HTML5 === "boolean" ? env.SR_HTML5 : false) : false
const logs = {
    ACTIVE: typeof env.SR_FILELOG === "boolean" ? env.SR_FILELOG : false,
    PATH: env.SR_FILEPATH ?? "/logs/",
    NAME: env.SR_FILENAME ?? "console.txt"
};


// @ts-expect-error
global.SrConsole = SrConsoleLib;
// @ts-expect-error
global.Console = SrConsoleLib;
// @ts-expect-error
global.console = new SrConsoleLib(new SrConsoleLib.SrConfig(unwords, time, h5, logs));

export default SrConsoleLib;