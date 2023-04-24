import { setCanvas, drawCircle, width, height } from './graphics.js';
setCanvas(document.getElementById('screen'))

const input = document.getElementById('eq')

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
};

let bl = new Point(0,0) //bottom left coord
let scale = 0.2 //px per unit
