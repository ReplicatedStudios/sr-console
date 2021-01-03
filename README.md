# Sr-Console | Una vista mas organizada
Una libreria que le da mas color a los logs de tu aplicacion para que sea facilmente comprensible con herramientas utiles.

## COMENCEMOS
En este ejemplo remplazaremos la variable global `console` para que de esta forma de nos sea mas facil acceder a ella
```js
const SrConsole = require('sr-console');
const console = new SrConsole({
    _dirname: _dirname
    filter: [
        "none ",
        "terrible ",
        "abominable "
    ]
});
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
}, 2000)
```

## UTILIDADES
La libreria no solo cambia de color los logs y les agrega hora, si no tambien cuenta con utilidades como el "Almacenamiento de Logs" y la emision de estos usando Websockets


# Ejemplo de Websocket [SOCKET.IO]
Instaciamos nuestra consola y creamos nuestro servidor websocket, despues usamos la funcion `createSocket()` y le agregamos como parametro el servidor websocket
```js
const SrConsole = require('sr-console');
const SocketIO = require('socket.io');

const console = new SrConsole.load();
const io = SocketIO();

console.createSocket(io);
```

Para escuchar nuevas entradas en la consola solo debemos usar la siguiente linea de codigo.
```js
    socket.on('console', data => {
        // HAZ ALGO
    });
```

# Ejemplo `loadLogs()`
Carga el archivo logs.txt generado automaticamente (si definimos dirname en su configuracion inicial) y nos returna el valor en forma de promesa o callback
```js

/* Returna el valor en texto plano */
    console.loadLogs('string', (data) => {
        //Do Someting
    });

    console.debug(console.loadLogs('string'));

/* Returna los logs en forma de JSON */
    console.loadLogs('json', (data) => {
        //Do Someting with data
    });

    console.debug(console.loadLogs('json')); //Return: { msg: "Do someting", color: "%color-code%"}
```

# Codigos de color
```js
const colors = new Object();

colors['black'] = "%bk%";
colors['red'] = "%rd%";
colors['green'] = "%gn%";
colors['yellow'] = "%yl%";
colors['blue'] = "%bl%";
colors['magenta'] = "%mg%";
colors['cyan'] = "%cy%";
colors['white'] = "%wt%";

colors['bg-black'] = "%bgbk%";
colors['bg-red'] = "%bgrd%";
colors['bg-green'] = "%bggn%";
colors['bg-yellow'] = "%bgyl%";
colors['bg-blue'] = "%bgbl%";
colors['bg-magenta'] = "%bgmg%";
colors['bg-cyan'] = "%bgcy%";
colors['bg-white'] = "%bgwt%";

colors['reset'] = "%reset%";
colors['bright'] = "%bright%";
colors['dim'] = "%dim%";
colors['underscore'] = "%underscore%";
colors['blink'] = "%blink%";
colors['reverse'] = "%reverse%";
colors['hidden'] = "%hidden%";
```

## EN DESARROLLO
Aun estoy trabajando en la libreria. por lo que estare haciendo cambios bastante bruscos en el codigo y en como se redacta con cada cambio realizado hasta que finalice la version 1.0.0. En caso de que la libreria presente algun problema puedes visitar el [Repositorio](https://github.com/Zixasis/sr-console#readme)