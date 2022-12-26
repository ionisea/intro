drawFilledRect(0, 0, width, height, 'black')
const Density = 100 // measured in kg/pixel
const ObjArray = []
let CircleCoords = []
const detectCollision = (object, array) =>{
  for(const element of array){
    if (object.radius+ element.radius < Math.hypot(Math.abs(object.x - element.x), Math.abs(object.y - element.y))){
      return Math.atan2()
    }
  }
}
class Shape{
  constructor(radius, activeForce, coordinates){
    this.mass = (Math.PI * radius) **2

  }
}

const drawnCircle = (coordArray) => {
  if (coordArray.length == 2){
    const radius = Math.hypot(Math.abs(coordArray[0].x-coordArray[1].x),Math.abs(coordArray[0].y-coordArray[1].y))
    drawCircle(coordArray[0].x, coordArray[0].y, radius, 'white')
    //drawLine(coordArray[0].x, coordArray[0].y, coordArray[1].x, coordArray[1].y, 1, 'white')
    CircleCoords = []
  }
}

registerOnclick((x, y) => {
  drawFilledCircle(x, y, 2, CircleCoords.length < 1 ? 'red' : 'white')
  CircleCoords.push({ x, y })
  drawnCircle(CircleCoords)
})