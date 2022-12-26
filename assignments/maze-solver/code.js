drawFilledRect(0, 0, width, height, 'black')
const ObjArray = []
let CircleCoords = []
const drawnCircle = (coordArray) => {
  if (coordArray.length == 2){
    const radius = Math.hypot(Math.abs(coordArray[0].x-coordArray[1].x),Math.abs(coordArray[0].y-coordArray[1].y))
    drawCircle(coordArray[0].x, coordArray[0].y, radius, 'white')
    drawLine(coordArray[0].x, coordArray[0].y, coordArray[1].x, coordArray[1].y, 1, 'white')
    CircleCoords = []
  }
}

registerOnclick((x, y) => {
  drawFilledCircle(x, y, 2, CircleCoords.length < 1 ? 'red' : 'white')
  CircleCoords.push({ x, y })
  drawnCircle(CircleCoords)
})