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
    for (let x = 0; x < exp.length - 1; x++) {
        //the reason the following two are not bundled into one is because both of them may trigger
        if ((parseInt(exp[x], 10) !== NaN) && (newExp[newExp[newExp.length - 1]] === ')')) newExp += '*'
        if ((parseInt(newExp[newExp.length - 1], 10) !== NaN || (newExp[exp.length - 1] === ')')) && (exp[x] === '(')) newExp += '*'
        newExp += exp[x]
    }
    return newExp
}

const findExpEnd = (expRest) => {
    let needed = 1
    for (let c = 0; c < expRest.length - 1; c++) {
        if (expRest[c] == '(') needed++
        else if (expRest[c] == ')') needed--
        if (needed === 0) return c
    }
    return sendError(`no closing parenthesis`)
}

const evaluate = (eq, x) => { //things js cannot understand: 'x(), (x-y)(2), etc' 'trigfunction()' '|num|' 'a mod (or things like it) b' 'num!'
    if (x != undefined) return evaluate(fixAdjacent(eq.replaceAll('x', `(${x})`).replaceAll(' ', '')))
    if (eq.indexOf('(') === -1) {
        if ((eq.indexOf('^') === -1) && (eq.indexOf('**') === -1) && (eq.indexOf('root') === -1)) {
            if ((eq.indexOf('*') === -1) && (eq.indexOf('/') === -1) && eq.indexOf('!' === -1)) {
                if ((eq.indexOf('%') === -1) && (eq.indexOf('mod') === -1)) {
                    if ((eq.indexOf('+') === -1) && (eq.indexOf('-') === -1)) {
                        if (typeof eq === 'number') return eq;
                        else return sendError(`well crap something went wrong (you may have caused it)`)
                    } else {

                    };
                } else {

                }
            } else {

            };
        } else {

        };
    } else {
        // figure out trig functions or else it may end up funky with the cosa^b and whatnot and the computer will crap itself
        const nestEnd = findExpEnd(eq.substring(eq.indexOf('(') + 1, eq.indexOf(')')))
        return evaluate(eq.substring(0, eq.indexOf('(') - 1) +
            evaluate(eq.substring(eq.indexOf('(') + 1, nestEnd)) +
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
        points.push(new Point(trueX, evaluate(eq.slice(eq.indexOf('=') + 1), trueX)));
    };
    displayGraph(points.map(p => (p - getCanvBL(center)) * scale));
};