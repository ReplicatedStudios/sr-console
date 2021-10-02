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

export interface TimeBuildMethods {
    full: string;
    half: string;
    simple: string;
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
        this.localSeconds = this.getMinutes();
        this.localMilliseconds = this.getMilliseconds();
    }

    public build(method?: keyof TimeBuildMethods): string {
        switch (method) {
            case('none'):
                return ''
            break;
            case('full'):
                return `<${Months[this.localMonth]} ${this.localDays <= 9 ? '0' + this.localDays : this.localDays}, ${this.localYear}> [${this.localHours <= 9 ? '0' + this.localHours : this.localHours}:${this.localMinutes <= 9 ? '0' + this.localMinutes : this.localMinutes}:${this.localSeconds <= 9 ? '0' + this.localSeconds : this.localSeconds}.${this.localMilliseconds}]: `;
            break;

            case('half'):
                return `<${Months[this.localMonth]} ${this.localDays <= 9 ? '0' + this.localDays : this.localDays}> [${this.localHours <= 9 ? '0' + this.localHours : this.localHours}:${this.localMinutes <= 9 ? '0' + this.localMinutes : this.localMinutes}:${this.localSeconds <= 9 ? '0' + this.localSeconds : this.localSeconds}]: `;
            break;

            case('simple'):
            default:
                return `[${this.localHours <= 9 ? '0' + this.localHours : this.localHours}:${this.localMinutes <= 9 ? '0' + this.localMinutes : this.localMinutes}:${this.localSeconds <= 9 ? '0' + this.localSeconds : this.localSeconds}]: `;
            break;
        }

    }
}

const Time = ConsoleTime;

export default Time;