# SR-CONSOLE & SR-PRINT | CONSOLA ELEGANTE
Una herramienta diseñada para facilitar la lectura de la consola, ahora todo se te carga de forma organizada

## FUNCIONES PRINCIPALES
- COLORES: Toda salida de informacion hacia la consola se vera representada con una paleta de colores unica para mejorar la lectura
- LOGS: No pierdas que causo el crasheo. SR-CONSOLE puede generar archivos .log que retienen toda la informacion de salida
- SR-PRINT: Un plugin integrado en la libreria, su uso es bastante sencillo
    - `const PRINT = new LOG.SrPrint("SYSTEM");` - Crea tus propios SrPrint
    - `PRINT.send("L", "My cool output")` - Funcion global para cualquier output -> `[00:00:00] [SYSTEM]: My cool output`
    - `PRINT.subPrinter("MY-SUBPRINT")` - Crea un hijo del SrPrint principal -> `[00:00:00] [SYSTEM/MY-SUBPRINT]: My cool output`

## DESTACADO
- `LOG.send(privateToken);` - Censura cualquier valor predefinido
- `LOG.spy(value);` - Obten cualquier valor, arrojalo en consola y regresalo a su destino, ideal para mantener codigo de 1 linea
- `LOG.trace(new Error())` - Ahora existe para NodeJS, alias de `console.fatal()`
- `LOG.fatal(new Error())` - Arroja un error y finaliza el proceso de forma segura
- `LOG.SrColors.get("RED")` - Obten colores personalizados para diferentes valores
<br>
<br>

# INICIALIZACION Y CONFIGURACION
## Solicita el modulo
```ts
// COMMONJS
require('sr-console');

// MODULE (EJ5 / ESNEXT)
import "sr-console";

// TODO SE GUARDA EN LAS VARIABLES GLOBALES
console.send("data");
LOG.send("data");
```

## Configuracion (`.env`)
Importante: Si estas usando un archivo .env deberas situarlo en la raiz del proyecto
```env
# Filtro de cadenas de texto
# WIP: Puedes filtrar todo el .ENV de tu entorno enviando un boolean true
# SYNTAXIS:: "example word|example text to censore|private-token-key"
# false | SYNTAXIS:: - DEFAULT: false
SRCONSOLE_LIST_USE_FILTER=xxxxx-yyyyy|nigga

# Muestras de tiempo
# DBASIC: [00:00:00]
# DMIN: [May 07] [00:00:00]
# DMAX: [May 07, 2022] [00:00:00.00]
# DOFF: ""
# "DBASIC" | "DMIN" | "DMAX" | "DOFF" - DEFAULT: DBASIC
SRCONSOLE_MODE_TIME=DMAX

# Activa el registro de la consola en un archivo TXT con procesado %string%
# Se agrego un archivo adicional para escritura en crudo
# FILE_USE & FILE_RAW_USE: true | false - DEFAULT: false
# FILE_DIR: /path/to/file - DEFAULT: /logs/
SRCONSOLE_FILE_DIR=./logs
SRCONSOLE_FILE_USE=false
SRCONSOLE_FILE_RAW_USE=false

# Desactiva los colores para terminales basadas en HTML5 (no posprocesado)
# La salida en HTML5 solo sera enviada por medio de SOCKETS 
# El modulo no esta diseñado para navegadores
# true | false - DEFAULT: false
SRCONSOLE_HTML5_USE=false

# Prefix de cada salida de log que utilices: Log.send() -> [00:00:00] [LOGS]
# true | false - DEFAULT: false
SRCONSOLE_PREFIX_USE=false

# Remplaza la variable global `console`. Esto no remplaza los tipos de TS por limitaciones del lenguaje
# Ideal para modulos javascript, las funciones son 100% compatibles
# true | false - DEFAULT: true
SRCONSOLE_OVERRIDE=true
```
<br>

## FUNCIONES BASICAS
La libreria cuenta con casi todas las funciones que existen en la clase `Console` original.
Aqui un ejemplo de todas las funciones con los colores que muestran y los valores que returnan

### CODIGO
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

## CHANGELOG
- RELEASE: 1.0.0
    - `[FIX]` La configuracion de iSrTime no se aplicaba correctamente
    - `[ENH]` Se almaceno todo en la variable `console` y `LOG`
    - `[ENH]` Se creo una variable global `PRINT` con el printer por defecto de SYSTEM
    - `[ENH]` Se implemento un error handler no intrusivo para errores `uncaught` y `throw`
    - `[ENH]` Restringido la creacion de segundas instancias de SrConsole (no lo hagas)
    - `[ENH]` Se renombraron las variables del `.env`
    - `[ENH]` Ahora `LOG.assert(boolean, msg)` detiene el proceso si el assert es false
    - `[NEW]` Agregado `LOG.fatalBack(new Error())` envia un error fatal pero no detiene el proceso
    - `[NEW]` Agregado `LOG.load("RAW" | "NORMAL" | "H5")` que returna el string con el contenido solo de los logs disponibles
    - `[NEW]` Ahora se emite un archivo `.html` con los logs convertidos a ese formato
- 0.20.0-ALPHA:
    - `[FIX]` Se refactorizo todo el codigo
    - `[FIX]` Correccion a fugas de memoria y rendimiento
    - `[FIX]` Los objetos se muestran adecuadamente cuando se usa `LOG.group()`
    - `[ENH]` Implementado archivo de salida `/logs/raw.log` (desactivado por defecto)
    - `[ENH]` Se cambiaron los colores de algunos outputs
    - `[ENH]` Ya se puede personalizar el directorio contenedor de todos los archivos.log
    - `[NEW]` Prefix para cada Output (desactivado por defecto)
    - `[NEW]` SrPrint
<br>
<br>

# WORK IN PROGRESS
- Permitir Objetos Circulares
- Dar formato automatico a objetos
- Proteger todas las variables del `.env` de ser mostradas en consola
- Enviar comandos usando `childProcess` por medio de websockets
- Crear copia de `console.table()` mas userFriendly
<br>
<br>

# INTEGRACIONES
## SR-CONSOLE x [SOCKET.IO](https://www.npmjs.com/package/socket.io)
Instaciamos nuestra consola y creamos nuestro servidor SocketIO, despues usamos la funcion `LOG.setSocketIO(serverIO)` y le agregamos como parametro el servidor websocket
```js
const SocketIO = require('socket.io');
const io = SockeIO();

LOG.setSocketIO(io);
// O TAMBIEN
console.setSocketIO(io);
```

Detectar la salida de la consola
```js
// INPUTS (no util por ahora)
socket.on('console:in', data => {});
// OUTPUTS
socket.on('console:out', data => {});
// OUTPUTS DE ERROR
socket.on('console:err', data => {});
```
<br>
<br>

## SR-CONSOLE x [DOTENV](https://www.npmjs.com/package/dotenv)
Al usar `sr-console` ya no necesitas importar la libreria [dotenv](https://www.npmjs.com/package/dotenv), ya lo hace por ti.
### LIMITANTES
- No puedes cambiar la configuracion
    - Se usara la por defecto de [dotenv](https://www.npmjs.com/package/dotenv)
- No estan las utilidades para convertir elementos `.env` dentro del codigo a `Object()`