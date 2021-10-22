const Months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export interface TimeMethod {
    long: string;
    short: string;
    basic: string;
    none: null;
}

export class ConsoleTime extends Date {
    localDays: number;
    localMonth: number;
    localYear: number;
    localHours: number;
    localMinutes: number;
    localSeconds: number;
    localMilliseconds: number;
    constructor() {
        super();

        this.localDays = this.getDay();
        this.localMonth = this.getMonth();
        this.localYear = this.getFullYear();
        
        this.localHours = this.getHours();
        this.localMinutes = this.getMinutes();
        this.localSeconds = this.getSeconds();
        this.localMilliseconds = this.getMilliseconds();
    }

    public build(method?: keyof TimeMethod): string {
        switch (method) {
            case('none'):
                return ''
            break;
            case('long'):
                return `<${Months[this.localMonth]} ${this.localDays <= 9 ? '0' + this.localDays : this.localDays}, ${this.localYear}> [${this.localHours <= 9 ? '0' + this.localHours : this.localHours}:${this.localMinutes <= 9 ? '0' + this.localMinutes : this.localMinutes}:${this.localSeconds <= 9 ? '0' + this.localSeconds : this.localSeconds}.${this.localMilliseconds}]: `;
            break;

            case('short'):
                return `<${Months[this.localMonth]} ${this.localDays <= 9 ? '0' + this.localDays : this.localDays}> [${this.localHours <= 9 ? '0' + this.localHours : this.localHours}:${this.localMinutes <= 9 ? '0' + this.localMinutes : this.localMinutes}:${this.localSeconds <= 9 ? '0' + this.localSeconds : this.localSeconds}]: `;
            break;

            case('basic'):
            default:
                return `[${this.localHours <= 9 ? '0' + this.localHours : this.localHours}:${this.localMinutes <= 9 ? '0' + this.localMinutes : this.localMinutes}:${this.localSeconds <= 9 ? '0' + this.localSeconds : this.localSeconds}]: `;
            break;
        }

    }
}

const Time = ConsoleTime;

export default Time;