//convenience functions
const degToRad = (radAngle) => radAngle * Math.PI / 180
const radToDeg = (degAngle) => degAngle * 180 / Math.PI
const vector = (angle, magnitude) => {angle, magnitude}
const avg = (array) => array.reduce((a,e) => a+e, 0)/array.length
const twoPointAngle = (a, b) => Math.atan2(b.y - a.y, b.x - a.x)
const twoPointDist = (a, b) => Math.hypot(Math.abs(a.x-b.x), Math.abs(a.y-b.y))
//vector manipulation
const add2Vectors = (a) => { // takes array containing 2 vectors
  const x1 = Math.cos(a[0].angle) * a[0].magnitude
  const x2 = Math.cos(a[1].angle) * a[1].magnitude
  const y1 = Math.sin(a[0].angle) * a[0].magnitude
  const y2 = Math.sin(a[1].angle) * a[1].magnitude
  const angle = Math.atan2(y1 + y2, x1 + x2)
  const mag = Math.sqrt((x1 + x2) ** 2 + (y1 + y2) ** 2)
  return ({ angle, magnitude: mag })
}
   
const addNumVectors = (a, mode) => {
  if (mode === 'degrees') {
    const r = a.reduce((acc, x) => add2Vectors([acc, x]), vector(0, 0))
    r.angle = r.angle * 180 / Math.PI
    return r
  } else {
    return [a.reduce((acc, x) => add2Vectors([acc, x]), vector(0, 0))]
  }
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
const evalCollisions = (object) =>{
  const returnObject = object;
  const collisions = [];
  let index = 0;
  for(const element of ObjArray){
    const distance = Math.hypot(Math.abs(object.x - element.x), Math.abs(object.y - element.y))
    if (object.radius + element.radius > distance && distance != 0){
      collisions.push({source: element, index: index, angle: Math.atan2(element.y - object.y, element.x - object.x)})
    }
    index++
  }
  for (const element of collisions){
    returnObject.x = avg([object.x, element.source.x])
    returnObject.y = avg([object.y, element.source.y])
    returnObject.area += element.source.area
    returnObject.radius = Math.sqrt(object.area)/Math.PI
    returnObject.force.concat(element.force)
    // add vectors at some point
    ObjArray[element.index] = []
  }
  return returnObject
}

class Shape{
  constructor(radius, activeForce, x,y){
    this.area = (Math.PI * radius) **2
    this.mass = this.area * Density
    this.x = x
    this.y = y
    this.force = activeForce
    this.radius = radius
  }

}

const drawnCircle = (coordArray) => {
  if (coordArray.length == 3){
    const radius = Math.hypot(Math.abs(coordArray[0].x-coordArray[1].x),Math.abs(coordArray[0].y-coordArray[1].y))
    const force = [vector(
    twoPointAngle(coordArray[0], coordArray[2]),
    Math.hypot(Math.abs(coordArray[0].x-coordArray[2].x),Math.abs(coordArray[0].y-coordArray[2].y))
    )]
    drawCircle(coordArray[0].x, coordArray[0].y, radius, Theme.draw)
    drawLine(coordArray[0].x, coordArray[0].y, coordArray[2].x, coordArray[2].y, 1, 'Theme.draw')
    ObjArray.push(new Shape(radius, force, CircleCoords[0].x, CircleCoords[0].y))
    CircleCoords = []
  }
}

registerOnclick((x, y) => {
  drawFilledCircle(x, y, 2, CircleCoords.length < 1 ? Theme.accents : Theme.draw)
  CircleCoords.push({ x, y })
  drawnCircle(CircleCoords)
})

const nextFrame = () =>{
  for (let element of ObjArray){
    element = evalCollisions(element)
    element.force = addNumVectors(element.force)
  } 
}