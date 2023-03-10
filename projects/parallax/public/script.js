import { setCanvas, drawCircle, drawFilledCircle, clear, width, height, animate, now, drawFilledPolygon, drawPolygon, registerOnClick, registerOnKeyDown, randColor, drawFilledRect, } from './graphics.js';
const canvas = document.getElementById('screen')
setCanvas(canvas)
/* used for a physics class thing ignore
const randomizeArrayOrder = arr => {
  const rand = []
  while (rand.length < arr.length) {
    const e = arr[Math.round(Math.random() * arr.length)]
    if (rand.find(val => val === e) === undefined) {
      rand.push(e)
    }
  }
  return rand
}*/

class point {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  dist3D(point2) {
    return Math.hypot(Math.abs(this.x - point2.x), Math.abs(this.y - point2.y), Math.abs(this.z - point2.z))
  }
}


let camCoords = new point(0, 0, 0)
const layerArray = []
let pointArr = []

class layer {
  constructor(vertices, color) {
    this.vertices = vertices
    this.color = color
  }

  drawLayer() {
    const canvPositions = this.vertices.map((p) => {
      const xAngle = Math.atan2(p.x - camCoords.x, p.z - camCoords.z) //using minus for zoom in / out
      const yAngle = Math.atan2(p.y - camCoords.y, p.z - camCoords.z)
      return { x: xAngle * 1200 / Math.PI + width / 2, y: yAngle * 600 / Math.PI + height / 2, z: p.z }
    })
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
  drawFilledCircle(ev.x, ev.y, 2, 'black')
  const depth = parseInt(document.getElementById('depth').value)
  const xAngleDiff = (ev.x - width / 2 - camCoords.x) / width * Math.PI // assuming 10px = 1deg
  const yAngleDiff = (ev.y - height / 2 - camCoords.y) / height * Math.PI // assuming 10px = 1deg
  const trueX = camCoords.x + depth * Math.tan(xAngleDiff)
  const trueY = camCoords.y + depth * Math.tan(yAngleDiff)
  pointArr.push(new point(trueX, trueY, depth))
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
    camCoords.x += 10
    drawLayerArray(layerArray)
  } else if (k.key == 'ArrowLeft') {
    camCoords.x -= 10
    drawLayerArray(layerArray)
  } else if (k.key == 'ArrowUp') {
    camCoords.y -= 10
    drawLayerArray(layerArray)
  } else if (k.key == 'ArrowDown') {
    camCoords.y += 10
    drawLayerArray(layerArray)
  }
}

