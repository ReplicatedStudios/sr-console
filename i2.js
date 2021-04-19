class example extends String {
    constructor(param) {
        super(param);
    }
}
example.prototype.example2 = class {
    constructor(param) {
        console.log('param')
    }
}

const demo = example.prototype.example2;


const demoman = new example('stringer');

console.log(demoman);

console.log(demo);