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
  drawGraph,
} from "./graphics.js";

const canvas = document.getElementById("screen");
setCanvas(canvas);

const avgArrZs = (arr) => arr.reduce((acc, e) => acc + e.z, 0) / arr.length

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
    const coords = scene.display(this.vertices);
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
    //drawGraph(0.02, 'black', 1)
    this.layers.forEach((l) => l.draw(this));
  }

  addPoint(x, y, depth) {
    const xAngleDiff = ((x - this.camera.x - width / 2) / width) * Math.PI; // assuming 10px = 1deg
    const yAngleDiff = ((y - this.camera.y - height / 2) / height) * Math.PI; // assuming 10px = 1deg
    const trueX = /*this.camera.x +*/ depth * Math.tan(xAngleDiff);
    const trueY = /*this.camera.y + */depth * Math.tan(yAngleDiff);
    this.points.push(new Point(trueX, trueY, depth));
  }

  display(vertices) {
    return vertices.map((p) => {
      const xAngle = angle(p, this.camera, "x", 'y');
      const yAngle = angle(p, this.camera, "y", 'x');
      return {
        x: (xAngle / Math.PI) * width + width / 2,
        y: (yAngle / Math.PI) * height + height / 2,
        z: p.z,
      };
    });
  }

  finishLayer() {
    this.layers.push(new Layer(this.points, document.getElementById('layerColor').value));
    this.points = [];
  }

  moveCamera({ x, y }) {
    this.camera.x += x;
    this.camera.y += y;
  }
}

const angle = (a, b, comp, nonComp) => Math.atan2(a[comp] - b[comp], Math.abs(Math.hypot(a.z - b.z, a[nonComp] - b[nonComp])));

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
    scene.layers = scene.layers.sort((a, b) => avgArrZs(b.vertices) - avgArrZs(a.vertices))
  } else if (k.key in directions) {
    scene.moveCamera(directions[k.key]);
  }
  scene.draw();
};
