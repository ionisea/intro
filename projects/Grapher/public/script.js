import { setCanvas, drawCircle, width, height } from './graphics.js';

setCanvas(document.getElementById('screen'));

drawCircle(width / 2, height / 2, 100, 'black');
