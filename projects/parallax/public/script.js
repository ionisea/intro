import {
  setCanvas,
  drawCircle,
  drawFilledCircle,
  clear,
  width,
  height,
  animate,
  now,
  drawFilledPolygon,
  drawPolygon,
  registerOnClick,
  registerOnKeyDown,
  randColor,
  drawFilledRect,
} from "./graphics.js";

const canvas = document.getElementById("screen");
setCanvas(canvas);

class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  distance(other) {
    return Math.hypot(this.x - other.x, this.y - other.y, this.z - other.z);
  }
}

class Layer {
  constructor(vertices, color) {
    this.vertices = vertices;
    this.color = color;
  }
  
  draw(scene) {
    const coords = scene.translate(this.vertices);
    drawFilledPolygon(coords, this.color);
    drawPolygon(coords, "black", 1);
  }
}

class Scene {
  camera = new Point(0, 0, 0);
  points = [];
  layers = [];

  draw() {
    clear();
    this.layers.forEach((l) => l.draw(this));
  }

  addPoint(x, y, depth) {
    const xAngleDiff = ((x - width / 2 - this.camera.x) / width) * Math.PI; // assuming 10px = 1deg
    const yAngleDiff = ((y - height / 2 - this.camera.y) / height) * Math.PI; // assuming 10px = 1deg
    const trueX = this.camera.x + depth * Math.tan(xAngleDiff);
    const trueY = this.camera.y + depth * Math.tan(yAngleDiff);
    this.points.push(new Point(trueX, trueY, depth));
  }

  translate(vertices) {
    return vertices.map((p) => {
      const xAngle = angle(p, this.camera, "x");
      const yAngle = angle(p, this.camera, "y");
      return {
        x: (xAngle * 1200) / Math.PI + width / 2,
        y: (yAngle * 600) / Math.PI + height / 2,
        z: p.z,
      };
    });
  }

  finishLayer() {
    this.layers.push(new Layer(this.points, randColor()));
    this.points = [];
  }

  moveCamera({ x, y }) {
    this.camera.x += x;
    this.camera.y += y;
  }
}

const angle = (a, b, dim) => Math.atan2(a[dim] - b[dim], a.z - b.z);

const currentDepth = () => parseInt(document.getElementById("depth").value);

const scene = new Scene();

const directions = {
  ArrowRight: { x: 10, y: 0 },
  ArrowLeft: { x: -10, y: 0 },
  ArrowUp: { x: 0, y: -10 },
  ArrowDown: { x: 0, y: 10 },
};

canvas.onclick = (ev) => {
  drawFilledCircle(ev.x, ev.y, 2, "black");
  scene.addPoint(ev.x, ev.y, currentDepth());
};

document.onkeydown = (k) => {
  if (k.key == "Enter") {
    scene.finishLayer();
  } else if (k.key in directions) {
    scene.moveCamera(directions[k.key]);
  }
  scene.draw();
};
