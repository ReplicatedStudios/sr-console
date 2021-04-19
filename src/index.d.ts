import SocketIO from 'socket.io';
interface Params {
    socket?: WebSocket | SocketIO.Server;
    filter?: Array<string>;
    dirname?: string;
    options?: {
        globalEnv?: boolean;
        dated?: {
            mode: 'prefix' | 'suffix';
            format: string;
        };
    };
}
declare class ConsoleUtils {
    options: Params;
    constructor(params?: Params);
    memory: number;
    protected groupTab: number;
    private _time;
    protected _printStdOut(firstMessage: string, ...optionalMessages: Array<string>): void;
    protected _printStdErr(firstMessage: string, ...optionalMessages: Array<string>): void;
    protected _processMemory(): void;
    protected _stringingToPrint(param: any): string;
    protected _objectToPrint(param: object | Array<any>): string;
    protected _makeADate(): string;
}
declare class Console extends ConsoleUtils {
    params?: Params;
    constructor(params?: Params);
    log(message: any, ...optional: Array<any>): void;
    send(message: any, ...optional: Array<any>): void;
    debug(message: any, ...optional: Array<string>): void;
    warn(message: any, ...optional: Array<string>): void;
    err(message: any, ...optional: Array<string>): void;
    fatalE(message: any): void;
    success(message: any, ...optional: any): void;
    dir(opt: Object, message: any, ...optional: any): void;
    dirxml(opt: Object, message: any, ...optional: any): void;
    group(message: any, ...optional: any): void;
    groupEnd(message: any, ...optional: any): void;
    trace(message: string, ...optional: any): void;
    assert(value: any, message: string, ...optional: any): void;
    count(label: string): void;
    countReset(label: string): void;
    time(label?: string): void;
    timeStamp(message: any, label?: string, ...optional: any): void;
    timeEnd(label?: string): void;
    table(args: Object | Array<any>): void;
    exception(args: any): void;
}
export default Console;
