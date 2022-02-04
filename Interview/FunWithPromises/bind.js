class Obj {
    constructor (multiplier) {
        this.multiplier = multiplier;
    }
    fn (x) { 
        return x * this.multiplier;
    }
};

class Obj3 {
    constructor (multiplier) {
        this.multiplier = multiplier;
    }
}

const homegrownBind = (fn, context) => {
    const originalFn = fn;
    const bindedFn = (arg) => {
        return fn.call(context, arg);
    };
    bindedFn.originalFn = originalFn;
    return bindedFn;
};

const unbind = fn => {
    return fn.originalFn;
}

const obj = new Obj(2);
const obj3 = new Obj(3);

console.info("obj.fn(2) =", obj.fn(2));
console.info("obj.fn.call(obj3, 2) =", obj.fn.call(obj3, 2));

obj.fn = homegrownBind(obj.fn, obj);
console.info("obj.fn(2) =", obj.fn(2));
console.info("obj.fn.call(obj3, 2) =", obj.fn.call(obj3, 2));

obj.fn = unbind(obj.fn);
console.info("obj.fn(2) =", obj.fn(2));
console.info("obj.fn.call(obj3, 2) =", obj.fn.call(obj3, 2));
