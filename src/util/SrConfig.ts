import SrTime from "./SrTime.js";

export default class SrConfig {
    readonly FILTER: string[] = [];
    readonly TIME: 0|1|2|3 = SrTime.F_SHORT;
    readonly HTML5: boolean = false;
    readonly FILE = {
        ACTIVE: true,
        PATH: "/logs/",
        NAME: "console.txt"
    }

    constructor(u: string[], t: 0|1|2|3, h5: boolean, file: { ACTIVE: boolean, PATH: string, NAME: string }) {
        this.FILTER = u;
        this.TIME = t;
        this.HTML5 = h5;
        this.FILE = file;
    }
}