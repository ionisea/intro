registerOnclick((x,y) => {
  let acc = 1;
  for (let x=0; x< 250000000; x++){
    const l = Math.round(Math.random()/Math.random())
    acc<l ? acc=l :0;
  }
  drawText(acc,x,y,'black',25)
});