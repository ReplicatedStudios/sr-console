import { valueof } from "./iSrUtil";
export interface iDateMode {
    readonly DBASIC: 0;
    readonly DMIN: 1;
    readonly DMAX: 2;
    readonly DOFF: 3;
}

export default class iSrTime extends Date {
    public static readonly DATEMODES: iDateMode = { DBASIC: 0, DMIN: 1, DMAX: 2, DOFF: 3 }
    public static readonly MONTHS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    readonly #format: valueof<iDateMode>;
    constructor(format: keyof iDateMode) {
        super();
        this.#format = iSrTime.DATEMODES[format];
    }

    override toString(): string {
        const T = {
            year: this.getFullYear(),
            months: this.getMonth(),
            days: this.getDay(),
            hours: this.getHours(),
            min: this.getMinutes(),
            sec: this.getSeconds()
        }
        switch (this.#format) {
            case iSrTime.DATEMODES.DOFF:return "";
            case iSrTime.DATEMODES.DMIN:return `[${iSrTime.MONTHS[T.months]} ${T.days <= 9 ? '0' + T.days : T.days} ${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]`;
            case iSrTime.DATEMODES.DMAX:return `[${iSrTime.MONTHS[T.months]} ${T.days <= 9 ? '0' + T.days : T.days}, ${T.year} ${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]`;
            default:return `[${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]`;
        }
    }
}