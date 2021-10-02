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
export class ConsoleTime extends Date {
    localDays;
    localMonth;
    localYear;
    localHours;
    localMinutes;
    localSeconds;
    localMilliseconds;
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
    build(method) {
        switch (method) {
            case ('none'):
                return '';
                break;
            case ('full'):
                return `<${Months[this.localMonth]} ${this.localDays <= 9 ? '0' + this.localDays : this.localDays}, ${this.localYear}> [${this.localHours <= 9 ? '0' + this.localHours : this.localHours}:${this.localMinutes <= 9 ? '0' + this.localMinutes : this.localMinutes}:${this.localSeconds <= 9 ? '0' + this.localSeconds : this.localSeconds}.${this.localMilliseconds}]: `;
                break;
            case ('half'):
                return `<${Months[this.localMonth]} ${this.localDays <= 9 ? '0' + this.localDays : this.localDays}> [${this.localHours <= 9 ? '0' + this.localHours : this.localHours}:${this.localMinutes <= 9 ? '0' + this.localMinutes : this.localMinutes}:${this.localSeconds <= 9 ? '0' + this.localSeconds : this.localSeconds}]: `;
                break;
            case ('simple'):
            default:
                return `[${this.localHours <= 9 ? '0' + this.localHours : this.localHours}:${this.localMinutes <= 9 ? '0' + this.localMinutes : this.localMinutes}:${this.localSeconds <= 9 ? '0' + this.localSeconds : this.localSeconds}]: `;
                break;
        }
    }
}
const Time = ConsoleTime;
export default Time;
