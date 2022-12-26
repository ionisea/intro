drawFilledRect(0,0,width,height, 'black')
const ObjArray = []
let CircleDraw = []


registerOnclick((x, y) => {
  drawFilledCircle(x, y, 2, CircleDraw.length < 2 ? 'red' : 'black')
  CircleDraw.push({ x, y })

})