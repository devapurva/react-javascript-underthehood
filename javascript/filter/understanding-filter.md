# 🧠 Understanding `Array.prototype.filter()` and Building Your Own

## 1. What is `filter()`?

The `filter()` method is just like it's name - you give it a bunch of items (an array) and a rule (a function), and it returns only the items that match the rule.

`Array.prototype.filter()` creates a new array with all elements that pass the test implemented by the provided callback function.

```js

const numbers = [1, 2, 3, 4, 5];

const evens = numbers.filter((num) => num % 2 === 0);

console.log(evens); // [2, 4]

```

### Accepted Arguments:

- **callbackFn**: A function to test each element.

  - Receives `value`, `index`, and the `array`.

- **thisArg** *(optional)*: Value to use as `this` when executing `callbackFn`.

---

## 2. What is `thisArg`?

### 🧠 `thisArg`:

An optional parameter that defines what `this` should refer to inside your `callbackFn`.

```js

const obj = { threshold: 5 };

const arr = [4, 10];

arr.filter(function (value) { // when using thisArg, don't use arrow function

  return value > this.threshold; // 'this' refers to 'obj'

}, obj);

```

If you don't use `thisArg`, `this` will be `undefined` or the global object depending on the environment.

#### ⚠️ Bonus Tips:
•	Always use `function()` when you want to support thisArg.
•	Arrow functions `() => {}` ignore thisArg, so stick to regular functions for max flexibility

---

### ⚙️ Under the Hood (How it works step-by-step)

1\.	The array calls filter(callbackFn)

2\.	Internally, JS creates a new empty array result

3\.	It loops through the original array one item at a time

4\.	For each item, it calls callbackFn(value, index, array)

5\.	If callbackFn returns true, the item is added to the result array

6\.	When loop finishes, result is returned!

---

## 3. ✅ Checklist for Mimicking `Array.prototype.filter`

Here's everything your custom `myFilter()` should do:

1\. **Must be added to `Array.prototype`**

2\. **Accepts a callback function as the first argument**

   - Validate it's a function, else throw a `TypeError`.

3\. **Accepts optional `thisArg` as second argument**

4\. **Iterates only valid (non-empty) array slots**

   - Use `if (i in this)`, it will skip holes in sparse arrays

5\. **Does not mutate the original array**

6\. **Preserves the order of filtered elements**

7\. **Callback gets correct arguments**

   - `(value, index, array)`

8\. **Returns a new array**

9\. **Uses `.call(thisArg, ...)` to maintain correct `this`**

10\. And at last, let's not cheat - **Avoid using native `.filter()` inside**

---

## 4. Custom Implementation: `Array.prototype.myFilter()`

```js

/**

 * @template T

 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn

 * @param {any} [thisArg]

 * @return {Array<T>}

 */

Array.prototype.myFilter = function (callbackFn, thisArg) {
    // Step 1: make sure callbackFn is a function
  if (typeof callbackFn !== 'function') {

    throw new TypeError(callbackFn + ' is not a function');

  }

  const result = [];

 //Step 2: loop through the array (this refers to the array)
  for (let i = 0; i < this.length; i++) {

    // Handle sparse arrays (holes like [1, , 3])
    if (i in this) {

      const value = this[i];

    // Step 3: call the callbackFn with correct context
      if (callbackFn.call(thisArg, value, i, this)) {

        result.push(value);

      }

    }

  }

  return result;

};

```

---

## 5. 🧪 Understanding `callbackFn.call(thisArg, value, i, this)`

```js

callbackFn.call(thisArg, value, i, this);

```

This is saying:

- Call `callbackFn` with `thisArg` as the value of `this`.

- Pass `value`, `i`, and `this` array as parameters.

---

### 🔍 Why `.call()`?

- It **explicitly sets** what `this` refers to inside the callback function.

- We **can't** do: `callbackFn(thisArg, value, i, this)` because `thisArg` is not the first parameter expected by the callback --- it is the `this` context. By using `callbackFn.call (..)` we're explicitly setting 'this' context for the callbackFn to understand and for `MyFilter()`.

- why not `.bind()` - it creates a new function (which is inefficient here); `.call()` directly invokes it with context.

- why not `.apply()` - it passes arguments as an array. The callback function for filter() expects arguments one by one.

Both .call() and .apply() will work functionally the same, but .call() is:

1\.	More concise.

2\.	Easier to read.

3\.	**Matches callback signature directly.**

4\.	Slightly faster in most engines (minor perf difference).

---

## 6. 💼 How to Explain in an Interview
-------------------------------------

> "I recreated a custom version of Array.prototype.filter called myFilter, which mimics the native implementation. It supports thisArg binding via .call() to preserve context, handles sparse arrays using the i in this check, and follows the correct callback signature (value, index, array)."

### **📌 Key Technical Terms to Mention:**

-   **Higher-order function**: Because filter() takes a callback as an argument.

-   **Callback invocation context**: Using .call() to bind thisArg.

-   **Sparse array handling**: Using i in this to avoid undefined holes.

-   **Pure function**: filter() does not mutate the original array.

-   **Functional programming principle**: It returns a new array without side effects.

---


## 7. 🚀 What's Next?

- Implement `myMap()`, `myReduce()`, `myForEach()` for deeper understanding.

- Add support for async callbacks with `myAsyncFilter()`.

- Create a polyfill library with your custom implementations.

- Benchmark performance with large arrays.

- Explore `bind`, `apply`, and arrow functions in-depth.

---

🧠 With this knowledge, you now understand how JavaScript's functional array methods work behind the scenes --- and can build your own powerful utilities with full confidence!