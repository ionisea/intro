import { setCanvas, drawCircle, drawFilledCircle, clear, width, height, animate, now, drawFilledPolygon, drawPolygon, registerOnClick, registerOnKeyDown, randColor, drawFilledRect, } from './graphics.js';
const canvas = document.getElementById('screen')
setCanvas(canvas)
/* used for a physics thing ignore
const randomizeArrayOrder = arr => {
  const rand = []
  while (rand.length < arr.length) {
    const e = arr[Math.round(Math.random() * arr.length)]
    if (rand.find(val => val === e) === undefined) {
      rand.push(e)
    }
  }
  return rand
}

*/

class point {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  hypot(point, dim1, dim2) { //I may use dims later to compare y axis
    return Math.hypot(Math.abs(this.x - point.x), Math.abs(this.z - point.z))
  }

  angle(point, dim1, dim2) { //comment above
    return Math.atan2(this.x - point.x, point.z)
  }
}

// y will probably not change for anything as it is quite difficult to make all 3 dimensions work
let camCoords = new point(0, 0, 0)
//let camMoveAmount = new point(0, 0, 0)
const layerArray = []
let pointArr = []
let running = false

class layer {
  constructor(vertices, color) {
    this.vertices = vertices
    this.color = color
  }

  drawLayer() {
    const canvPositions = this.vertices.map((p) => {
      const angle = Math.atan2(camCoords.x - p.x, p.z) //camCoords.angle(p)
      console.log(camCoords, angle, p.x)
      return { x: angle * 1800 / Math.PI + width/2, y: p.y, z: p.z }
    })
    console.log(canvPositions, 'canv pos')
    drawFilledPolygon(canvPositions, this.color)
    drawPolygon(canvPositions, 'black', 1)
  }
}

const drawLayerArray = (arr) => {
  clear();
  for (const element of arr) {
    element.drawLayer()
  }
}

canvas.onclick = (ev) => {
  if (!running) {
    drawFilledCircle(ev.x, ev.y, 2, 'black')
    const depth = parseInt(document.getElementById('depth').value)
    const xAngleDiff = ( ev.x- camCoords.x) / 1800 * Math.PI // 120 deg
    //const yAngleDiff = height / (camCoords.y - ev.y) * (1/3 * Math.PI) // 60 deg, may implement later
    const trueX = camCoords.x + depth * Math.tan(xAngleDiff) // atan(trueXDistFromCamcoord / depth) to get canvas coord
    //const trueY = camCoords.x + depth * Math.tan(yAngleDiff) // may use when implementing y changes
    pointArr.push(new point(trueX, ev.y, depth))
  }
}

document.onkeydown = (k) => {
  console.log(k)
  if (k.key == 'Enter') {
    layerArray.push(new layer(pointArr, randColor()))
    //console.log(layerArray)
    drawLayerArray(layerArray)
    pointArr = []
  } else if (k.key == 'Space') {
    running = !running
  } else if (k.key == 'ArrowRight') {
    camCoords.x -= 10
    drawLayerArray(layerArray)
  } else if (k.key == 'ArrowLeft') {
    camCoords.x += 10
    drawLayerArray(layerArray)
  }
}

animate((t) => {
  if (running) {
    drawLayerArray(layerArray)
  }
});
