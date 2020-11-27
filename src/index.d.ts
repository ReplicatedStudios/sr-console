declare module 'sr-console' {
    import fs from "fs";
    export class load {
        constructor(settings: Object);
        public createSocket(io: WebSocket): Boolean;
        public send(output?: any): this;
        public log(output?: any): this;
        public warn(output?: any): this;
        public err(output?: any): this;
        
        public fatalError(output?: Error): void;
        public success(output?: any): this;
    }

    export class timestamp {
        constructor();
        public timestring(...any: any[]): void;
    }
    
    // export function socketEmisor(io?: WebSocket) {

    // }
}