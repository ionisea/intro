let ctx;
let width;
let height;

const displayGraph = (arr) => {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(arr[0])
  arr.slice(1).forEach(e => ctx.lineTo(e.x, e.y))
  ctx.stroke();
}

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

const drawRect = (x, y, width, height, color, lineWidth = 1) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(x, y, width, height);
};

const drawTriangle = (x1, y1, x2, y2, x3, y3, color, lineWidth = 1) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x1, y1);
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

const clear = () => ctx.clearRect(0, 0, width, height);

export {
  setCanvas,
  drawLine,
  drawCircle,
  drawRect,
  drawTriangle,
  drawFilledCircle,
  drawFilledRect,
  drawFilledTriangle,
  drawText,
  clear,
  width,
  height,
  displayGraph,
};