const SrPrint = require("../common/build/index.js");

const b = 6
const g = 6
const r = 6
console.log(16 + 36 * r + 6 * g + b);


console.count("count");
console.count("count");
console.count("count");
console.count("count");
console.count("count");
console.count("count");
console.count("count");
console.count("count");
console.countReset("count")
console.count("count");
console.count("count");
console.count("count");
console.warn(SrPrint);

const printer = new SrPrint("COMPLEX");
printer.send("W", "NUEVO PRINTER CREADO");
printer.send("D", "Debugeando con printer");
printer.send("S", "printer probado exitosamente", "iniciando proceso de creado de", 4, "subprinters");


const SUB1 = printer.subPrinter("simple");

SUB1.send("L", "Se creo el subprinter numero", 1);

const SUB2 = SUB1.subPrinter("non-simple");

SUB2.send("L", "Se creo el subprinter numero", 2);