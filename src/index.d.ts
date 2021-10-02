/// <reference types="node" />
import { WriteStream } from "fs";
import { ConsoleFilteredColors } from "./tools/colors.js";
import { TimeBuildMethods } from "./tools/time.js";
import SocketIO from "socket.io";
export interface ConsoleConfig {
    dirname?: string;
    filter?: Array<string>;
    time?: keyof TimeBuildMethods;
    socketIO?: SocketIO.Server;
    websocket?: WebSocket;
}
declare class ConsoleUtil {
    config: ConsoleConfig;
    _fileStream?: WriteStream;
    constructor(config?: ConsoleConfig);
    memory: number;
    protected _groups: number;
    protected _counts: object;
    protected stdOut: NodeJS.WriteStream & {
        fd: 1;
    };
    protected stdErr: NodeJS.WriteStream & {
        fd: 2;
    };
    protected stdIn: NodeJS.ReadStream & {
        fd: 0;
    };
    protected _readMemory(): void;
    protected _resolveTypeOfColor(values: any[], color: keyof ConsoleFilteredColors, method: 'normal' | 'filtered'): string;
    protected _sendToSockets(method: 'in' | 'out' | 'err', msg: string): void;
    protected _printToConsole(color: keyof ConsoleFilteredColors, std: 'in' | 'out' | 'err', message: any, optMessage: any[]): Promise<void>;
}
export declare class Console extends ConsoleUtil {
    constructor(config?: ConsoleConfig);
    log(msg: any, ...optMessage: any[]): void;
    send(msg: any, ...optMessage: any[]): void;
    warn(msg: any, ...optMessage: any[]): void;
    debug(msg: any, ...optMessage: any[]): void;
    info(msg: any, ...optMessage: any[]): void;
    error(msg: any, ...optMessage: any[]): void;
    assert(msg: any, ...optMessage: any[]): void;
    clear(): void;
    group(msg: any, ...optMessage: any[]): void;
    groupEnd(msg: any, ...optMessage: any[]): void;
    groupCollapsed(msg: any, ...optMessage: any[]): void;
    count(): void;
    countReset(): void;
    dir(): void;
    dirxml(): void;
    table(): void;
    time(): void;
    timeEnd(): void;
    timeLog(): void;
    timeStamp(): void;
    trace(): void;
    profile(): void;
    profileEnd(): void;
    Console: typeof Console;
}
export default Console;
