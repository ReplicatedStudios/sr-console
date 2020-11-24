import console from './console.js';

class start {
    constructor(data) {
       this.colors = {
           logs: 'cyan',
           warn: 'orange',
           err: 'red',
           success: 'green',
           json: 'magenta',
           console: 'white'
       };
       this.ws = null;
       this.log = null;

       console.setColors(this.colors);

       this.setWS = (io) => {
           console.setWS(io)
           return this;
       }
       this.setLog = (log) => {
           console.setLog(log);
           return this;
       }
       this.setColors = (colors) => {
           console.setColors(colors);
           return this;
       }
    }
}
export default start;