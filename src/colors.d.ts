export declare class ColorString extends String {
    param: string;
    constructor(param: string);
    load(): string;
}
export declare class Colors {
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
    constructor();
    get allNames(): string[];
    get allFilterNames(): string[];
}
