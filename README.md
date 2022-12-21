[![sr-console](https://snyk.io/advisor/npm-package/sr-console/badge.svg)](https://snyk.io/advisor/npm-package/sr-console)
[![npm version](https://badge.fury.io/js/sr-console.svg)](https://badge.fury.io/js/sr-console)
![GitHub last commit](https://img.shields.io/github/last-commit/SrRapero720/sr-console)
![GitHub issues](https://img.shields.io/github/issues-raw/SrRapero720/sr-console)

# INICIALIZACION
Comando de instalacion (Node.js & NPM)
```cmd
npm i sr-console
```

Activa la libreria. Esto va al inicio de tu archivo index.js o index.ts
```ts
import "sr-console"; // MODULE (EJ5 / ESNEXT)
require('sr-console'); // COMMONJS

// TODO SE GUARDA EN LAS VARIABLES GLOBALES
console.send("data");
LOG.send("data");
```
<br>

# CONFIGURACION (`.env`)
Importante: Si estas usando un archivo .env deberas situarlo en la raiz del proyecto<br>
Consulta la documentacion de la configuracion `.env` en el [repositorio](https://github.com/SrRapero720/sr-console/blob/main/.env)
<br><br>

# FUNCIONES BASICAS
La libreria cuenta con casi todas las funciones que existen en la clase `Console` original.
Aqui un ejemplo de todas las funciones con los colores que muestran y los valores que returnan
```js
// COMMONJS
require("sr-console");
// MODULE (EJ5 / EJNEXT)
import "sr-console";

// NOTA: ES VALIDO SI USAS console.any() SIEMPRE Y CUANDO ESTE ACTIVADO EN EL .env EL SOBREESCRIBIR console
LOG.time();
LOG.warn("Iniciando demostracion de SR-CONSOLE");
LOG.warn("La implementacion puede estar a medias");
LOG.log("Cargando servidor ficticio");
LOG.log("Revisando informacion");
LOG.success("Toda la informacion fue validada");
LOG.group("Cargando registros")
LOG.debug("Se han detectado", 393, "registros");
LOG.debug("Importando registros");
LOG.debug("Indexandolos al nucleo del servidor");
LOG.group("Revision de registros")
LOG.err("Se detectaron 43 registros no validos o dañados");
LOG.info("Se intento reparar 43 registros");
LOG.warn("Existen", 4, "registros que se encuentran en un estado critico e irreparable")
LOG.unGroup("Se han cargado con exito", 350, "registros");

LOG.warn("Iniciando servidor");
LOG.log("Iniciando sesion");
LOG.send("Enviando Token NIGGA-XXXXXX-XXXXX");
LOG.success("Se ha iniciado session exitosamente")

LOG.info("Estan pendientes los",43, "registros sin cargar");
LOG.info("el servidor se encuentra usando 60gb de ram")
LOG.info("no se pudo procesar el modelo del procesador, se utilizo el modo seguro");
setTimeout(() => {
    LOG.timeEnd();
    LOG.fatalBack(new Error("FATAL ERROR OCURRED ON SYSTEM REGISTRY"));
    LOG.log("recuperado");
    LOG.warn("oh no");
    LOG.err("no me siento bien");
    throw new Error("Finalizado");
}, 2000);
```

### RESULTADO
<img src="https://i.imgur.com/X21ulSx.png">

<br>
<br>
<!-- `[FIX]` `[ENH]` `[NEW]` -->

# CHANGELOG
- RELEASE: 1.1.1
    - `[FIX]` Se arreglo errores en espaciado de `PRINT.send("U", "message from any")`
    - `[ENH]` Metodo `SrConsole.color()` como alias de `SrConsole.iSrColors.get()`
    - `[ENH]` Metodo `SrConsole.colorRex()` como alias de `SrConsole.iSrColors.rex()`
    - `[ENH]` Las funciones destacadas ahora estan documentadas sobre el resto de funciones
    - `[ENH]` GIT: Merged branch recreacion -> main (deleted)
<br>
<br>

# PLUGINS
`[PLUGIN]` SRPRINT
```js
const PRINT = new LOG.SrPrint("SYSTEM");
PRINT.send("L", "My cool output"); // Salida: [00:00:00][SYSTEM]: My cool output
PRINT.subPrinter("MY-SUBPRINT"); // Crea un SRPRINT con base al primero ->[00:00:00][SYSTEM/MY-SUBPRINT]: My cool output
```

# WORK IN PROGRESS
- Permitir Objetos Circulares
- Colores de 8-bits (256)
- Combinacion de colores basicos y de 8-bits para consolas como la CMD.exe
- Decoradores para typescript
- Dar formato automatico a Objects y Arrays
- Proteger todas las variables del `.env` de ser mostradas en consola
- Enviar comandos usando `childProcess` por medio de websockets
- Crear copia de `console.table()` mas userFriendly
<br>
<br>

# INTEGRACIONES
SrConsole puede integrarse o ser integrado con otras librerias utiles para expandir la utilidad de esta herramienta.

## SrConsole x [SocketIO](https://www.npmjs.com/package/socket.io)
Puedes implementar tu servidor SOCKET.IO 
```js
const SocketIO = require('socket.io');
const io = SockeIO();
LOG.setSocketIO(io);

/* Detectar la salida de la consola */
socket.on('console:in', data => {}); // INPUTS (no util por ahora)
socket.on('console:out', data => {}); // OUTPUTS
socket.on('console:err', data => {}); // OUTPUTS DE ERROR
```

## SrConsole x [DotEnv](https://www.npmjs.com/package/dotenv)
Al usar `sr-console` ya no necesitas importar la libreria [dotenv](https://www.npmjs.com/package/dotenv), ya lo hace por ti. <br>
sin embargo cuenta con algunas restricciones.
- No puedes cambiar la configuracion de dotenv
- No estan las utilidades para convertir elementos del `.env` a un `Object()`