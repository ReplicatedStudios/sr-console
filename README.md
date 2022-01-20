# LOS MODALES HACEN A LA CONSOLA
Una libreria que le da mas color a la consola de tu aplicacion para que sea facilmente comprensible, incluyendo herramientas utiles.
Bastante poderosa y requiere poca configuracion. Deja atras el complicarte en leer archivos de Log de tu codigo o saber cuando ocurrio el error, ahora puedes tener todo mas organizado y facil de
previsualizar


### ``MODULO EN BETA``

### = CHANGELOG 0.14.2 - BETA =
- Se implemento soporte a ES5/commonjs ( ``require('module')``) y a su vez soporte a ESNext (``import 'module'``)
- Correccion de errores menores y mejoras en el codigo

## INICIALIZACION
Commonjs
```ts
require('sr-console');
```
ES6 / ESNEXT
```ts
import "sr-console";
```
Archivo `.env` de tu Proyecto
```env
# Filtro de palabras/claves en .send(). Separados con el simbolo "|" - DEFAULT 
SR_CONSOLE_FILTER="bad word|nword"

# Formato de fecha y hora al inicio de cada log
# long | short | basic | none - DEFAULT: simple
SR_CONSOLE_TIME=short

# Activar registro de logs en la carpeta de tu proyecto - DEFAULT: false
SR_CONSOLE_LOG=true
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