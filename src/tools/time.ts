export default class SrTime extends Date {
    public static FORMAT_DATE_BASIC: number = 0;
    public static FORMAT_DATE_SHORT: number = 1;
    public static FORMAT_DATE_LONG: number = 2;
    public static FORMAT_DATE_NONE: number = 3;
    public MONTHS: string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    private format: number;
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
            case SrTime.FORMAT_DATE_NONE: 
                return "";
            break;
            case SrTime.FORMAT_DATE_LONG:
                return `[${this.MONTHS[T.months]} ${T.days <= 9 ? '0' + T.days : T.days}, ${T.year}] [${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]: `;
            break;

            case SrTime.FORMAT_DATE_SHORT:
                return `[${this.MONTHS[T.months]} ${T.days <= 9 ? '0' + T.days : T.days}] [${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]: `;
            break;

            case SrTime.FORMAT_DATE_BASIC:
            default:
                return `[${T.hours <= 9 ? '0' + T.hours : T.hours}:${T.min <= 9 ? '0' + T.min : T.min}:${T.sec <= 9 ? '0' + T.sec : T.sec}]: `;
            break;
        }
    }
}

export interface SrTimeOpt {
    FORMAT_DATE_BASIC: number;
    FORMAT_DATE_SHORT: number;
    FORMAT_DATE_LONG: number;
    FORMAT_DATE_NONE: number;
}