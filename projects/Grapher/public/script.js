import { setCanvas, drawCircle, width, height } from './graphics.js';
setCanvas(document.getElementById('screen'))

const input = document.getElementById('eq');
const getCurrentEquation = () => input.value;


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
};

let center = new Point(width / 10, height / 10); //center coord
let scale = 5; //px per unit
let resolution = 1; //px between points


const reCenter = (mult, newCenter) => {
    center = newCenter;
    scale *= mult;
};

const evaluate = (eq, x) => { //things js cannot understand: 'x(), (x-y)(2), etc' 'trigfunction()' 'a mod (or things like it) b'
    if (x != undefined) evaluate(eq.replaceAll('x', `(${x})`))
    if (eq.indexOf('(') === -1) {
        //go into deeper level evaluation, could just use eval func for some of this i suppose
    } else {
        return evaluate(eq.substring(eq.indexOf('('), eq.indexOf(')')))
    }
}

const graph = (eq, x) =>{
    const accumulate = []
   // for (let x = (center-width/2); x < )
}