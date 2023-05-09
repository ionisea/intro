import { setCanvas, width, height, displayGraph, clear } from './graphics.js';
import { maths } from './mathFuncs.js';

setCanvas(document.getElementById('screen'))
const canvas = document.getElementById('screen')
const eqInput = document.getElementById('eq');
const resoSlider = document.getElementById('resolution')
const resoLabel = document.getElementById('resoLabel')


const getElementValue = (e) => e.value;

const sendError = (of) => alert(`error: ${of}`)

const disablePage = () => { // I may use this in case some jerk tries to exploit security vulnerabilities that I may or may not add
    const mathsVals = Object.values(maths)
    setInterval(() => {
        alert(`${mathsVals[Math.floor(Math.random() * mathsVals.length)](Math.random(), Math.random())}`)
    }, 20)
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    translate(dir) {

    }
};

let center = new Point(width / 2, height / 2); //center coord
let scale = 1; //px per unit
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
        if ((((parseInt(newExp[newExp.length - 1]) !== NaN) || (newExp[exp.length - 1] === ')')) && (exp[x] === '('))) newExp += '*'
        if ((parseInt(exp[x]) !== NaN) && (newExp[newExp[newExp.length - 1]] === ')')) newExp += '*'
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

const findFirstOp = (exp, ops) => {
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
        if ((range.open === undefined) && ( parseInt(exp[opObj.index - x]) === NaN)) {
            range.open = opObj.index - x
        } if ((range.close === undefined) && (parseInt(exp[opObj.index + opObj.op.length + x]) === NaN)) {
            range.close = opObj.index + opObj.op.length + x
        }
    }
    return range;
}

const operate = (exp)   => {

}

const evaluate = (eq, x) => { //things js cannot understand: 'x(), (x-y)(2), etc' 'trigfunction()' '|num|' 'a mod (or things like it) b' 'num!'
    if (x != undefined) return evaluate(fixAdjacent(eq.replaceAll('x', `(${x})`).replaceAll(' ', '')))
    if ((eq.indexOf('(') === -1) && (eq.indexOf('|') === -1)) {
        if ((eq.indexOf('^') === -1) && (eq.indexOf('**') === -1) && (eq.indexOf('root') === -1)) {
            if ((eq.indexOf('*') === -1) && (eq.indexOf('/') === -1) && eq.indexOf('!' === -1)) {
                if ((eq.indexOf('%') === -1) && (eq.indexOf('mod') === -1)) {
                    if ((eq.indexOf('+') === -1) && (eq.indexOf('-') === -1)) {
                        if (`${parseInt(eq)}` === eq) return parseInt(eq);
                        else return sendError(`something went wrong (you may have caused it)`)
                    } else {
                        const opStart = findFirstOp(eq, ['+', '-'])
                        const oppedRange = findOperated(eq, opStart)
                    };
                } else {
                    const opStart = findFirstOp(eq, ['%', 'mod'])
                    const oppedRange = findOperated(eq, opStart)
                };
            } else {
                const opStart = findFirstOp(eq, ['/', '*', '!'])
                const oppedRange = findOperated(eq, opStart)
            };
        } else {
            const opStart = findFirstOp(eq, ['^', '**', 'root'])
            const oppedRange = findOperated(eq, opStart)

        };
    } else {
        // figure out trig functions here, maybe abs, or else it may end up funky with the cosa^b and whatnot and the computer will crap itself
        const first = findFirstOp(eq, ['|', '('])
        const nestEnd = findExpEnd(eq.substring(first.index + 1, first))
        return evaluate(eq.substring(0, first.index - 1) +
            (first.op === '|' ? maths[abs](evaluate(eq.substring(first.index + 1, nestEnd))) :
                evaluate(eq.substring(first.index + 1, nestEnd))) +
            eq.substring(nestEnd + 1));
    };
};

canvas.onclick = (ev) => {
    reCenter(ev.button === 0 ? 0.5 : 2, new Point(ev.x / scale + getCanvBL(center).x, ev.y / scale + getCanvBL(center).y));
    graph(getElementValue(eqInput));
};

document.onkeydown = (k) => {
    if (k.key === 'Enter') {
        graph(getElementValue(eqInput));
    };
};

resoSlider.onmousemove = (e) => {
    resoLabel.innerHTML = `resolution (px between points) = ${getElementValue(resoSlider)}:`
}

const graph = (eq) => {
    clear();
    const points = []
    for (let x = 0; x < width; x += resolution) {
        const trueX = x / scale + getCanvBL(center);
        points.push(new Point(trueX, evaluate(eq, trueX)));
    };
    displayGraph(points.map(p => (p - getCanvBL(center)) * scale));
};