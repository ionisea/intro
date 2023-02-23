import { setCanvas, clear, width, height, animate, now, drawFilledPolygon, drawPolygon, registerOnClick, registerOnKeyDown, randColor, } from './graphics.js';
const canvas = document.getElementById('screen')

// y will probably not change for anything as it is quite difficult to make 3 dimensions work
let camCoords = new point(0, 0, 0)
let camMoveAmount = new point(0, 0, 0)
const layerArray = []
let pointArr = []

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
  }

  drawLayer() {
    drawFilledPolygon(this.vertices, this.color)
  }

}

registerOnClick((x, y) => {
  pointArr
})

registerOnKeyDown((k) => {
  if (k === 'Space') {
    layerArray.push(new layer(pointArr, randColor()))
  } else if (k === 'RightArrow') {
    camMoveAmount.x += 10
  } else if (k === 'LeftArrow') {
    camMoveAmount.x -= 10
  }
})
animate((t) => {
  for (const element of layerArray) {
    element.drawLayer()
  }
});
