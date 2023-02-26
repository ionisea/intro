import { setCanvas, drawFilledCircle, clear, width, height, animate, now, drawFilledPolygon, drawPolygon, registerOnClick, registerOnKeyDown, randColor, drawFilledRect, } from './graphics.js';
const canvas = document.getElementById('screen')


class point {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  hypot(point, dim1, dim2) { //I may use dims later to compare y axis
    Math.hypot(Math.abs(this.x - point.x), Math.abs(this.z - point.z))
  }

  angle(point, dim1, dim2) {
    Math.atan2(this.z - point.z, this.x - point.x)
  }
}

class layer {
  constructor(vertices, color) {
    this.vertices = vertices
    this.color = color
    pointArr = []
  }

  drawLayer() {
    const canvPos = this.vertices
    drawFilledPolygon(this.vertices, this.color)
    drawPolygon(this.vertices, this.color)
  }

}

// y will probably not change for anything as it is quite difficult to make 3 dimensions work
let camCoords = new point(0, 0, 0)
let camMoveAmount = new point(0, 0, 0)
const layerArray = []
let pointArr = []
let running = false


registerOnClick((x, y) => {
  drawFilledCircle(x, y, 1, 'black')
  const depth = document.getElementById('depth').value
  const xAngleDiff = width/ (camCoords.x - x) * Math.PI
  const yAngleDiff = height / (camCoords.y - y) * Math.PI
  const trueX = depth * Math.tan(xAngleDiff)
  const trueY = depth * Math.tan(yAngleDiff)
  pointArr.push(new point(trueX, trueY, depth))
})

registerOnKeyDown((k) => {
  console.log(k)
  if (k === 'Enter') {
    layerArray.push(new layer(pointArr, randColor()))
  } else if (k === 'RightArrow') {
    camMoveAmount.x += 10
  } else if (k === 'LeftArrow') {
    camMoveAmount.x -= 10
  }
})

animate((t) => {
  if (running) {
    clear()
    // math to figure out how much to move
    for (const element of layerArray) {
      element.drawLayer()
    }
  }
});
