import { setCanvas, drawCircle, width, height } from './graphics.js';
setCanvas(document.getElementById('screen'))
const canvas = document.getElementById('screen')
const input = document.getElementById('eq');

const getElementValue = (e) => e.value;


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    translate(dir){

    }
};

let center = new Point(width / 10, height / 10); //center coord
let scale = 5; //px per unit
let resolution = 1; //px between points

const getCanvBL = (ctr) =>  new Point(ctr - width/2/scale, ctr - height/2/scale)

const reCenter = (mult, newCenter) => { //for later zoom in/out
    center = newCenter;
    scale *= mult;
};

const evaluate = (eq, x) => { //things js cannot understand: 'x(), (x-y)(2), etc' 'trigfunction()' '|num|' 'a mod (or things like it) b' 'num!'
    if (x != undefined) evaluate(eq.replaceAll('x', `(${x})`))
    if (eq.indexOf('(') === -1) {
        //go into deeper level evaluation, could just use eval func for some of this i suppose
    } else {
        return evaluate(eq.substring(eq.indexOf('(')+1, eq.indexOf(')')-1))
    }
}

canvas.onclick = (ev) => {
    reCenter(ev.button === 0 ? 0.5 : 2, )
}

const graph = (eq, x) =>{
    const accumulate = []
    for (let x = (getCanvasBL ); x < center + width/2 * (1/scale); x++){

    }
}