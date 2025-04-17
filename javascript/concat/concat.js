Array.prototype.myConcat = function (...args) {
  const result = [];
  let resultIndex = 0;

  const addToResult = (item) => {
    result[resultIndex++] = item;
  };

  const copyItems = (source) => {
    const len = source.length;

    for (let i = 0; i < len; i++) {
      // Even if it's a hole, we assign — this preserves it
      result[resultIndex++] = source[i];
    }
  };

  // 1. Copy from `this`
  copyItems(this);

  // 2. Loop over each argument
  for (const arg of args) {
    const isSpreadable =
      arg != null && typeof arg === 'object' &&
      (arg[Symbol.isConcatSpreadable] === true || Array.isArray(arg));

    if (isSpreadable) {
      copyItems(arg);
    } else {
      addToResult(arg);
    }
  }

  return result;
};


const a = [1, , 3];             // sparse array
console.log(a.myConcat([4]));   // [1, <1 empty>, 3, 4]

const obj = { 0: 'x', 1: 'y', length: 2, [Symbol.isConcatSpreadable]: true };
console.log([1].myConcat(obj)); // [1, 'x', 'y']

console.log([1].myConcat(2, [3], [[4]])); // [1, 2, 3, [4]]

console.log([].myConcat(null, undefined)); // [null, undefined]

console.log([].myConcat({ 0: 'a', 1: 'b', length: 2 })); // [{ 0: 'a', 1: 'b', length: 2 }]
