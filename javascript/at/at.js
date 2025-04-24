Array.prototype.myAt = function(index) {
  // Step 1: Convert `this` to an object (in case it's a string or array-like)
  if (this == null) {
    throw new TypeError('myAt called on null or undefined');
  }

  const obj = Object(this);       // works for arrays and strings
  const len = obj.length >>> 0;   // convert to non-negative integer
  
  // Coerce to number and truncate decimals (like native at does)
   const i = Math.trunc(Number(index)); 

  // Step 2: Handle negative index
  const relativeIndex = i < 0 ? len + i : i;

  // Step 3: Check bounds
  if (relativeIndex < 0 || relativeIndex >= len) {
    return undefined;
  }

  return obj[relativeIndex];
};

//Testing Edge cases

// ✅ Basic positive index
console.log([10, 20, 30].myAt(0));   // 10

// ✅ Basic negative index
console.log([10, 20, 30].myAt(-1));  // 30

// ✅ Out-of-bounds
console.log([1, 2, 3].myAt(5));      // undefined
console.log([1, 2, 3].myAt(-4));     // undefined

// ✅ Works on strings
console.log([...'Apurva'].myAt(-1)); // 'a'
console.log('Apurva'.myAt(0));       // 'A'

// ✅ Sparse arrays
const sparse = [1, , 3];
console.log(sparse.myAt(1));         // undefined (because it's a hole)
console.log(1 in sparse);            // false — confirms it's a hole

// ✅ Non-array-like
try {
  Array.prototype.myAt.call(null, 0); // throws TypeError
} catch (e) {
  console.log(e.message); // 'myAt called on null or undefined'
}