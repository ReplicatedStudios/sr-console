const { stdout } = require("process");

require("../common/build/index");

console.time();
console.warn("Iniciando demostracion de SR-CONSOLE");
console.warn("La implementacion puede estar a medias");
console.log("Cargando servidor ficticio");
console.log("Revisando informacion");
console.success("Toda la informacion fue validada");
console.group("Cargando registros")
console.debug("Se han detectado", 393, "registros");
console.debug("Importando registros");
console.debug("Indexandolos al nucleo del servidor");
console.group("Revision de registros")
console.err("Se detectaron 43 registros no validos o dañados");
console.info("Se intento reparar 43 registros");
console.warn("Existen", 4, "registros que se encuentran en un estado critico e irreparable")
console.unGroup("Se han cargado con exito", 350, "registros");

console.warn("Iniciando servidor");
console.log("Iniciando sesion");
console.send("Enviando Token NIGGA-XXXXXX-XXXXX");
console.success("Se ha iniciado session exitosamente")

console.info("Estan pendientes los",43, "registros sin cargar");
console.info("el servidor se encuentra usando 60gb de ram")
console.info("no se pudo procesar el modelo del procesador, se utilizo el modo seguro");
console.debug(() => "hi threre");
console.debug(() => { "nothing there" });
console.send(function nonAnnonymal(name) { })

console.log({ out: "vanish", data: true, howto: 5541, nonfunction: () => { return "i am a darn function" }, nonsymb: Symbol("i am a darn symbol") });

// stdout.write("\x1b[38;2;255;100;0mTRUECOLOR\x1b[0m\n");
// stdout.write("\x1b[38;5;177mCOLORED\x1b[0m\n");
// stdout.write("\x1b[38;5;183mCOLORED\x1b[0m\n");
// stdout.write("\x1b[38;5;219mCOLORED\x1b[0m\n");
setTimeout(() => {
    console.timeEnd();
    console.fatalBack(new Error("FATAL ERROR OCURRED ON SYSTEM REGISTRY"));
    console.log("recuperado");
    console.warn("oh no");
    console.err("no me siento bien");
    throw new Error("Finalizado");
}, 2000);

