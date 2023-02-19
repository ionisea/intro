import { setCanvas, drawFilledCircle, clear, width, height, animate, now, drawText, drawLine, drawFilledRect, drawCircle, drawRect, } from './graphics.js';
setCanvas(document.getElementById('screen'));

const drawSpace = (maybeLines, maybeCoords, maybeCenterMark) => {
  drawFilledRect(0, 0, width, height, ' #002082')
  if (maybeCenterMark) {
    drawLine(width / 2, height / 2 - 50, width / 2, height / 2 + 50, 'orange', 5)
    drawLine(width / 2 + 50, height / 2, width / 2 - 50, height / 2, 'orange', 5)
  }
  if (maybeLines) {
    for (let i = 0; i < width; i += width / 100) {
      if (maybeCoords) {
        for (let s = 0; s < height; s += height / 100) {
          drawText('(' + i + ', ' + (height - s) + ')', i + 2, s - 2, 'grey', 10)
        }
      }
      drawLine(i, 0, i, height, 'grey', 1)
      drawLine(0, i, width, i, 'grey', 1)
    }
  }
}
drawSpace(false, false, true)

/* rom shapes guide
 * range of motion dictates the range at which the line can "turn" each update
 * it is in radians, 90 degrees = pi radians
 * on random, it will turn some angle in the range given, clockwise or counterclockwise
 * on edges, it will only do the edges of that range
 * 
 * following informations is about edges because they look better
 * > 2 * pi will result in redundancy or breakage in the case of 360/180/0
 * pi is a perfect square, anything greater than that up to 2 pi will probably result in a triangle of some kind
 * anything less can make a shape with more sides or maybe break
 * shapes:
 * 4/3 for equilateral triangles
 * 8/5 pi makes stars (:
 * 1.5 makes right triangles
 * pi makes squares
 * 4/5 makes pentagons
 * 2/3 makes hexagons
 * 1/2 makes octagons
 * 4/9 makes nonagons 
 * etc
 * more sides = rarer to see
*/

const length = 10
const RoM = 2/3 * Math.PI // range of motion (radians) - read above
let angle = 0
let coords = { x: width / 2, y: height / 2 }
let recentArray = []
const maxArrLength = Math.round(4 * Math.PI / RoM) - 1

const checkForShape = () => {
  if (recentArray.length > 1) {
    let checkVal = recentArray[0]
    let count = 0
    let index = 0
    for (const element of recentArray) {
      if ((element === checkVal) && !(element === 0)) {
        count++
        if (count === maxArrLength) {
          recentArray = []
          drawCircle(coords.x, coords.y, length / 2, 'grey', 1)
          return 'fillertest'
        }
      } else {
        recentArray = recentArray.slice(index, -1)
      }
      index++
    }
  }
};

const update = (maybeRandom, maybeResetOffEdge) => {
  const place = maybeRandom ? Math.random() * 2 - 1 : Math.round(Math.random() * 2 - 1);
  recentArray.push(place)
  angle += place * RoM / 2
  const p = Math.cos(angle) * length
  const b = Math.sin(angle) * length
  const newCoords = { x: coords.x + b, y: coords.y + p }
  if (maybeResetOffEdge && ((newCoords.x < 0) || (newCoords.x > width) || (newCoords.y < 0) || (newCoords.y > height))) {
    coords = { x: width / 2, y: height / 2 }
    angle = 0
    update()
  } else {
    drawLine(coords.x, coords.y, newCoords.x, newCoords.y, 'white')
    coords = newCoords
    checkForShape()
  }
};

const preDraw = (count) => {
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      update(false, true)
    }
  }
};
preDraw(100000)

animate((t) => {
  update(false, true)
});
