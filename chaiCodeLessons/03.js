// datatype conversion confusion

let number = "10dfs";

console.log(typeof number);
console.log(typeof(number));

let numberConvert = Number(number);
console.log(typeof numberConvert);
console.log(numberConvert);

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

