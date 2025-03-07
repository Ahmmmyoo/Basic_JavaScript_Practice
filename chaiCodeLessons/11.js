// Array in JS

let myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 3, 5, 7, 8];

let myArr2 = new Array(12, 23, 34, 45, 56, 67, 78);

// myArr.push(11);
// myArr.pop();
// myArr.shift();
// myArr.unshift(0);
// myArr.splice(1, 2);
// myArr.reverse();
// myArr.sort();
// myArr.concat(myArr2);

// console.log(myArr.join());
// console.log(myArr.join("  "));

// slice , splice

let myArr3 = new Array(0,1,2,3,4,5)

// console.log("A", myArr3);
// console.log("-",myArr3.slice(1, 3));
// console.log("B", myArr3);
// console.log("-",myArr3.splice(1, 3));
// console.log("C", myArr3);
// console.log("-",myArr3.splice(0, 2, 8, 9));
// console.log("D", myArr3);

const marvelHeroes = ["thor", "ironman", "spiderman"];
const dcHeroes = ["superman", "batman", "flash"];

// marvelHeroes.push(dcHeroes);
// marvelHeroes.push(...dcHeroes);
// console.log(marvelHeroes);

const allHeroes = (marvelHeroes.concat(dcHeroes));
// console.log(allHeroes);
const allNewHeroes = [...marvelHeroes, ...dcHeroes];
// console.log(allNewHeroes);

const anotherMixArr = [1,2,3,[4,5,6],7,[8,9,[10,11,12,[13,14,15], 16], 17], 18, 19];
// console.log(anotherMixArr);
const realAnotherMixArr = anotherMixArr.flat(Infinity);
// console.log(realAnotherMixArr);

let str1 = "hello";
// console.log(Array.isArray(str1));
// console.log(Array.from(str1));
// console.log(Array.from({name: "Ryu"}));

let score1 = 100;
let score2 = 200;
let score3 = 300;

// console.log(Array.of(score1, score2, score3));

