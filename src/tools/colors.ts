export class ConsoleFilteredColors {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    bg_black: string;
    bg_red: string;
    bg_green: string;
    bg_yellow: string;
    bg_blue: string;
    bg_magenta: string;
    bg_cyan: string;
    bg_white: string;
    reset: string;
    bright: string;
    dim: string;
    underscore: string;
    blink: string;
    reserve: string;
    hidden: string;
    strikethrough: string;
    constructor() {
        this.black = "%bk%";
        this.red = "%rd%";
        this.green ="%gn%";
        this.yellow = "%yl%";
        this.blue = "%bl%";
        this.magenta = "%mg%";
        this.cyan = "%cy%";
        this.white = "%wt%";
        this.bg_black = "%bgbk%";
        this.bg_red = "%bgrd%";
        this.bg_green = "%bggn%";
        this.bg_yellow = "%bgyl%";
        this.bg_blue = "%bgbl%";
        this.bg_magenta = "%bgmg%";
        this.bg_cyan = "%bgcy%";
        this.bg_white = "%bgwt%";
        this.reset ="%reset%";
        this.bright ="%bright%";
        this.dim ="%dim%";
        this.underscore ="%underscore%";
        this.blink ="%blink%";
        this.reserve ="%reserve%";
        this.hidden ="%hidden%";
        this.strikethrough ="%strikethrougt%";
    }
}

export class ConsoleColors extends ConsoleFilteredColors {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    bg_black: string;
    bg_red: string;
    bg_green: string;
    bg_yellow: string;
    bg_blue: string;
    bg_magenta: string;
    bg_cyan: string;
    bg_white: string;
    reset: string;
    bright: string;
    dim: string;
    underscore: string;
    blink: string;
    reserve: string;
    hidden: string;
    strikethrough: string;
    constructor() {
        super();
        this.black = "\x1b[30m";
        this.red = "\x1b[31m";
        this.green = "\x1b[32m";
        this.yellow = "\x1b[33m";
        this.blue = "\x1b[34m";
        this.magenta = "\x1b[35m";
        this.cyan = "\x1b[36m";
        this.white = "\x1b[37m";
        this.bg_black = "\x1b[40m";
        this.bg_red = "\x1b[41m";
        this.bg_green = "\x1b[42m";
        this.bg_yellow = "\x1b[43m";
        this.bg_blue = "\x1b[44m";
        this.bg_magenta = "\x1b[45m";
        this.bg_cyan = "\x1b[46m";
        this.bg_white = "\x1b[47m";
        this.reset = "\x1b[0m";
        this.bright = "\x1b[1m";
        this.dim = "\x1b[2m";
        this.underscore = "\x1b[4m";
        this.blink = "\x1b[5m";
        this.reserve = "\x1b[7m";
        this.hidden = "\x1b[8m";
        this.strikethrough = "\x1b[9m";
    }

    public Filtered: ConsoleFilteredColors = new ConsoleFilteredColors();
}

const Colors = new ConsoleColors();

export default Colors;