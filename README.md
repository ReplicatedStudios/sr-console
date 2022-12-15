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
- `console.send(privateToken);` - Censura cualquier valor predefinido
- `console.spy(value);` - Obten cualquier valor, arrojalo en consola y regresalo a su destino, ideal para mantener codigo de 1 linea
- `console.trace(new Error())` - Ahora existe para NodeJS, alias de `console.fatal()`
- `console.fatal(new Error())` - Arroja un error y finaliza el proceso de forma segura
- `console.SrColors.get("RED")` - Obten colores personalizados para diferentes valores
<br>
<br>

# INICIALIZACION Y CONFIGURACION
## Solicita el modulo
```ts
// COMMONJS
require('sr-console');

// MODULE (EJ5 / ESNEXT)
import "sr-console";
```

## Configuracion (`.env`)
Importante: Si estas usando un archivo .env deberas situarlo en la raiz del proyecto
```env
# Filtro de palabras (para privacidad o etc.)
# SYNTAXIS: "example word|example text to censore|private-token-key"
# WIP: Puedes filtrar todo el .ENV de tu entorno enviando un boolean true
# false | SYNTAXIS - DEFAULT: false
SRCONSOLE_LIST_USE_FILTER=xxxxx-yyyyy|secret-token

# Muestras de tiempo
# "D_MIN" | "D_MAX" | "D_OFF" | "D_CLASSIC" - DEFAULT: "D_CLASSIC"
SRCONSOLE_MODE_TIME=D_CLA

# Activa el registro de la consola en un archivo TXT con procesado %string%
# Se agrego un archivo adicional para escritura en crudo
# true | false - DEFAULT: false
# /path/to/file - DEFAULT: "/logs/"
SRCONSOLE_USE_FILE=false
SRCONSOLE_USE_FILE_RAW=false
SRCONSOLE_DIR_FILE=./logs

# Desactiva los colores para terminales basadas en HTML5 (no posprocesado)
# true | false - DEFAULT: false
SRCONSOLE_USE_HTML5=true

# Activa el prefix de cada salida de log que utilices: Log.send() mostrara el prefix [LOG] y Log.warn() el prefix [WARN]
# true | false - DEFAULT: false
SRCONSOLE_USE_PREFIX=true

# Remplaza la variable global `console`. Esto no remplaza los tipos de TS por limitaciones
# true | false - DEFAULT: true
SRCONSOLE_EXPLICIT_OVERRIDE_CONSOLE=true
```
## FUNCIONES BASICAS
La libreria cuenta con casi todas las funciones que existen en la clase `Console` original.
Aqui un ejemplo de todas las funciones con los colores que muestran y los valores que returnan
```js
console.send('Hola enorme terrible y abominable Mundo!'); // [00:28:46] Hola enorme y Mundo! - Azul
console.log('Hola Mundo'); // [00:28:46] Hola Mundo - Azul
console.warn('Hola Peligroso Mundo'); // [00:28:46] Hola Peligroso Mundo - Amarillo
console.debug('Hola problematico mundo'); // [00:28:46] Hola problematico mundo - Celeste
console.err('Hola Erroneo Mundo'); // [00:28:46] Hola Erroneo Mundo - Rojo
console.error('Hola alias de Erroneo Mundo'); // [00:28:46] Hola alias de Erroneo Mundo - Rojo
console.success('Hola exitoso mundo'); // [00:28:46] Hola exitoso mundo - Verde
console.trace('Hola guiado mundo'); // Trace: [00:28:46] Hola guiado mundo at... - Fondo rojo / Amarillo
console.group("Hola Agrupado Mundo!") // [00:28:46] Hola Agrupado mundo - Magenta

setTimeout(() => {
    console.fatalError(new Error('Errores graves').stack); // [00:28:46] Error: Errores graves - Fondo rojo / Amarillo
    console.ferror() /* ALIAS */
}, 2000)
```

## CHANGELOG
- 0.20.0-ALPHA:
    - Se refactorizo todo el codigo
    - Implementado archivo de salida `/logs/raw.log` (desactivado por defecto)
    - Se cambiaron los colores de algunos outputs
    - Ya se puede personalizar el directorio contenedor de todos los archivos.log
    - Correccion a fugas de memoria y rendimiento
    - NUEVO: Prefix para cada Output (desactivado por defecto)
    - NUEVO: SrPrint

## UTILIDADES
Principales funciones del modulo
- Agregar Dia y hora | **LISTO**
- Colorear logs respectivamente la funcion | **LISTO**
- Emitir consola via Websockets | **LISTO**
- Calcular uso de memoria cada console.any(); | **LISTO**
- Permitir Objetos Circulares
- Dar formato automatico a objetos
- Guardar los registros en un archivo dentro del proyecto | **LISTO**
- Filtrar palabras que no deberian verse en los logs | **LISTO**
- Colorizar tipo de datos en 1 sola linea .log('Numero:', 1) | **LISTO**
- Convertir string a color a elemento HTML con estilo | **CON BUGS**
- Si desea aportar una utilidad importante abrir un [issue](https://github.com/Zixasis/sr-console/issues) en Github


# SR-CONSOLE x [SOCKET.IO](https://www.npmjs.com/package/socket.io)
Instaciamos nuestra consola y creamos nuestro servidor websocket, despues usamos la funcion `.SocketIO()` y le agregamos como parametro el servidor websocket
```js
const SocketIO = require('socket.io');
const io = SockeIO();

console.SocketIO(io);
```

Para escuchar nuevas entradas en la consola solo debemos usar la siguiente linea de codigo.
```js
socket.on('console:out', data => {
    // OUTPUTS NORMALES
});
socket.on('console:in', data => {
    // OUTPUTS DE ENTRADA
});
socket.on('console:err', data => {
    // OUTPUTS DE ERROR
});
```

# SR-CONSOLE x [DOTENV](https://www.npmjs.com/package/dotenv)
Al usar `sr-console` ya no necesitas importar la libreria [dotenv](https://www.npmjs.com/package/dotenv), `sr-console` lo hace por ti.
#### Limitaciones
- No puedes cambiar la configuracion
  - Se usara la por defecto de [dotenv](https://www.npmjs.com/package/dotenv)
- No estan las utilidades para convertir elementos `.env` dentro del codigo a `Object()`

## PROXIMO A ACTUALIZAR
- Documentar correctamente las funciones
- Corregir error al convertir el unicode de color a elemntos HTML
- Resolver problemas de rendimiento al ejecutar ciertas funciones
- Implementar `EventEmitter` como herramienta [ahorrar codigo]
- Finalizar funciones default de la clase original `Console`

## EN DESARROLLO
Aun estoy trabajando en la libreria. por lo que estare haciendo cambios bastante bruscos en el codigo y en como se redacta con cada cambio realizado hasta que finalice la version ``1.0.0`` En caso de que la libreria presente algun problema puedes visitar el [Repositorio](https://github.com/Zixasis/sr-console#readme)