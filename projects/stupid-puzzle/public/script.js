import { setCanvas, drawLine, drawCircle, drawFilledCircle, drawFilledRect, width, height } from './graphics.js';

// Get the element object reperesenting the canvas defined in the HTML.
const canvas = document.getElementById('screen')
const genRandArr =() => {
  const arr = []
  while (arr.length < 20){
    const h = Math.floor(Math.random()*20 +1);
    if (!arr.some((e) => e == h)){
      arr.push(h)
    }
  }
  console.log (arr);
  return arr;
}
const globals = {
  pieceArray: genRandArr(),

}

// This call installs the canvas element so the draw functions from graphics.js
// will work. It also sets the width and height variables to the size of the
// canvas.
setCanvas(canvas);
const board = () =>{
  //main rect
  drawFilledRect(width/3, height/3-8, width/3, height/3+16, 'grey')
  //sides
  drawFilledCircle(width*2/3, height/2, height/6+ 8, 'grey')
  drawFilledCircle(width/3, height/2, height/6+ 8, 'grey')
  //bottom node
  drawFilledCircle(width/2, height*0.35, height/6+ 8, 'grey')
  drawFilledCircle(width/2, height*0.35, height/6, 'mediumslateblue')
}

canvas.onclick = (e) => { 

};
board();