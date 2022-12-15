import SrPrint from "../lib/SrPrint";

export default class Processor {
    constructor(PRINT: SrPrint) {
        process.prependListener('SIGINT', signal => {
            PRINT.send("W", "El proceso", process.pid, "fue detenido de forma insegura, señal:", signal);
        });
        
        process.prependListener('SIGTERM', signal => {
            PRINT.send("S", `El proceso finalizo exitosamente`);
        });
        
        process.prependListener('uncaughtException', err => {
            LOG.fatalBack(err);
        })
        
        process.prependListener('unhandledRejection', (reason, promise) => {
            LOG.err("Ocurrio un error no capturado en", promise);
            if (reason instanceof Error) LOG.fatalBack(reason);
            else {
                LOG.err(reason);
                process.exit(0);
            }
        });
    }
}