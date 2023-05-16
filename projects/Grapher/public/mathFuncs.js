const ops = {
    oneArg: {
        sin: (t) => Math.sin(t),
        sinh: (t) => Math.sinh(t),
        cos: (t) => Math.cos(t),
        cosh: (t) => Math.cosh(t),
        tan: (t) => Math.tan(t),
        tanh: (t) => Math.tanh(t),
        '!': (num) => {
            let result = 1;
            for (let i = 1; i <= num; i++) {
                result *= i;
            }
            return result;
        },
        round: (n) => Math.round(num),
    },
    twoArg: {
        root: (rt, n) => Math.pow(n, 1 / rt),
        '+': (n1, n2) => n1 + n2,
        '-': (n1, n2) => n1 - n2,
        '*': (n1, n2) => n1 * n2,
        '/': (n1, n2) => n1 / n2,
        '^': (n1, n2) => n1 ** n2,
        '**': (n1, n2) => n1 ** n2,
        mod: (x, m) => ((x % m) + m) % m,
        '%': (x, r) => x % r,
        random: (low, high) => Math.random() * (high - low) + low,
    },
};

class TwoArgExp {
    constructor(a1, op, a2) {
        this.a1 = a1;
        this.a2 = a2;
        this.op = op;
    }
}

class OneArgExp {
    constructor(a, op) {
        this.a = a;
        this.op = op;
    }
}

export {
    ops,
    OneArgExp,
    TwoArgExp,
}
