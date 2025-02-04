let ctx;
let width;
let height;
const drawPolygon = (ptArr, color, lineWidth = 1)=> {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(ptArr[0].x, ptArr[0].y);
  ptArr.slice(1).forEach((e) => {
    if ((e.x == width/2) && (e.y == height/2)){
      ctx.moveTo(e.x, e.y)
    } else{
      ctx.lineTo(e.x, e.y)
    }
  });
  ctx.lineTo(ptArr[0].x, ptArr[0].y);
  ctx.stroke();
}

const randColor = () => {
  const chars = 'ABCDEF1234567890'
  let c = '#'
  for (let i = 0; i < 6; i++) {
    c += chars[Math.round(Math.random()*16)-1]
  }
  return c
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
  ctx.font = `${size}px serif`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

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

  document.documentElement.onclick = (e) => {
    running = !running;
    maybeStep();
  };

  maybeStep();
};

export {
  randColor,
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
  now,
  animate,
  drawPolygon,
};
