const maths = {
    mod: (x, m) => ((x % m) + m) % m,
    rem: (x, r) => x % m,
    sin: (t) => Math.sin(t),
    asin: (t) => Math.asin(t),
    sinh: (t) => Math.sinh(t),
    asinh: (t) => Math.asinh(t),
    cos: (t) => Math.cos(t),
    acos: (t) => Math.acos(t),
    cosh: (t) => Math.cosh(t),
    acosh: (t) => Math.acosh(t),
    tan: (t) => Math.tan(t),
    atan: (t) => Math.atan(t),
    atan2: (y, x) => Math.atan2(y, x),
    tanh: (t) => Math.tanh(t),
    atanh: (t) => Math.atanh(t),
    nrt: (n, rt) => Math.pow(n, 1 / rt),
    add: (n1, n2) => n1 + n2,
    subtract: (n1, n2) => n1 - n2,
    multiply: (n1, n2) => n1 * n2,
    divide: (n1, n2) => n1 / n2,
    exp: (n1, n2) => n1 ** n2,
    factorial: (num) => {
        let result = 1;
        for (let i = 1; i <= num; i++) {
            result *= i;
        }
        return result;
    },
    random: (low, high) => Math.random() * Math.abs(high - low) + low, // abs just in case some idiot does it the wrong way
    

}

export {
    maths,
}

//maths['name'](args)