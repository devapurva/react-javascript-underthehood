/**
 * @template T
 * @param {T} value
 * @param {number} delay
 */

import { useRef, useState, useEffect } from "react";

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  }, [value, delay]);

  return debouncedValue;
}


// example 1

// export default function Component() {
//   const [keyword, setKeyword] = useState('');
//   const debouncedKeyword = useDebounce(keyword, 1000);

//   return (
//     <div>
//       <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
//       <p>Debounced keyword: {debouncedKeyword}</p>
//     </div>
//   );
// }