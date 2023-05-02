import { setCanvas, width, height, displayGraph } from './graphics.js';
import { maths } from './mathFuncs.js';

setCanvas(document.getElementById('screen'))
const canvas = document.getElementById('screen')
const input = document.getElementById('eq');

const getElementValue = (e) => e.value;

const sendError = (of) => alert(`error: ${of}`)

const crashPage = () => { // I may use this in case some jerk tries to exploit security vulnerabilities that I may or may not have
    while (true) {
        setTimeout(() => {
            alert(`${maths[Math.random() * maths.values().length](Math.random(), Math.random)}`)
        }, 20)
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    translate(dir) {

    }
};

let center = new Point(width / 10, height / 10); //center coord
let scale = 5; //px per unit
let resolution = 1; //px between points

const getCanvBL = (ctr) => new Point(ctr - width / 2 / scale, ctr - height / 2 / scale)

const reCenter = (mult, newCenter) => { //for later zoom in/out
    center = newCenter;
    scale *= mult;
};

const fixAdjacent = (exp) => {
    let newExp = ''
    for (let x = 0; x < exp.length; x++) {
        //the reason the following two are not bundled into one is because both of them may trigger
        if ((typeof exp[x] === 'number') && (newExp[newExp[newExp.length - 1]] === ')')) newExp += '*'
        if (((typeof newExp[newExp.length - 1] === 'number') && ((newExp[exp.length - 1] === ')')) || (exp[x] === '('))) newExp += '*'
        newExp += exp[x]
    }
    return newExp
}

const findExpEnd = (expRest, opObj) => {
    let needed = { num: 1, open: opObj.op, close: opObj.op === '(' ? ')' : '|' }
    for (let c = 0; c < expRest.length - 1; c++) {
        if ((needed.open !== needed.close) && (expRest[c] == '(')) needed.num++
        else if (expRest[c] == opObj.close) needed.num--
        if (needed.num === 0) return c
    }
    return sendError(`no closing parenthesis / abs marker`)
}

const checkFirstOp = (exp, ops) => {
    let first = { op: undefined, index: Infinity };
    for (const op of ops) {
        const index = exp.indexOf(op)
        if (index >= 0 && index < first.index) first = { op, index };
    }
    return first;
}

const findOperated = (exp, opObj) => {
    let range = { open: undefined, close: undefined }
    for (let x = 1; x < exp.length; x++) {
        if ((range.open === undefined) && (parseInt(typeof exp[opObj.index - x]) !== 'number')) {
            range.open = opObj.index - x
        } else if ((range.close === undefined) && (parseInt(typeof exp[opObj.index + opObj.op.length + x]) !== 'number')) {
            range.close = opObj.index + opObj.op.length + x
        }
    }
    return range;
}

const evaluate = (eq, x) => { //things js cannot understand: 'x(), (x-y)(2), etc' 'trigfunction()' '|num|' 'a mod (or things like it) b' 'num!'
    if (x != undefined) return evaluate(fixAdjacent(eq.replaceAll('x', `(${x})`).replaceAll(' ', '')))
    if ((eq.indexOf('(') === -1) && (eq.indexOf('|') === -1)) {
        if ((eq.indexOf('^') === -1) && (eq.indexOf('**') === -1) && (eq.indexOf('root') === -1)) {
            if ((eq.indexOf('*') === -1) && (eq.indexOf('/') === -1) && eq.indexOf('!' === -1)) {
                if ((eq.indexOf('%') === -1) && (eq.indexOf('mod') === -1)) {
                    if ((eq.indexOf('+') === -1) && (eq.indexOf('-') === -1)) {
                        if (typeof eq === 'number') return parseInt(eq);
                        else return sendError(`something went wrong (you may have caused it)`)
                    } else {

                    };
                } else {

                };
            } else {

            };
        } else {
            const first = checkFirstOp(eq, ['^', '**', 'root'])

        };
    } else {
        // figure out trig functions here, maybe abs, or else it may end up funky with the cosa^b and whatnot and the computer will crap itself
        const first = checkFirstOp(eq, ['|', '('])
        const nestEnd = findExpEnd(eq.substring(first.index + 1, first))
        return evaluate(eq.substring(0, first.index - 1) +
            (first.op === '|' ? maths[abs](evaluate(eq.substring(first.index + 1, nestEnd))) :
                evaluate(eq.substring(first.index + 1, nestEnd))) +
            eq.substring(nestEnd + 1));
    };
};

canvas.onclick = (ev) => {
    reCenter(ev.button === 0 ? 0.5 : 2, new Point(ev.x, ev.y));
    graph(getElementValue(input));
};

document.onkeydown = (k) => {
    if (k.key === 'Enter') {
        graph(getElementValue(input));
    };
};

const graph = (eq) => {
    const points = []
    for (let x = 0; x < width; x += resolution) {
        const trueX = x / scale + getCanvBL(center);
        points.push(new Point(trueX, evaluate(eq, trueX)));
    };
    displayGraph(points.map(p => (p - getCanvBL(center)) * scale));
};