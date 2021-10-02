import Console, { ConsoleConfig } from './src/index.js';

declare class SrConsole {
    private options: ConsoleConfig
    constructor(options: ConsoleConfig)

    /**
     * Almacena todo en la variable global con el nombre `consol.send('name');`
     */
    public global(): void

    /**
     * Almacena todo en la variable global con el nombre `console.send('name');`
     * IMPORTANTE: Este metodo en JS puro funciona pero en TS los tipos son los de `NodeJS.globalThis.console`
     * Se recomienda usar `this.global();` en lugar de `this.globalize();`
     */
    public globalize(): void
}

declare global {
    var consol: Console
    var Consol: typeof Console
}

export default SrConsole;