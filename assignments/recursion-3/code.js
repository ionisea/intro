const product = (arr) => {
  if (arr.length === 0){
  return 1
  } else {
    return arr[0] * product(arr.slice(1))
  }
}

const sumSquares = (n) => {
  if (n === 1) {
    return 1
  } else {
    return 2*sumSquares(n-1)
  }
}