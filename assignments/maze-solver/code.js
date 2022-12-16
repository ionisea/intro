const rotate = (cx, cy, x, y, angle) => {
    let radians = (Math.PI / 180) * angle;
    cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

//vector manipulation
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
const addGrav = (obj, array) =>{
const gravAttraction = (o1, o2) => {
  const angle = Math.atan2(o2.centerY - o1.centerY, o2.centerX - o1.centerX)
  const distance = Math.hypot(Math.abs(o1.centerX - o2.centerX), Math.abs(o1.centerY - o2.centerY))
  if (distance === 0) return vector(0,0)
  else return vector(angle, (o1.mass * o2.mass * 6.6743e-11) / distance ** 2)
}
for (const element of array){
  obj.actingForce.push(gravAttraction(obj, element))
}
}
const addNumVectors = (a, mode) => {
  if (mode === 'degrees') {
    const r = a.reduce((acc, x) => add2Vectors([acc, x]), vector(0, 0))
    r.angle = r.angle * 180 / Math.PI
    return r
  } else {
    return a.reduce((acc, x) => add2Vectors([acc, x]), vector(0, 0))
  }
}

// shape/object manipulation
const ObjArray = []
let CoordsArray = []

const getBoundOfObject = (shape)=>{
    let currX = 0;
    let currY = 0;
    let array = []
    let n;
    for (let i = 0; i < shape.sides.length; i++) {
        let rotatedSideCords = rotate(shape.centerX, shape.centerY, shape.centerX + shape.sides[i].xAdd, shape.centerY + shape.sides[i].yAdd, shape.rotation)
        let numOfSidePixels = Math.floor(Math.sqrt(shape.sides[i].xAdd ** 2 + shape.sides[i].yAdd ** 2))
        let xAddperpix = (rotatedSideCords[0] - shape.centerX) / numOfSidePixels
        let yAddperpix = (rotatedSideCords[1] - shape.centerY) / numOfSidePixels

        for (n = 0; n < numOfSidePixels; n++) {
            array.push({ "x": shape.centerX + (currX + (xAddperpix * n)), "y": shape.centerY + (currY + (yAddperpix * n)) })

        }
        currX = currX + (xAddperpix * n);
        currY = currY + (yAddperpix * n);
    }
    return array;
}
// registerOn.. functions are in quotes as they will not work in this environment
//registerOnClick((x,y) =>{
const simulateClick = (x,y) =>{
CoordsArray.push({x, y})
}
//})


class Shape {
 constructor(mass, actingForces, coordArray){
   this.startingX = coordArray[0].x
   this.startingY = coordArray[0].y
   this.sides = createSides(coordArray)
   this.mass = mass
   // todo this.centerX =
   // todo this.centerY =  
   this.rotation = 0
   this.actingForce = [addNumVectors(actingForces)]
 }
 clearCoordsArray(){
   CoordsArray = []
 }
}


const createSides = (array) =>{
  const returnArray = []
  for (let v = 0; v<array.length-1; v++){
    returnArray.push({xMove: array[v].x - array[v+1].x, yMove: array[v].y - array[v+1].y})
  }
  returnArray.push({xMove: array[array.length-1].x - array[0].x, yMove: array[array.length-1].y - array[0].y})
  return returnArray
}
//registerOnKeyDown((Space)=>{
  const simulateSpacePress = (mass, actingforces) =>{
  ObjArray.push(new Shape(mass, actingforces, CoordsArray))
  }
//})

// draw on canvas and make changes to shapes
const drawShape = (shape) =>{
      let rotaionalPercent = shape.rotation;
      let currX = shape.x;
      let currY = shape.y;
      for(let i = 0; i<shape.sides.length; i++){
        drawLine(currX, currY, currX+shape.sides[i].xAdd, currY+shape.sides[i].yAdd, 'black', ctx);
        currX += shape.sides[i].xAdd;
        currY += shape.sides[i].yAdd;
      }
}

const drawFrame = (time) => {
  if (time > next) {
    
    clear();
    for (const element of ObjArray){
    addGravity(element, ObjArray)
    addNumVectors(element.actingForce)
    const objectBound = element.getBoundOfObject();
    console.log(objectBound);

    element.drawShape();
    element.rotation = countFrame*1;
    next += 10;
    countFrame++;
  }}
}
