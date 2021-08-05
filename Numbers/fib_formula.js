const fn = function (n) {return Math.sqrt(5)*Math.pow((1+Math.sqrt(5))/2,n) - Math.sqrt(5)*Math.pow((1-Math.sqrt(5))/2,n);}

const fibs = {};
const fib = n => {
    if (n < 2) {
        return n;
    }
    if (fibs[n]) {
        return fibs[n];
    }

    const f = fib(n-1) + fib(n-2);
    fibs[n] = f;
    return f;

}

const MAX = 10000;
for(let i = 0; i < MAX; i++) {
    console.info(i, ',', fib(i), ',', fn(i));
}