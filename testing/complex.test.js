import "../modules/build/index.js";

console.log(1+1+1+1+(1*0)+1);
console.log(1+1+1+1+1*0+1);

const printer = new LOG.SrPrint("COMPLEX");
printer.send("W", "NUEVO PRINTER CREADO");
printer.send("D", "Debugeando con printer");
printer.send("S", "printer probado exitosamente", "iniciando proceso de creado de", 4, "subprinters");


const SUB1 = printer.subPrinter("simple");

SUB1.send("L", "Se creo el subprinter numero", 1);

const SUB2 = SUB1.subPrinter("non-simple");

SUB2.send("L", "Se creo el subprinter numero", 2);