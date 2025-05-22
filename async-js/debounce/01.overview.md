# 🧠 Understanding `debounce()` and Building Your Own

## 1\. What is debounce() ?
------------------------------

Imagine you're typing into a search bar. You don't want a function (like an API call) to fire *every single keystroke*. Instead, you want to wait until you've paused typing for a bit --- *then* run the function. That's debounce! It's like saying: "Wait till the user stops doing stuff... then go ahead."

debounce() is a **higher-order function** that limits how often a particular function is executed. It delays the execution until after a specified delay (in ms) has passed since the last time it was invoked.

Use-cases include:

-   Search bar queries

-   Resizing window events

-   Auto-saving forms

-   Button spam protection

---

## 2\. 🧠 How Does `debounce()` Work?
----------------------------------------

-   You wrap a function inside a debounce() call.

-   It returns a new function that delays invoking the original function.

-   If the returned function is called again within the delay time, the timer resets.

-   Only when the delay passes without another call does the original function execute.

### **Example:**

```js

function logMessage() {
  console.log("Debounced!");
}

const debouncedLog = debounce(logMessage, 1000);

// Imagine this is tied to a keyup event
debouncedLog();
debouncedLog();
debouncedLog();
// Only 1 log appears, after 1s of no more calls
```

---

## 3\. ✅ Key Features to Implement AKA ✅ Checklist for Mimicking `debounce()`
------------------------------------------------------------------------------

1\.  Accepts a callback function.

2\.  Accepts a delay in milliseconds.

3\.  Returns a debounced version of the original function.

4\.  Clears previous timers if invoked again before delay ends.

5\.  Maintains correct this context and arguments. _Hint: apply()_

6\.  Avoid memory leaks by not creating multiple timeouts.

7\.  Pass along all original arguments

8\.  (Optional) Add an immediate flag for first-call execution

9\.  (Optional) Add .cancel() and .flush() methods for flexibility

---

## 4\. Custom Implementation `debounce()`:
-------------------------------------------

### Here's a simpler version - 

```js

function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    const context = this;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

```

### `debounce()` with `cancel(), flush()` and `immediate` flag :

```js

export default function debounce(func, wait, immediate = false) {
  let timeoutId = null;
  let lastArgs = null;
  let lastThis = null;

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;

    const callNow = immediate && !timeoutId;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;

      if (!immediate) {
        func.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
      }
    }, wait);

    if (callNow) {
      func.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    }
  }

  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
    lastArgs = lastThis = null;
  };

  debounced.flush = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      func.apply(lastThis, lastArgs);
      timeoutId = null;
      lastArgs = lastThis = null;
    }
  };

  return debounced;
}

```

---

## 5\. 🔍 Understanding fn.apply(context, args)
--------------------------------------------------

We use .apply() to:

-   Ensure the original function keeps its correct this binding.

-   Pass along all original arguments properly.

Why not just do fn()?

Because you might lose the this context or miss arguments passed to the debounced version.

---

## 6\. 🧪 Optional Enhancement: Immediate Execution
----------------------------------------------------

You can support an optional third argument --- immediate: true --- that fires the function *immediately* on the first call, then blocks repeated calls until the delay is over.

```js

function debounce(fn, delay, immediate = false) {
  let timerId;

  return function (...args) {
    const context = this;

    const callNow = immediate && !timerId;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      if (!immediate) fn.apply(context, args);
    }, delay);

    if (callNow) fn.apply(context, args);
  };
}

```

---

## 7\. 💼 How to Explain in an Interview
-----------------------------------------

When explaining your debounce() implementation, you could say:

-   **"I created a higher-order function that returns a debounced version of any function."**

-   **"It delays execution using setTimeout, and resets the timer on each call."**

-   **"I used fn.apply(this, args) to preserve this and any arguments."**

-   **"My version clears existing timers before setting a new one to ensure only the final call in the burst executes."**

-   **"Optionally, I support immediate execution using a third parameter."**

* * * * *

## 8\. 🚀 Want to Go Further?
------------------------------

-   Explore throttle() for rate-limiting instead of delaying.

-   Use performance.now() or requestAnimationFrame() for ultra-smooth UX.

-   Create a debounce hook for React: useDebounce().

---

🧠 Now that you understand debounce, you're ready to build efficient, performance-optimized UI logic --- without spamming function calls!

If you need further clarification or more examples, feel free to ask me on [LinkedIn](https://www.linkedin.com/in/apurva-wadekar/) or [Send me an email](mailto:devapurva94@gmail.com) !
For more details, you can refer to MDN Web Docs on [Debounce](https://developer.mozilla.org/en-US/docs/Glossary/Debounce).

---
