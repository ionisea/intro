registerOnclick((x,y) => {
  let acc =0
  let l = 0
  for (let x; x< 250000000; x++){
    l = Math.random()/Math.random()
    if (acc>l)acc=l;
  }
  drawText(acc,x,y,'black',25)
});