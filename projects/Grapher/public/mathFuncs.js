const ops = {
    oneArg: {
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
        tanh: (t) => Math.tanh(t),
        atanh: (t) => Math.atanh(t),
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
        rand: (low, high) => Math.random() * (high - low) + low,
    },
    ordered: [
        ['(', '|'],
        ['^', '**', 'root'],
        ['*', '/'],
        ['%', 'mod'],
        ['+', '-'],
    ]
};

export {
    ops,
}
