const add = (a, b) => {
  if (b === 0) {
    return a;
  } else {
    return 1 + add(a, b - 1);
  };
};

const multiply = (a, b) => {
  if (b === 0) {
    return 0;
  } else {
    return a + multiply(a, b - 1);
  };
};

const double = (n, a) => {
  if (a === 0) {
    return n;
  } else {
    return double(n * 2, a - 1);
  };
};

const triple = (n, a) => {
  if (a === 0) {
    return n;
  } else {
    return triple(n * 3, a - 1);
  };
};

const power = (n, a) => {
  if (a === 0) {
    return 1
  } else {
    return n * power(n, a - 1)
  }
}

const deleteXs = (str) => {
  if (!str.split('').some(x => x === 'x')) {
    return str;
  } else if (str[0] === 'x') {
    return deleteXs(str.substring(1));
  } else {
    return deleteXs(str.substring(1) + str[0]);
  } // (: (:
}

const countXs = (str) => { //it doesnt use index of !! (:::
  if (str.split('').every(x => x === 'x')) {
    return str.length;
  } else if (str[0] === 'x') {
    return countXs(str.substring(1) + 'x');
  } else {
    return countXs(str.substring(1));
  };
};

const maximum = (arr) => {
  if (typeof (arr[0]) === 'undefined') { // in hindsight this could've used length === 0
    return -Infinity
  } else if (arr.length === 1) {
    return arr[0]
  } else if (arr[0] < arr[1]) {
    return maximum(arr.slice(1))
  } else {
    return maximum([arr[0]].concat(arr.slice(2)))
  }
}

const every = (arr, p) => {
  if (arr.length === 0) {
    return true
  } else if (!p(arr[0])) {
    return false
  } else {
    return every(arr.slice(1), p)
  }
}

const some = (arr, p) => {
  if (arr.length === 0) {
    return false
  } else if (p(arr[0])) {
    return true
  } else {
    return some(arr.slice(1), p)
  }
}