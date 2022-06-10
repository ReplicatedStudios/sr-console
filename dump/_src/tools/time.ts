export default class SrTime extends Date {
    public static readonly FORMAT_BASIC = 0;
    public static readonly FORMAT_SHORT = 1;
    public static readonly FORMAT_LONG= 2;
    public static readonly FORMAT_NONE = 3;
    public static readonly MONTHS: string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    private readonly format: number;
    constructor(format: number) {
        super();
        this.format = format;
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
        switch (this.format) {
            case SrTime.FORMAT_NONE:return "";
            case SrTime.FORMAT_LONG:return `[${SrTime.MONTHS[T.months]} ${T.days <= 9 ? '0' + T.days : T.days}, ${T.year}] [${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]: `;
            case SrTime.FORMAT_SHORT:return `[${SrTime.MONTHS[T.months]} ${T.days <= 9 ? '0' + T.days : T.days}] [${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]: `;
            default:return `[${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]: `;
        }
    }
}

export type SrTimeMatch = 0 | 1 | 2 | 3;