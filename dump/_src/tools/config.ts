import SrTime, {SrTimeMatch} from "./time.js";

export default class Config {
    readonly UNWORDS: string[] = [];
    readonly TIME: SrTimeMatch = SrTime.FORMAT_SHORT;
    readonly HTML5: boolean = false;
    readonly FILE = {
        // WARNING: NOT READONLY SENTENSEABLE
        ACTIVE: true,
        PATH: "/logs/",
        NAME: "app.txt"
    }

    constructor(u: string[], t: SrTimeMatch, h5: boolean, file: { ACTIVE: boolean, PATH: string, NAME: string }) {
        this.UNWORDS = u;
        this.TIME = t;
        this.HTML5 = h5;
        this.FILE = file;
    }
}