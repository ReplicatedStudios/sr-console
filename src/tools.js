class SrVariables {
    stdColors() {
        return {
            black: "\x1b[30m",
            red: "\x1b[31m",
            green: "\x1b[32",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m",
            bg_black: "\x1b[40m",
            bg_red: "\x1b[41m",
            bg_green: "\x1b[42m",
            bg_yellow: "\x1b[43m",
            bg_blue: "\x1b[44m",
            bg_magenta: "\x1b[45m",
            bg_cyan: "\x1b[46m",
            bg_white: "\x1b[47m",
            reset: "\x1b[0m",
            bright: "\x1b[1m",
            dim: "\x1b[2m",
            underscore: "\x1b[4m",
            blink: "\x1b[5m",
            reserve: "\x1b[7m",
            hidden: "\x1b[8m",
            strikethrough: "\x1b[9m",
        };
    }
    stdFilter() {
        return {
            black: "%bk%",
            red: "%rd%",
            green: "%gn%",
            yellow: "%yl%",
            blue: "%bl%",
            magenta: "%mg%",
            cyan: "%cy%",
            white: "%wt%",
            bg_black: "%bgbk%",
            bg_red: "%bgrd%",
            bg_green: "%bggn%",
            bg_yellow: "%bgyl%",
            bg_blue: "%bgbl%",
            bg_magenta: "%bgmg%",
            bg_cyan: "%bgcy%",
            bg_white: "%bgwt%",
            reset: "%reset%",
            bright: "%bright%",
            dim: "%dim%",
            underscore: "%underscore%",
            blink: "%blink%",
            reserve: "%reserve%",
            hidden: "%hidden%",
            strikethrough: "%strikethrougt%",
        };
    }
}
class SrConsoleTools {
    constructor() {
        this._time = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }
    colors(param) {
        const stdColors = new SrVariables().stdColors();
        for (let i = 0; i < Object.keys(stdColors).length; i++) {
            const key = Object.keys(stdColors)[i];
            const value = Object.values(stdColors)[i];
            if (param === key)
                return value;
            else if (i == Object.keys(stdColors).length - 1)
                return stdColors['reset'];
        }
        return stdColors['reset'];
    }
    time() {
        let _date = new Date();
        if (typeof this._time !== 'object')
            return `[ERR:ERR:ERR]`;
        this._time.hours = _date.getHours();
        this._time.minutes = _date.getMinutes();
        this._time.seconds = _date.getSeconds();
        if (this._time.hours <= 9)
            this._time.hours = `0${this._time.hours}`;
        if (this._time.minutes <= 9)
            this._time.minutes = `0${this._time.minutes}`;
        if (this._time.seconds <= 9)
            this._time.seconds = `0${this._time.seconds}`;
        return `[${this._time.hours}:${this._time.minutes}:${this._time.seconds}]`;
    }
}
export { SrConsoleTools };
