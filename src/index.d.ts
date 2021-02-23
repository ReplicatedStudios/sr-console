/// <reference types="node" />
import { Socket } from "dgram";
import SocketIO from "socket.io";
interface Params {
    socket?: Socket | SocketIO.Server;
    filter?: Array<String>;
    dirname?: String;
    options?: {
        global: boolean;
        dated: {
            on: boolean;
            format: string;
        };
    };
}
export declare class ConsoleUtils {
    params?: Params;
    constructor(params?: Params);
    private _time?;
    private _stdout;
    private _stderr;
    private _stdin;
    protected _socketEmit(arg: string): void;
    protected _printStdOut(mode: string, args: Array<Object | Array<any> | String | Object | Number | Function | Boolean | Symbol | undefined>): void;
    protected _printStdErr(mode: string, args: Array<string> | Error): void;
    protected _makeTime(format: string): string;
}
export declare class Console extends ConsoleUtils {
    memory: Number;
    constructor(params?: Params);
    log(...args: any): void;
    send(...args: any): void;
    debug(...args: any): void;
    warn(...args: any): void;
    err(...args: any): void;
    fatalE(arg: Error): void;
    success(...args: any): void;
    dir(opt: Object, ...args: any): void;
    dirxml(opt: Object, ...args: any): void;
    group(...args: any): void;
    groupEnd(...args: any): void;
    trace(message: string, ...args: any): void;
    assert(value: any, message: string, args: any): void;
    count(label: string): void;
    countReset(label: string): void;
    time(label?: string): void;
    timeStamp(label?: string, ...args: any): void;
    timeEnd(label?: string): void;
    table(args: Object | Array<any>): void;
    exception(args: any): void;
    error: Function;
    successful: Function;
    ungroup: Function;
    grou$idcolorslapsed: Function;
    info: Function;
}
export {};
