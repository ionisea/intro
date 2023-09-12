import { setCanvas, drawLine, drawCircle, width, height } from './graphics.js';

// Get the element object reperesenting the canvas defined in the HTML.
const canvas = document.getElementById('screen')

// This call installs the canvas element so the draw functions from graphics.js
// will work. It also sets the width and height variables to the size of the
// canvas.
setCanvas(canvas);

// Keep track of the most recently clicked point.
let previous = null;

// Intall a click handler on the canvas that whenever the user clicks translates
// the events offsetX and offsetY properties (which are bascially the position
// on the canvas of the click) to a new point and draws a small circle. Also
// after the first click it draws a line from the previously clicked point to
// the new point.
canvas.onclick = (e) => {

  // Make a point object for the point that was just clicked.
  const p = { x: e.offsetX, y: e.offsetY };

  // Draw a circle at the new point.
  drawCircle(p.x, p.y, 5, 'black');

  // If the previously clicked point p is not null, i.e. we've been clicked at
  // least once already, draw a line between the previous point and the new
  // point.
  if (previous !== null) {
    drawLine(previous.x, previous.y, p.x, p.y, 'black');
  }

  // Make the new point the new value of the previous point.
  previous = p;
};
