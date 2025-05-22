# 🧠 Understanding `useDebounce()` hook and Building Your Own

## 1\. What is `useDebounce()` hook ?
------------------------------

useDebounce() is like telling React:

**"Hey, wait for a bit before reacting to this change!"**

So when a value (like a search input) keeps changing rapidly, it waits for things to settle down before doing something with it --- saving performance and avoiding unnecessary work (like repeated API calls).

`useDebounce(value, delay)` returns a **debounced version** of value that only updates **after** the specified delay has passed **without the value changing again**.

### 🧠 When Should You Use `useDebounce()` ?

-   ⏳ **Typing delay** before search

-   🛠️ **Avoiding unnecessary state updates**

-   💬 **Live validation with pause**

-   📦 **Auto-save on pause**

-   📉 **Reducing network/API calls**


### Here's an example of `useDebounce()` - 

```js

import { useState } from "react";
import useDebounce from "./useDebounce";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      fetch(`/api/search?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      placeholder="Search something..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

```

---

## 2\. ⚙️  Under the Hood (How it works step-by-step)

-   Uses useState to store the debounced value.

-   Uses useRef to persist the timer ID across renders.

-   Clears previous timer when value or delay changes (important!).

-   Resets the debounce timer whenever value updates.

-   Returns the **latest stable value** only after the wait time.

----

## 3\. ✅ Checklist for Mimicking `useDebounce()**
----------------------------------------------------

1\.  Accept a value and a delay as arguments.

2\.  Store the debounced version of the value in state.

3\.  Keep track of the active timer. _Hint: useRef()_

4\.  Reset and start the timer in a useEffect when the input value or delay changes.

5\.  Clear the timeout on every new render before setting a new one.

6\.  Clean up memory and prevent race conditions.

7\.  Return the latest stable value to the component.

---

## 4\. 💻 Custom Implementation `useDebounce()`

---------------------------------------------------------

```js
import { useState } from "react";
import useDebounce from "./useDebounce";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      fetch(`/api/search?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      placeholder="Search something..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
```

---

## 5\. 🧵 Why Use `useRef()` in `useDebounce()` ?
---------------------------------------------------------

We use useRef() to store the timeoutId **without triggering re-renders** and to ensure **cleanup** between renders --- helping avoid potential **memory leaks** and unexpected behaviors.

### **✅ Pros of using useRef()**

-   **No re-renders**: Updating a ref doesn't cause a component re-render (unlike useState()).

-   **Sticky across renders**: Maintains the same reference between renders, which is crucial for timers like setTimeout.

-   **Clean & efficient**: Useful for cleanup inside useEffect() to avoid leaving orphaned timers behind.

-   Helps prevent **memory leaks** by clearing the timer before setting a new one or unmounting the component.

### ⚠️ What if we don't use `useRef()` ?

If you manage timeoutId outside of useRef():

-   The timer **might not be cleared properly** between renders, especially if a new closure is created each time.

-   This can cause a **memory leak**, where the timeoutId lingers in the JavaScript event loop even after the debounce delay has completed or the component has unmounted.

-   **Race conditions** or **outdated values** might be used inside your timer callback.

-   You may end up calling clearTimeout() on an outdated or incorrect reference.

### **💣 Example of a memory leak risk:**

```
let timeoutId;
useEffect(() => {
  timeoutId = setTimeout(...);

  return () => clearTimeout(timeoutId); // Might not work as expected without useRef
}, [value]);
```

In the example above, since timeoutId is re-declared and reassigned on every render, **React can't reliably clean it up**, leading to unexpected callbacks or leaks.

### 🧩 When to use `useRef()` ?

-   For **storing mutable values** (like timers, interval IDs, event subscriptions).

-   When the value needs to **persist across renders** but **shouldn't cause a re-render**.

-   To enable **proper cleanup** in lifecycle hooks like useEffect().


## 💡 **TL;DR:**

useRef() ensures your debounce logic is **safe, efficient, and clean**, preventing memory leaks and ensuring timers don't linger or misfire due to stale closures.

---

## 6\. 🚀 What's Next?
-------------------

-   Build a useThrottle() hook to understand the difference between throttling and debouncing.

-   Extend useDebounce() with .cancel() or .flush() style controls using useCallback() and return handlers.

-   Combine useDebounce() with useMemo() or useCallback() for performance boosts in complex UIs.

-   Make a reusable hooks library with useDebounce(), useThrottle(), useLocalStorage(), and more.

-   Explore advanced patterns like debounced state setters or debounced form validation in React.

-   Benchmark hook performance in high-frequency scenarios like scroll, resize, and live search.

---

🧠 With this knowledge, you're now equipped to write cleaner, more performant React components --- and build your own custom hooks toolkit like a pro! 💪✨

If you need further clarification or more examples, feel free to ask me on [LinkedIn](https://www.linkedin.com/in/apurva-wadekar/) or [Send me an email](mailto:devapurva94@gmail.com) !

---