import { iDateMode } from "./iSrTime";

export default interface iSrConfig {
    // CORE
    readonly FILTER: string[];
    readonly TIME: keyof iDateMode;
    readonly HTML5: boolean;
    // FILE CONFIG
    readonly FILE_DIR: string;
    readonly FILE_USE: boolean;
    readonly FILE_USE_RAW: boolean;
    readonly LOG_PREFIX: boolean;
}

// WIP
export class iSrModuleConfig {
    readonly FILTER: string[] = [];
    // TIME_FORMAT: keyof iDateMode;
    // USE_HTML5: boolean;

    // FILE_DIR: string;
    // FILE_USE: boolean;
    // FILE_USE_RAW: boolean;
    // LOG_PREFIX: boolean;

    // constructor() {
    //     this.TIME_FORMAT 
    // }

    public setFilter() {}
    public setTime() {}
    public setFileDir() {}
    public enableHTML5() {}
    public enableFile() {}
    public enableFileRaw() {}
    public enablePrefix() {}
}