# 🧠 Understanding JavaScript's `Function.prototype.call()`

---

## 1\. What is `call()`?
------------------------

The `call()` method lets you manually set the `this` value for a function and immediately execute it.
Think of it like saying:
> "Run this function, but pretend you're inside **this object** while doing it."

`Function.prototype.call()` is a built-in method that allows you to invoke a function with a specified `this` context and individual arguments.

```js

function greet(lang, punc) {

  console.log(`${this.name} says hi in ${lang}${punc}`);

}

const user = { name: 'Apurva' };

greet.call(user, 'JavaScript', '!');

// Apurva says hi in JavaScript!

```

---

## 2\. Syntax
--------------

```js

func.call(thisArg, arg1, arg2, ...)

```

- **thisArg**: The object to bind as `this`.

- **arg1, arg2, ...**: Arguments passed to the function.

- **Returns**: The result of the function.

---

## 3\. Common Use Cases
------------------------

### ✅ Borrowing Methods:

```js

[].slice.call(arguments); // Turns array-like into array

```

### ✅ Dynamic Context Binding:

```js

const log = function(msg) {

  console.log(`${this.prefix}: ${msg}`);

};

log.call({ prefix: 'Info' }, 'Call used here');

```

---

## 4\. 🔍 Under-the-Hood Insight
----------------------------------

- `call()` doesn't return a new function like `bind()`; it **executes immediately**.

- Unlike `apply()`, which takes an array of arguments, `call()` takes arguments **individually**.

```js

func.call(thisArg, ...args);      // call()

func.apply(thisArg, [ ...args ]); // apply()

```

---

## 5\. ✅ Checklist for Mimicking `call()`
--------------------------------------------------

1\. Defined on `Function.prototype`

2\. Accepts a `thisArg` and individual arguments

3\. Coerces primitive `thisArg` to an object (or uses globalThis)

4\. Temporarily assigns the function to `thisArg`

5\. Invokes the function with arguments

6\. Deletes the temporary property after use

7\. Returns the result of the function

---

## 6\. 🧪 Custom Implementation using `Symbol()`
------------------------------------------------

```js

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

```

### 🔎 Why `Symbol()` over `this`, `bind` or `apply`:

- Validates that the context is a function

- Coerces `thisArg` to an object or falls back to `globalThis`

- Uses `Symbol()` to avoid overwriting existing properties

- Executes the function and removes the temporary key afterward

**📦 Works with:**
	•	Primitive thisArg like numbers/strings/booleans ✅
	•	null or undefined in non-strict mode ✅
	•	Any number of arguments ✅
	•	Returns correct result ✅

⸻

**🔍 Extra Notes**
	•	We use Symbol() to avoid overwriting any existing key on the object.
	•	Unlike bind(), call() executes the function immediately.
	•	If you were in strict mode, thisArg would remain null/undefined, but in our custom version, we’re mimicking non-strict mode, like native behavior.

⸻


---

## 7\. ⚖️ Alternate Ways to Mimic `call()`

### Variant 1: Direct Invocation

```js

Function.prototype.myCall = function(thisArg, ...args) {

  return this(...args); // Fails to bind `this`, not reliable

};

```

**❌ Incorrect** --- This will not bind `thisArg`, especially in strict mode.

---

### Variant 2: Using `bind()`

```js

Function.prototype.myCall = function(thisArg, ...args) {

  return this.bind(thisArg, ...args)();

};

```

**✅ Correct but inefficient** --- Creates a new bound function object and invokes it immediately.

---

### Variant 3: Using `apply()`

```js

Function.prototype.myCall = function(thisArg, ...args) {

  return this.apply(thisArg, args);

};

```

**✅ Clean and efficient** --- Uses built-in `apply()` to spread arguments

---

### Variant 4: Using `Symbol()` (Recommended)

*(Already defined in Section 6)*

- Safe from property collision

- Closer to how native `call()` is internally handled

---

## 8\. 🎓 How to Explain in Interviews

- "I mimicked `call()` by temporarily assigning the function to the target object."

- "To avoid property collisions, I used a `Symbol()` as the key."

- "After execution, I removed the temporary property and returned the result."

- "I also validated that the context is a function and coerced primitives using `Object()`"

---

## 9\. 🚀 What's Next?

- Rebuild bind() from scratch and compare its delayed execution behavior

- Explore edge cases in call() when used with null/undefined or primitive thisArg

- Benchmark performance across call(), bind(), apply() and custom versions

- Use call() to polyfill behavior in older JS methods or array-like transformations

- Combine call() with closures or currying for advanced interview prep

---

If you need further clarification or more examples, feel free to ask me on [LinkedIn](https://www.linkedin.com/in/apurva-wadekar/) or [Send me an email](mailto:devapurva94@gmail.com) !
For more details, you can refer to MDN Web Docs on [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

---