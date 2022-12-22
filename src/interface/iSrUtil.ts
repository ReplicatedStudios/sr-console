import { iSrColorsList } from "./iSrColors";

// BASIC
export type valueof<T> = T[keyof T];
export type iStd = "out" | "err";
export type counts = { [i: string]: number};

// COMPLEX UTIL
export interface PrintData {
    readonly std: iStd;
    readonly colors: string;
    readonly values: any[];
    readonly prefix: string;
}

export class PrintObject implements PrintData {
    public readonly std: iStd;
    public readonly colors: string;
    public readonly values: any[];
    public readonly prefix: string;
    constructor(std: iStd, prefix: string, colors: string, ...values: any[]) {
        this.std = std;
        this.colors = colors;
        this.values = values;
        this.prefix = `[${prefix}]`;
    }
}