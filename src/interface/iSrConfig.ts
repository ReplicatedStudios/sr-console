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
    constructor() {

    }

    public setFilter() {}
    public setTime() {}
    public enableHTML5() {}
    public setFileDir() {}
    public enableFile() {}
    public enableFileRaw() {}
    public enablePrefix() {}
}