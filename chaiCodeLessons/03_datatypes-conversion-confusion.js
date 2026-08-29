// datatype conversion confusion

let number = "10dfs";

console.log(typeof number); // string
console.log(typeof(number)); // string

let numberConvert = Number(number); //number
console.log(typeof numberConvert); // NaN
console.log(numberConvert); // true

// 33 => 33
// "33" => 33
// "33a" => NaN
// true => 1
// false => 0
// null => 0
// undefined => NaN

let isLogedIn = 1;
console.log(Boolean(isLogedIn));

// 0 => false
// 1 => true
// "" => false
// " " => true
// null => false
// undefined => false
// NaN => false
// Infinity => true

