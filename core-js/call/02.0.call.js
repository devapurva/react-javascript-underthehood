/**
 * Custom implementation of Function.prototype.call
 * @param {any} thisArg - The value to be used as `this`
 * @param {...*} argArray - The arguments to pass to the function
 * @return {any} - The return value from the invoked function
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
  // Ensure that 'this' is a function
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }

  // If thisArg is null or undefined, default to global object; else coerce to object
  thisArg = thisArg != null && thisArg != undefined ? Object(thisArg) : globalThis;

  // Use a unique symbol to avoid property name collisions
  const funcSym = Symbol();
  // Temporarily assign the function to the object
  thisArg[funcSym] = this;

  // Invoke the function with the provided arguments
  const result = thisArg[funcSym](...argArray);

  // Clean up by deleting the temporary function property
  delete thisArg[funcSym];

  // Return the result of the function invocation
  return result;
};


//Test cases

function sayHello(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Apurva' };

console.log(sayHello.myCall(person, 'Hello', '!'));
// Expected: "Hello, Apurva!"

console.log(sayHello.myCall(null, 'Hey', '?'));
// Expected: "Hey, undefined?" or globalThis-based value

console.log(sayHello.myCall(42, 'Yo', '~'));
// Expected: "Yo, undefined~" (since 42 gets boxed into an object)

