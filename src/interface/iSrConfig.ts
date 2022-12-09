import { iDateDisplay } from "./iSrTime";

export default interface iSrConfig {
    // CORE
    readonly FILTER: string[];
    readonly TIME: iDateDisplay;
    readonly HTML5: boolean;
    // FILE CONFIG
    readonly FILE_USE: boolean;
    readonly FILE_USE_RAW: boolean;
    readonly FILE: string;
    readonly LOG_PREFIX: boolean;
}