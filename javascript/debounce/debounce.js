/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
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


// example 1

function logInput(value) {
  console.log('User typed:', value);
}

const debounceLog = debounce(logInput, 500);

const input = document.querySelector('#myInput');
input.addEventListener('input', (e) => {
  debounceLog(e.target.value);
});

// example 2

const debouncedLog = debounce(console.log, 1000, true);

debouncedLog("Hello"); // Runs immediately if `immediate = true`
debouncedLog("Still typing...");
debouncedLog("Still typing...");

debouncedLog.flush(); // Forces log if pending
debouncedLog.cancel(); // Cancels if still waiting