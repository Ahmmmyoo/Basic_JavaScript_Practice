// comparison of datatypes in JS

// console.log(1 > 2); // false
// console.log(1 < 2); // true
// console.log(1 == 2); // false
// console.log(1 != 2); // true
// console.log(1 === 2); // false
// console.log(1 !== 2); // true

// console.log("4" > 2); // true
// console.log("04" > 2); // true
// console.log("04" > 4); // false

// console.log(null > 0); // false
// console.log(null == 0); // false
// console.log(null >= 0); // true


/* 
equality check == and comparison > < >= <= work differently 
comparison converts null to a number, treating it as 0
that's why (null >= 0) is true and (null > 0) is false

Comparisons (>, >=, <, <=) → Convert null to 0.
Equality (==) → Does not convert null to a number. Instead, null is only equal to undefined.
*/

// === strict equality operator
// console.log(1 === 1); // true
// console.log(1 === "1"); // false

