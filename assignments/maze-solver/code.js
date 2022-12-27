//convenience functions
const degToRad = (radAngle) => radAngle * Math.PI / 180
const radToDeg = (degAngle) => degAngle * 180 / Math.PI
const vector = (angle, magnitude) => {angle, magnitude}

//vector manipulation

const add2Vectors = (a) => {
  const x1 = Math.cos(a[0].angle) * a[0].magnitude
  const x2 = Math.cos(a[1].angle) * a[1].magnitude
  const y1 = Math.sin(a[0].angle) * a[0].magnitude
  const y2 = Math.sin(a[1].angle) * a[1].magnitude
  const angle = Math.atan2(y1 + y2, x1 + x2)
  const mag = Math.sqrt((x1 + x2) ** 2 + (y1 + y2) ** 2)
  return ({ angle, magnitude: mag })
}

const vectorMultiply = (o, n) => {
  if (n >= 0) {
    return ({ angle: o.angle, magnitude: o.magnitude * n })
  } else {
    return ({ angle: o.angle + Math.PI, magnitude: o.magnitude * -n })
  }
}

//global
let Theme = {background: 'black', draw: 'white', accents: 'red'}
let Density = 100
drawFilledRect(0, 0, width, height, Theme.background) // measured in kg/pixel, redefine in REPL
const ObjArray = []
let CircleCoords = []

//object
const detectCollisions = (object, array) =>{
  const collisions = []
  for(const element of array){
    const distance = Math.hypot(Math.abs(object.x - element.x), Math.abs(object.y - element.y))
    if ((object.radius + element.radius > distance) && (distance != 0)){
      collisions.push({object: array.findIndex(element), angle: Math.atan2(element.y - object.y, element.x - object.x)})
    }
  }
  return collisions
}

class Shape{
  constructor(radius, activeForce, x,y){
    this.mass = (Math.PI * radius) **2 * Density
    this.location = {x,y}
    this.force = activeForce
  }

}

const drawnCircle = (coordArray) => {
  if (coordArray.length == 3){
    const radius = Math.hypot(Math.abs(coordArray[0].x-coordArray[1].x),Math.abs(coordArray[0].y-coordArray[1].y))
    const force = [vector(
    Math.atan2(coordArray[2].y - coordArray[0].y, coordArray[2].x - coordArray[0].x),
    Math.hypot(Math.abs(coordArray[0].x-coordArray[2].x),Math.abs(coordArray[0].y-coordArray[2].y))
    )]
    drawCircle(coordArray[0].x, coordArray[0].y, radius, Theme.draw)
    drawLine(coordArray[0].x, coordArray[0].y, coordArray[2].x, coordArray[2].y, 1, 'Theme.draw')
    ObjArray.push(new Shape(radius, force, CircleCoords[0]))
    CircleCoords = []
  }
}

registerOnclick((x, y) => {
  drawFilledCircle(x, y, 2, CircleCoords.length < 1 ? Theme.accents : Theme.draw)
  CircleCoords.push({ x, y })
  drawnCircle(CircleCoords)
})