# SR-CONSOLE | Consola moderna
Una consola con funciones bastante utiles para el desarrollo y debug de una aplicacion

## INICIALIZAR
Sobreescribimos la variable por defecto **console** para que sea mas facil el uso de las funciones
```
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

```
//Simple LOG con color y fecha
console.log('Hola Mundo!'); //regresa: [00:00:00] Hola Mundo!

//LOG con sistema de filtrado
console.send('Hola terrible Mundo!'); //regresa: [00:00:00] Hola Mundo!
```

## ADVERTENCIA
Este proyecto aun se encuentra en fase de desarrollo.