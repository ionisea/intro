const product = (arr) => {
  if (arr.length === 0){
  return 1
  } else {
    return arr[0] * product(arr.slice(1))
  }
}

const sumSquares = (n) => {
  if (n === 0) {
    return 0
  } else {
    return n**2 + sumSquares(n-1)
  }
}

const lucas = (n) => {
  if (n === 0) {
    return 2;
  } else if (n === 1) {
    return 1;
  } else {
    return lucas(n-1) + lucas(n-2)
  }
}