import { setCanvas, width, height, displayGraph, clear } from './graphics.js';
import { ops, OneArgExp, TwoArgExp, } from './mathFuncs.js';

setCanvas(document.getElementById('screen'))
const canvas = document.getElementById('screen')
const eqInput = document.getElementById('eq');
const resoSlider = document.getElementById('resolution')
const resoLabel = document.getElementById('resoLabel')
canvas.addEventListener("contextmenu", e => e.preventDefault());
canvas.addEventListener("scroll", e => e.preventDefault());


const getElementValue = (e) => e.value;

const sendError = (of) => alert(`error: ${of}`)

/*
const disablePage = () => { // I may use this in case some jerk tries to exploit security vulnerabilities that I may or may not add
    const mathsVals = Object.values(maths)
    setInterval(() => {
        alert(`${mathsVals[Math.floor(Math.random() * mathsVals.length)](Math.random(), Math.random())}`)
    }, 20)
}
*/

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    trueToCanv(global) {

    };

    canvToTrue(global) {

    };
};

class Global {
    constructor() {
        this.center = new Point(0, 0);
        this.resolution = 5;
        this.scale = 1;
    }

    getCanvCorner(x, y) { // -1 to 1 for both
        return new Point(this.center.x + width / 2 / scale * x, this.center.y + height / 2 / scale * y)
    }

    reCenter(x, y) {
        this.center = new Point(x, y).canvToTrue(this)
    }
}

const global = new Global()

const fixAdjacent = (exp) => { //functional
    let newExp = ''
    for (let x = 0; x < exp.length; x++) {
        //the reason the following two are not bundled into one is because both of them may trigger
        if (((!isNaN(parseInt(newExp[newExp.length - 1])) || (newExp[exp.length - 1] === ')')) && (exp[x] === '('))) newExp += '*'
        if (!isNaN(parseInt(exp[x])) && (newExp[newExp[newExp.length - 1]] === ')')) newExp += '*'
        newExp += exp[x]
    }
    return newExp
}

const findExpEnd = (expRest, opObj) => {
    let needed = { num: 1, open: opObj.op, close: opObj.op === '(' ? ')' : '|' }
    for (let c = 0; c < expRest.length - 1; c++) {
        if ((needed.open !== needed.close) && (expRest[c] == '(')) needed.num++
        else if (expRest[c] == needed.close) needed.num--
        if (needed.num === 0) return c
    }
    sendError(`no closing parenthesis / abs marker`)
}

const findFirstOp = (exp, ops) => {
    let first = { op: undefined, index: Infinity };
    for (const op of ops) {
        const index = exp.indexOf(op)
        if (index >= 0 && index < first.index) first = { op, index };
    }
    return first;
}

const findOperated = (exp, op, index) => {
    const maybeOneOp = Object.keys(ops.oneArg).includes(op);
    if (maybeOneOp) {
        return new OneArgExp(
            parseInt(exp.substring(exp.split().slice(0, index - 1).findLastIndex(e => !isNaN(parseInt(e))), index - 1)),
            op,
        );
    } else {
        return new TwoArgExp(
            parseInt(exp.substring(exp.split().slice(0, index - 1).findLastIndex(e => !isNaN(parseInt(e))), index - 1)),
            op,
            parseInt(exp.substring(exp.split().slice(index + 1).findIndex(e => !isNaN(parseInt(e))), index + 1)),
        );
    };
}

/*let range = { open: undefined, close: undefined }
   for (let x = 1; x < exp.length; x++) {
       if ((range.open === undefined) && ( parseInt(exp[opObj.index - x]) === NaN)) {
           range.open = opObj.index - x
       } if ((range.close === undefined) && (parseInt(exp[opObj.index + opObj.op.length + x]) === NaN)) {
           range.close = opObj.index + opObj.op.length + x
       }
   }
   return range;*/
/*
const operate = (n1, op, n2) => {
    if (maths[op] !== undefined) {
        return maths[op](n1, n2) 
    } else {
        sendError('one or more of your operations are invalid')
    }

}*/

const evaluate = (eq, x) => { //things js cannot understand: 'x(), (x-y)(2), etc' 'trigfunction()' '|num|' 'a mod (or things like it) b' 'num!'
    if (x != undefined) return evaluate(fixAdjacent(eq.replaceAll('x', `(${x})`).replaceAll(' ', '')))
    for (const set of ops.ordered) {
        if (set.some(op => !(eq.indexOf(op) === -1))) {
            const op = findFirstOp(eq, set)
            const expRange = findOperated(eq, op.op, op.index)
        }
    }
    if (`${parseInt(eq)}` === eq) return parseInt(eq);
    else return sendError(`something went wrong (you may have caused it)`)
    
    if ((eq.indexOf('(') === -1) && (eq.indexOf('|') === -1)) {
        if ((eq.indexOf('^') === -1) && (eq.indexOf('**') === -1) && (eq.indexOf('root') === -1)) {
            if ((eq.indexOf('*') === -1) && (eq.indexOf('/') === -1)) {
                if ((eq.indexOf('%') === -1) && (eq.indexOf('mod') === -1)) {
                    if ((eq.indexOf('+') === -1) && (eq.indexOf('-') === -1)) {
                        if (`${parseInt(eq)}` === eq) return parseInt(eq);
                        else return sendError(`something went wrong (you may have caused it)`)
                    } else {
                        const opStart = findFirstOp(eq, ['+', '-'])
                        const oppedRange = findOperated(eq, opStart.op, opStart.index)
                    };
                } else {
                    const opStart = findFirstOp(eq, ['%', 'mod'])
                    const oppedRange = findOperated(eq, opStart.op, opStart.index)
                };
            } else {
                const opStart = findFirstOp(eq, ['/', '*'])
                const oppedRange = findOperated(eq, opStart.op, opStart.index)
            };
        } else {
            const opStart = findFirstOp(eq, ['^', '**', 'root'])
            const oppedRange = findOperated(eq, opStart.op, opStart.index)

        };
    } else {
        // figure out trig functions here, maybe abs, or else it may end up funky with the cosa^b and whatnot and the computer will crap itself
        const first = findFirstOp(eq, ['|', '('])
        const nestEnd = findExpEnd(eq.substring(first.index + 1, first))
        return evaluate(eq.substring(0, first.index - 1) +
            (first.op === '|' ? ops[abs](evaluate(eq.substring(first.index + 1, nestEnd))) :
                evaluate(eq.substring(first.index + 1, nestEnd))) +
            eq.substring(nestEnd + 1));
    };
};

canvas.onclick = (ev) => {
    //reCenter(ev.button === 0 ? 0.5 : 2, new Point(ev.x / scale + getCanvBL(center).x, ev.y / scale + getCanvBL(center).y));
    graph(getElementValue(eqInput));
};

document.onkeydown = (k) => {
    if (k.key === 'Enter') {
        graph(getElementValue(eqInput));
    };
};

resoSlider.onmousemove = (e) => {
    resoLabel.innerHTML = `resolution (x-px between points) = ${getElementValue(resoSlider)}:`
    global.resolution = getElementValue(resoSlider)
}


const graph = (eq) => {
    clear();
    const points = []
    for (let x = 0; x < width; x += global.resolution) {
        const trueX = x / global.scale + getCanvBL(global.center).x;
        points.push(new Point(trueX, evaluate(eq, trueX)));
    };
    displayGraph(points.map(p => p.trueToCanv()));
};