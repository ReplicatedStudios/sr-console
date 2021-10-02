export interface TimeBuildMethods {
    full: string;
    half: string;
    simple: string;
    none: null;
}
export declare class ConsoleTime extends Date {
    localDays: number;
    localMonth: number;
    localYear: number;
    localHours: number;
    localMinutes: number;
    localSeconds: number;
    localMilliseconds: number;
    constructor();
    build(method?: keyof TimeBuildMethods): string;
}
declare const Time: typeof ConsoleTime;
export default Time;
