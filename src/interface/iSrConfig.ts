import { iDateMode } from "./iSrTime";

export default interface iSrConfig {
    // CORE
    readonly FILTER: string[];
    readonly TIME: keyof iDateMode;
    readonly HTML5: boolean;
    // FILE CONFIG
    readonly FILE: string;
    readonly FILE_USE: boolean;
    readonly FILE_USE_RAW: boolean;
    readonly LOG_PREFIX: boolean;
}