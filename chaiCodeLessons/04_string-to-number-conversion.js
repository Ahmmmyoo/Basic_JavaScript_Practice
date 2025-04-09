// why string to number conversion is confusing

// console.log(2 + 2);
// console.log(2 - 2);
// console.log(2 * 2);
// console.log(2 ** 3);
// console.log(2 / 3);
// console.log(2 % 3);

let str1 = "hello";
let str2 = " ryu";
// console.log(str1 + str2); // hello ryu

console.log(typeof ("1" + 2), ("1" + 2));  // string 12
console.log(typeof (1 + "2"), (1 + "2")); // string 12
console.log(typeof ("1" + 2 + 3), ("1" + 2 + 3)); // string 123
console.log(typeof (1 + 2 + "3"), (1 + 2 + "3")); // string 33
console.log(typeof (1 + 5 * 3 / 2), (1 + 5 * 3 / 2)); // number

console.log(typeof (+true), (+true)); // number 1
console.log(typeof (typeof +true), (typeof +true)); // string number
console.log(typeof (+""), (+"")); // number 0
let abc = 4;
console.log(abc, (abc++), (abc)); // 4 4 5
console.log(abc, (++abc), (abc)); // 5 6 6

