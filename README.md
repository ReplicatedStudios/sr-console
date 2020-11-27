# SR-CONSOLE | Consola moderna
Una consola con funciones bastante utiles para el desarrollo y debug de una aplicacion

## INICIALIZAR
Sobreescribimos la variable por defecto **console** para que sea mas facil el uso de las funciones
```js
const settings = {
    _dirname: _dirname
    filter: [
        "terrible"
    ]
}

const SrConsole = require('sr-console');
const console = new SrConsole.load(settings);
```

## FUNCIONES DE LOG
El SrConsole puede filtrar en la consola informacion que suele ser en proyectos pequeños muy innecesaria
```js
//Simple LOG con color y fecha
console.log('Hola Mundo!'); //regresa: [00:00:00] Hola Mundo!

//LOG con sistema de filtrado
console.send('Hola terrible Mundo!'); //regresa: [00:00:00] Hola Mundo!
```

## [NUEVO] WebSockets
Emite la consola por medio de un websocket (unicamente soporta Socket.io)
Solo configura socket.io y agrega el servidor con el parametro `console.createSocket()`
```js
const SocketIO = require('socket.io');
const io = SocketIO();
const settings = {
    _dirname: _dirname
    filter: [
        "UNUSED",
        "INFO"
    ]
}

const SrConsole = require('sr-console');
const console = new SrConsole.load(settings);

console.createSocket(io);
```

## ADVERTENCIA
Este proyecto aun se esta desarrollando