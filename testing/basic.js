require ('../build/index.js');

console.group('TESTING BASICO');
    console.log(process.env.SR_CONSOLE_FILTER)
    console.log(process.env.SR_CONSOLE_TIME);
console.groupEnd('Finalizado');

console.send('usando la palabra nword');

console.send('Uso de Ram por el proceso:', console.memory, 'MB');