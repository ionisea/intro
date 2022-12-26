//convenience functions
const degToRad = (radAngle) => radAngle * 180 / Math.PI
const radToDeg = (degAngle) => degAngle * Math.PI / 180

//vectors
const vector = (angle, magnitude) => {
  return ({ angle: angle * Math.PI / 180, magnitude })
}

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
drawFilledRect(0, 0, width, height, 'black')
const Density = 100 // measured in kg/pixel
const ObjArray = []
let CircleCoords = []
//object
const detectCollision = (object, array) =>{
  for(const element of array){
    if (object.radius+ element.radius < Math.hypot(Math.abs(object.x - element.x), Math.abs(object.y - element.y))){
      return Math.atan2(element.y - object.y, element.x - object.x)
    }
  }
}
class Shape{
  constructor(radius, activeForce, x,y){
    this.mass = (Math.PI * radius) **2
    this.location = {x,y}
  }
}

const drawnCircle = (coordArray) => {
  if (coordArray.length == 3){
    const radius = Math.hypot(Math.abs(coordArray[0].x-coordArray[1].x),Math.abs(coordArray[0].y-coordArray[1].y))
    const force = vector(
    Math.atan2(coordArray[0].y - coordArray[2].y, coordArray[0].x - coordArray[2].x),
    Math.hypot(Math.abs(coordArray[0].x-coordArray[2].x),Math.abs(coordArray[0].y-coordArray[2].y))
    )
    drawCircle(coordArray[0].x, coordArray[0].y, radius, 'white')
    drawLine(coordArray[0].x, coordArray[0].y, coordArray[2].x, coordArray[2].y, 1, 'white')
    ObjArray.push(new Shape(radius, force))
    CircleCoords = []
  }
}

registerOnclick((x, y) => {
  drawFilledCircle(x, y, 2, CircleCoords.length < 1 ? 'red' : 'white')
  CircleCoords.push({ x, y })
  drawnCircle(CircleCoords)
})