const fn = x => x * 2;
console.info("fn(2) =", fn(2));

class Obj {
    constructor (multiplier) {
        this.multiplier = multiplier;
        this.fn2 = this.fn2.bind(this);
    }
    fn (x) { return x * this.multiplier; }
    fn2 (x) { return x * this.multiplier; }
    fn3 (x) { return x * this.multiplier; }
};
const obj = new Obj(2);

console.info("obj.fn(2) =", obj.fn(2));

console.info("obj.fn.call(obj, 2) =", obj.fn.call(obj, 2));

const fnWrapper = obj.fn.bind(obj);
console.info("fnWrapper.call(null, 2) =", fnWrapper.call(null, 2));

console.info("obj.fn2.call(null, 2) =", obj.fn2.call(null, 2));

obj.fn3 = obj.fn3.bind(obj);
console.info("obj.fn3.call(null, 2) =", obj.fn3.call(null, 2));

class Obj3 {
    constructor (multiplier) {
        this.multiplier = multiplier;
    }
}

// doesn't work because methods are already bound to the original `obj`
const obj3 = new Obj3(3);
console.info("obj.fn.call(obj3, 2) =", obj.fn.call(obj3, 2));
console.info("obj.fn2.call(obj3, 2) =", obj.fn2.call(obj3, 2));
console.info("obj.fn3.call(obj3, 2) =", obj.fn3.call(obj3, 2));
