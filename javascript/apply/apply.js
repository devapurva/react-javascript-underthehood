// Extend the Function prototype with a custom "myApply" method
Function.prototype.myApply = function(thisArg, argsArr) {
  // 1. Check that the current context is actually a function.
  //    If it's not, throw a TypeError as only functions can be applied.
  if (typeof this !== 'function') {
    throw new TypeError('myApply must be called on a function');
  }

  // 2. Process the 'thisArg':
  //    - In non-strict mode, if `thisArg` is null or undefined, default to the global object.
  //    - Use Object(thisArg) to ensure that primitives (like numbers or strings) are converted to objects.
  //    Note: In strict mode, the native apply() leaves null/undefined as-is, but this implementation
  //    uses a simplified approach for demonstration.
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : globalThis;

  // 3. Create a unique Symbol that will serve as a temporary key on the thisArg object.
  //    Symbols guarantee uniqueness so that we don't accidentally override an existing property.
  const fnSymbol = Symbol();

  // 4. Temporarily assign the function (the context 'this') to the thisArg object using the unique Symbol.
  //    This allows us to call the function with the correct 'this' context.
  thisArg[fnSymbol] = this;

  let result; // Variable to store the result of the function call

  // 5. Check if an arguments array is provided:
  //    - If no arguments are passed (argsArr is falsy), simply call the function without arguments.
  if (!argsArr) {
    result = thisArg[fnSymbol]();
  } else {
    // 6. Validate that argsArr is an array-like object. It must be of type 'object' and have a numeric 'length' property.
    if (typeof argsArr !== 'object' || typeof argsArr.length !== 'number') {
      throw new TypeError('CreateListFromArrayLike called on non-object');
    }
    // 7. Use the spread operator to "unpack" the array-like object into individual arguments,
    //    then call the function with those arguments. Under the hood, the spread operator handles
    //    iterating over the array-like object.
    result = thisArg[fnSymbol](...argsArr);
  }
  
  // 8. Clean up by removing the temporary property from the thisArg object, so that we don't modify it permanently.
  delete thisArg[fnSymbol];

  // 9. Return the result of the function call.
  return result;
};

// Example usage for testing the custom myApply:
// Imagine a function that concatenates a greeting with a name from its 'this' context.
function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}

// Define a context object with a name property.
const context = { name: "Alice" };

// Create a proper array for simplicity; you can also use array-like objects.
// Here, the arguments are "Hello" and "!".
const args = ["Hello", "!"];

// Use the custom myApply to call the greet function with the provided context and arguments.
const message = greet.myApply(context, args);
console.log(message); // Expected output: "Hello, Alice!"