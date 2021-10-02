import Console from '../../index.js';
import util from 'util';

const waitame = util.promisify(setTimeout);

await waitame(1000);

new Console({ dirname: process.cwd() }).global();


export default true;

// console.success('VERIFICANDO')
// console.log('check si sirve')
// console.debug('beep', 'bppl', '\x1b[32 ddsjfds verde');
// console.group('infio')
// console.log('helow', 'frind', 74, { ok: 'ok' });
// console.debug('console', 'test', 1, { ok: 'ok' });
// console.warn('5est', undefined, {data: 'ok', type: 10, color: "ok"}, 'si', true, false);
// console.err(2, undefined, JSON.stringify({data: 'ok', type: 10, color: "ok"}), 'si', true, false);
// console.success(process.env.TERM);
// console.log('memoria actual es:', console.memory + 'MB');
// console.log(() => {let i = 1;})
// console.fatalE('failed to do someting');
// console.memory;

