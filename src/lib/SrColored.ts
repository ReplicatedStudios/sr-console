export type SrColorType = "FORE" | "BACK";
export default class SrColored extends String {
    private static FOREGROUND_FORMAT = "\x1b[38;5;%auto%m"; // TEXTO
    private static BACKGROUND_FORMAT = "\x1b[48;5;%auto%m"; // FONDO
    
    public readonly background;
    public readonly foreground;
    constructor(id: string | number, mode?: "FORE" | "BACK") {
        super(`\x1b[${mode === "BACK" ? "48" : "38"};5;${id}m`);
        this.background = `\x1b[38;5;${id}m`;
        this.foreground = `\x1b[48;5;${id}m`
    }

    override toString(mode?: SrColorType): string {
        return mode === "BACK" ? this.background : this.foreground;
    }
}


export class iSrColoredList {
    public static instance = new this();


    public readonly RED: [{[key: SrColorType]: SrColored}] = [
        { FORE: new SrColored(52, "FORE")},
        
    ];
}