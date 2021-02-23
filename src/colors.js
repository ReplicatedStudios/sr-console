export class ColorString extends String {
    constructor(param) {
        super();
        this.param = param;
    }
    load() {
        return '\x1b' + this.param;
    }
}
export class Colors {
    constructor() {
        this.black = new ColorString('[30m').load();
        this.red = new ColorString('[31m').load();
        this.green = new ColorString('[32m').load();
        this.yellow = new ColorString('[33m').load();
        this.blue = new ColorString('[34m').load();
        this.magenta = new ColorString('[35m').load();
        this.cyan = new ColorString('[36m').load();
        this.white = new ColorString('[37m').load();
        this.bg_black = new ColorString('[40m').load();
        this.bg_red = new ColorString('[41m').load();
        this.bg_green = new ColorString('[42m').load();
        this.bg_yellow = new ColorString('[43m').load();
        this.bg_blue = new ColorString('[44m').load();
        this.bg_magenta = new ColorString('[45m').load();
        this.bg_cyan = new ColorString('[46m').load();
        this.bg_white = new ColorString('[47m').load();
        this.reset = new ColorString('[0m').load();
        this.bright = new ColorString('[1m').load();
        this.dim = new ColorString('[2m').load();
        this.underscore = new ColorString('[4m').load();
        this.blink = new ColorString('[5m').load();
        this.reserve = new ColorString('[7m').load();
        this.hidden = new ColorString('[8m').load();
        this.strikethrough = new ColorString('[9m').load();
    }
    get allNames() {
        return [
            'black',
            'red',
            'green',
            'yellow',
            'blue',
            'magenta',
            'cyan',
            'white',
            'bg-black',
            'bg-red',
            'bg-green',
            'bg-yellow',
            'bg-blue',
            'bg-magenta',
            'bg-cyan',
            'bg-white',
            'reset',
            'bright',
            'dim',
            'underscore',
            'blink',
            'reverse',
            'hidden'
        ];
    }
    get allFilterNames() {
        return [
            '%bk%',
            '%rd%',
            '%gn%',
            '%yl%',
            '%bl%',
            '%mg%',
            '%cy%',
            '%wt%',
            '%bgbk%',
            '%bgrd%',
            '%bggn%',
            '%bgyl%',
            '%bgbl%',
            '%bgmg%',
            '%bgcy%',
            '%bgwt%',
            '%reset%',
            '%bright%',
            '%dim%',
            '%underscore%',
            '%blink%',
            '%reverse%',
            '%hidden%'
        ];
    }
}
