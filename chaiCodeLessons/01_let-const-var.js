// let, const and var

let a = 10; // block scoped variable
const b = 20; // block scoped constant
var c = 30; // function scoped or global scoped variable
sdf = 40; // global var if not in strick mode

// let is a scoped variable
// const is a constant variable
// var is a global variable // avoid using var

console.log(a, b, c);

a = 100;
// b = 200; // this will throw an error
c = 300;

console.table([a, b, c]); // does not give the name of the variable in the table, but the index
console.table({ a, b, c }); // gives the name of the variable in the table

cv = 1000; // this will not throw an error, but it is not a good practice to declare a variable without let, const or var
