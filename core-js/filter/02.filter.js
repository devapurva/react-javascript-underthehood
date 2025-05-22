/**

 * @template T

 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn

 * @param {any} [thisArg]

 * @return {Array<T>}

 */

Array.prototype.myFilter = function (callbackFn, thisArg) {
    // Step 1: make sure callbackFn is a function
    if (typeof callbackFn !== "function") {
        throw new TypeError(callbackFn + " is not a function");
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

// example 1 - with thisArg

const obj = { threshold: 5 };

const arr = [1, 10, , 4, 7];

const thresholdArr = arr.myFilter(function (value) { // when using thisArg, don't use arrow function

    return value > this.threshold; // 'this' refers to 'obj'

}, obj);

console.log(thresholdArr) //[10, 7]


// example 2 

const numbers = [1, 2, 3, 4, 8];

const evens = numbers.myFilter((num) => num % 2 === 0);

console.log(evens); // [2, 4. 8]


