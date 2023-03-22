let ctx;
let width;
let height;


const setCanvas = (canvas) => {
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
};

const drawLine = (x1, y1, x2, y2, color, width = 1) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

const drawCircle = (x, y, r, color, lineWidth = 1) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
  ctx.stroke();
};

const drawFilledCircle = (x, y, r, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
  ctx.fill();
};

const drawFilledRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const drawFilledTriangle = (x1, y1, x2, y2, x3, y3, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x1, y1);
  ctx.fill();
};

const drawText = (text, x, y, color, size) => {
  ctx.font = `${size}px sans-serif`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

const drawPolygon = (vertices, lineColor, lineWidth = 1) =>{
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y)
  for (const element of vertices.slice(1)){
    ctx.lineTo(element.x, element.y)
  }
  ctx.lineTo(vertices[0].x, vertices[0].y)
  ctx.stroke()
}

const drawFilledPolygon = (vertices, fillColor) =>{
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y)
  for (const element of vertices.slice(1)){
    ctx.lineTo(element.x, element.y)
  }
  ctx.lineTo(vertices[0].x, vertices[0].y)
  ctx.fill()
}

const clear = () => ctx.clearRect(0, 0, width, height);

/*
 * Available to script as convenience.
 */
const now = () => performance.now();

/*
 * Called from script.js to kick off the animation.
 */
const animate = (drawFrame) => {
  let running = true;

  const step = () => {
    drawFrame(performance.now());
    maybeStep();
  };

  const maybeStep = () => {
    if (running) {
      requestAnimationFrame(step);
    }
  };

  maybeStep();
};

export {
  setCanvas,
  drawLine,
  drawCircle,
  drawFilledCircle,
  drawFilledRect,
  drawFilledTriangle,
  drawText,
  clear,
  width,
  height,
  now,
  animate,
  drawFilledPolygon,
  drawPolygon,
};
