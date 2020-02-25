// ES5 non-functional version:
const func1 = () => {
    var arr = [1,3,5,9];
    for (var i=0; i<arr.length; i++) {
        setTimeout(() => {
            console.info(`i:${i}, arr[i]:${arr[i]}`)
        }, 10);
    }
};

// ES6 straight fix:
const func2 = () => {
    const arr = [1,3,5,9];
    for (let i=0; i<arr.length; i++) {
        setTimeout(() => {
            console.info(`i:${i}, arr[i]:${arr[i]}`)
        }, 10);
    }
};

// ES5 workaround:
const func3 = () => {
    var arr = [1,3,5,9];
    for (var i=0; i<arr.length; i++) {
        (function (i) {
            setTimeout(() => {
                console.info(`i:${i}, arr[i]:${arr[i]}`);
            }, 10);
        })(i);
    }
};

// func1();
// func2();
func3();
