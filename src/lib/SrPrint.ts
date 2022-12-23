export type iSrPrintOptions = "L" | "W" | "E" | "D" | "G" | "U" | "S" | "I";
export default class SrPrint {
    private prefix;
    private rawPrefix;
    constructor(prefix: string) {
        this.prefix = `[${prefix}]`.toUpperCase();
        this.rawPrefix = prefix.toUpperCase();
    }

    /**
     * Opciones de loggeo disponibles
     * L: Logger
     * W: Warning
     * E: Error (no fatal)
     * D: Debugger
     * G: Grouping
     * U: Ungrouping
     * S: Successfull
     * I: Information
    */
    public send(option: iSrPrintOptions, ...messages: any[]) {
        switch(option) {
            case "L": return LOG.send(this.prefix, ...messages);
            case "W": return LOG.warn(this.prefix, ...messages);
            case "E": return LOG.error(this.prefix, ...messages);
            case "D": return LOG.debug(this.prefix, ...messages);
            case "G": return LOG.group(this.prefix, ...messages);
            case "U": return LOG.unGroup(this.prefix + " " + messages.join(" "));
            case "S": return LOG.success(this.prefix, ...messages);
            case "I": return LOG.info(this.prefix, ...messages);
            default: throw new Error("Destino del printer invalido"); //SOLO JS
        }
    }

    public subPrinter(prefix: string) { return new SrPrint(`${this.rawPrefix}/${prefix}`); }
}