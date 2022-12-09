export type iDateDisplay = 0 | 1 | 2 | 3;
export default class iSrTime extends Date {
    public static readonly D_CLASSIC: iDateDisplay = 0;
    public static readonly D_MIN: iDateDisplay = 1;
    public static readonly D_MAX: iDateDisplay = 2;
    public static readonly D_OFF: iDateDisplay = 3;
    public static readonly MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    readonly #format: iDateDisplay;
    constructor(format: iDateDisplay) {
        super();
        this.#format = format;
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
            case iSrTime.D_OFF:return "";
            case iSrTime.D_MIN:return `[${iSrTime.MONTHS[T.months]} ${T.days <= 9 ? '0' + T.days : T.days}] [${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]`;
            case iSrTime.D_MAX:return `[${iSrTime.MONTHS[T.months]} ${T.days <= 9 ? '0' + T.days : T.days}, ${T.year}] [${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]`;
            default:return `[${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]`;
        }
    }
}