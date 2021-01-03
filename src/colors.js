const colors = new Object();

colors['black'] = "\x1b[30m";
colors['red'] = "\x1b[31m";
colors['green'] = "\x1b[32m";
colors['yellow'] = "\x1b[33m";
colors['blue'] = "\x1b[34m";
colors['magenta'] = "\x1b[35m";
colors['cyan'] = "\x1b[36m";
colors['white'] = "\x1b[37m";

colors['bg-black'] = "\x1b[40m";
colors['bg-red'] = "\x1b[41m";
colors['bg-green'] = "\x1b[42m";
colors['bg-yellow'] = "\x1b[43m";
colors['bg-blue'] = "\x1b[44m";
colors['bg-magenta'] = "\x1b[45m";
colors['bg-cyan'] = "\x1b[46m";
colors['bg-white'] = "\x1b[47m";

colors['reset'] = "\x1b[0m";
colors['bright'] = "\x1b[1m";
colors['dim'] = "\x1b[2m";
colors['underscore'] = "\x1b[4m";
colors['blink'] = "\x1b[5m";
colors['reverse'] = "\x1b[7m";
colors['hidden'] = "\x1b[8m";

module.exports = colors;