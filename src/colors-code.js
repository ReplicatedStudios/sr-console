const colors = new Object();

colors['black'] = "%bk%";
colors['red'] = "%rd%";
colors['green'] = "%gn%";
colors['yellow'] = "%yl%";
colors['blue'] = "%bl%";
colors['magenta'] = "%mg%";
colors['cyan'] = "%cy%";
colors['white'] = "%wt%";

colors['bg-black'] = "%bgbk%";
colors['bg-red'] = "%bgrd%";
colors['bg-green'] = "%bggn%";
colors['bg-yellow'] = "%bgyl%";
colors['bg-blue'] = "%bgbl%";
colors['bg-magenta'] = "%bgmg%";
colors['bg-cyan'] = "%bgcy%";
colors['bg-white'] = "%bgwt%";

colors['reset'] = "%reset%";
colors['bright'] = "%bright%";
colors['dim'] = "%dim%";
colors['underscore'] = "%underscore%";
colors['blink'] = "%blink%";
colors['reverse'] = "%reverse%";
colors['hidden'] = "%hidden%";

const tcolors = [
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

module.exports = {
    code: colors,
    name: tcolors
};