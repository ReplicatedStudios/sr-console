# SrConsole | UNA CONSOLA MAS COLORIDA
Una libreria que le da mas color a la consola de tu aplicacion para que sea facilmente comprensible, incluyendo herramientas utiles.

### AVISO
EL MODULO ESTA EN FASE BETA-TS (MIGRADO A TS)

## INICIO
Configuracion inicial
```js
const SrConsole = require('sr-console');

new SrConsole({
    dirname: process.cwd(), // UBICACION DE `logs.txt`
    filter: [               //ARRAY CON PALABRAS CLAVES A CENSURAR
        "secret_token_no_loggable",
        "i hate bananas"
    ],
    time: 'simple' //Formato de fecha
}).global();
```
# Limitaciones
Typescript limita mucho el sobreescribir los tipos de la variable `Console`
Por lo que se implemento 2 metodos global para almacenarlo en la variable global con nombres diferentes

Recomiendo usar `.global()` en lugar de `.globalize();`

EJEMPLO:
```js
new SrConsole().global(); //Almacena en la variable consol los metodos y es compatible con TS
new SrConsole().globalize(); //Almacena en la variable console los metodos pero es incompatible con TS
```

## FUNCIONES BASICAS
La libreria cuenta con casi todas las funciones que existen en la clase `Console` original.
Aqui un ejemplo de todas las funciones con los colores que muestran y los valores que returnan
```js
consol.send('Hola enorme terrible y abominable Mundo!'); // [00:28:46] Hola enorme y Mundo! - Azul
consol.log('Hola Mundo'); // [00:28:46] Hola Mundo - Azul
consol.warn('Hola Peligroso Mundo'); // [00:28:46] Hola Peligroso Mundo - Amarillo
consol.debug('Hola problematico mundo'); // [00:28:46] Hola problematico mundo - Celeste
consol.err('Hola Erroneo Mundo'); // [00:28:46] Hola Erroneo Mundo - Rojo
consol.error('Hola alias de Erroneo Mundo'); // [00:28:46] Hola alias de Erroneo Mundo - Rojo
consol.success('Hola exitoso mundo'); // [00:28:46] Hola exitoso mundo - Verde
consol.trace('Hola guiado mundo'); // Trace: [00:28:46] Hola guiado mundo at... - Fondo rojo / Amarillo
consol.group("Hola Agrupado Mundo!") // [00:28:46] Hola Agrupado mundo - Magenta

setTimeout(() => {
    consol.fatalError(new Error('Errores graves').stack); // [00:28:46] Error: Errores graves - Fondo rojo / Amarillo
}, 2000)
```

## UTILIDADES
La libreria no solo cambia de color los logs y les agrega hora, si no tambien cuenta con utilidades como el "Almacenamiento de Logs" y la emision de estos usando Websockets


# Ejemplo de Websocket [SOCKET.IO](https://www.npmjs.com/package/socket.io)
Instaciamos nuestra consola y creamos nuestro servidor websocket, despues usamos la funcion `.SocketIO()` y le agregamos como parametro el servidor websocket
```js
const SocketIO = require('socket.io');
const io = SockeIO();

consol.SocketIO(io);
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

## EN DESARROLLO
Aun estoy trabajando en la libreria. por lo que estare haciendo cambios bastante bruscos en el codigo y en como se redacta con cada cambio realizado hasta que finalice la version 1.0.0. En caso de que la libreria presente algun problema puedes visitar el [Repositorio](https://github.com/Zixasis/sr-console#readme)