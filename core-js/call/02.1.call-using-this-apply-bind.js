
// Variant 1: Direct Invocation (Using this)
Function.prototype.myCallusingThis = function(thisArg, ...args) {
  return this(...args); // Fails to bind `this`, not reliable
};
// ❌ Incorrect — This will not bind thisArg, especially in strict mode.

// Variant 2: Using bind()
Function.prototype.myCallusingBind = function(thisArg, ...args) {
  return this.bind(thisArg, ...args)();
};
// ✅ Correct but inefficient — Creates a new bound function object and invokes it immediately.

// Variant 3: Using apply()
Function.prototype.myCallusingApply = function(thisArg, ...args) {
  return this.apply(thisArg, args);
};
// ✅ Clean and efficient — Uses built-in apply() to spread arguments


// Read understanding-call.md to understand which method is more preferable and why. 