import {WriteStream} from "fs";
import {SrColorsMatch} from "./colors.js";
import Config from "./config.js";

export default class Print {
    readonly STD: "OUT" | "ERR";
    readonly CL: SrColorsMatch;
    readonly CG: Config;
    readonly VL: any[];
    readonly GL: 0 | 1 | 2; //0: neutral - 1: add - 2: remove
    readonly FSTR: WriteStream;

    constructor(std: "OUT" | "ERR", cl: SrColorsMatch, cg: Config, vl: any[], fstr: WriteStream, gl?: 0 | 1 | 2) {
        this.STD = std;
        this.CL = cl;
        this.VL = vl;
        this.CG = cg;
        this.FSTR = fstr;
        
        this.GL = gl ?? 0;
    }
}