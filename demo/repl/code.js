/*
// Warning! Do not call this function with numbers much bigger than 40 unless
// you want to kill this tab.
const fib = (n) => (n < 2 ? n : fib(n - 2) + fib(n - 1));

// This one you can safely call with as big numbers as you want though after
// MAX_FIB_N it will return Infinity.
const fib2 = (n) => {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
    if (!isFinite(a)) break;
  }
  return a;
};

const MAX_FIB_N = 1476;

const MAX_FIB = fib2(MAX_FIB_N);
*/
const getAcceleration = (force, mass, appliedTime) => force/mass*appliedTime
const getVelocity = (force, mass, appliedTime, fps) => getAcceleration(force, mass, appliedTime) * (1/fps)
const dispTest = (vel, angle) =>{
  const h = vel
  const p = Math.cos(angle * Math.PI /180) * h
  const b = Math.sqrt(h**2 - p**2)
  return {xChange: b+10**-15, yChange: p+10**-15}
}