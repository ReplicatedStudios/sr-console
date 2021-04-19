export = srconsole;
declare class srconsole {
    constructor(settings: any);
    __params: {
        socket: undefined;
        filter: undefined;
        dirname: undefined;
        filestream: undefined;
        tools: tools;
    };
    memory: any;
    assert: {
        (condition?: boolean | undefined, ...data: any[]): void;
        (value: any, message?: string | undefined, ...optionalParams: any[]): void;
    };
    clear: {
        (): void;
        (): void;
    };
    count: {
        (label?: string | undefined): void;
        (label?: string | undefined): void;
    };
    countReset: {
        (label?: string | undefined): void;
        (label?: string | undefined): void;
    };
    profile: (label?: string | undefined) => void;
    profileEnd: (label?: string | undefined) => void;
    time: {
        (label?: string | undefined): void;
        (label?: string | undefined): void;
    };
    timeEnd: {
        (label?: string | undefined): void;
        (label?: string | undefined): void;
    };
    timeLog: {
        (label?: string | undefined, ...data: any[]): void;
        (label?: string | undefined, ...data: any[]): void;
    };
    timeStamp: {
        (label?: string | undefined): void;
        (label?: string | undefined): void;
    };
    table: {
        (tabularData?: any, properties?: string[] | undefined): void;
        (tabularData: any, properties?: readonly string[] | undefined): void;
    };
    createSocket(io: WebSocket): {
        status: boolean;
        err: Error;
    } | {
        status: boolean;
        err?: undefined;
    };
    loadConsole(mode: boolean): Promise<"--- [VOID] ---" | undefined>;
    loadLogs(type: string, callback: Function): void;
    clearConsole(): void;
    send(...argumentus: any[]): srconsole;
    log(...argumentus: any[]): srconsole;
    debug(...argumentus: any[]): srconsole;
    warn(...argumentus: any[]): srconsole;
    err(...argumentus: any[]): srconsole;
    error(...argumentus: any[]): srconsole;
    fatalError(...argumentus: any[]): void;
    success(...argumentus: any[]): srconsole;
    dir(argumentu: any, options: any): void;
    group(...argumentus: any[]): srconsole;
    groupEnd(): srconsole;
    trace(...argumentus: any[]): void;
    groupCollapsed(): srconsole;
    dirxml(...argumentus: any[]): srconsole;
}
declare class tools {
    settings: any;
    filtrate(filter: any, value: any): any;
    socketEmit(io: any, value: any): {
        status: boolean;
        err: any;
    };
    timestamp(): string;
    hours: any;
    minutes: any;
    seconds: any;
}
//# sourceMappingURL=index.d.ts.map