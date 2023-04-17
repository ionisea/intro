const add = (a, b) => {
  if (b === 0) {
    return a;
  } else {
    return add(a + 1, b - 1);
  };
};

const multiply = (a, b) => { //this one looks improvable
  if (a === 0 || b === 0) {
    return 0;
  } else if (b === 1) {
    return a;
  } else {
    return multiply(a * b, b / b);
  };
};

const double = (n, a) => {
  if (a === 0){
    return n;
  } else {
    return double(n*2, a-1);
  };
};

const triple = (n, a) => {
  if (a === 0){
    return n;
  } else {
    return triple(n*3, a-1);
  };
};

const power = (n, a) =>{
  if (a === 1){
    return n;
  } else {
    return power(n*n, a-1)
  }
}