// global and local scope in JS

{} // this is a scope 

let a = 10;
const b = 20;
var c = 30;

// console.log(a, b, c); // prints all the values

var c1 = 30

if (true) {
  let a1 = 100;
  const b1 = 200;
  var c1 = 300; // this will change the value of c1 from 30 to 300
  // c1 = 300 // this will also work as above
}

// console.log(a1); // will not print it, not defined
// console.log(b1); // will not print it, not defined
// console.log(c1); // will print this, value will be 300

var d = 400;
if (true) {
  d = 4; // changes the value to 4
}
// console.log(d); // print 4


const e = 500;
if (true) {
  // e = 5; // gives an error can't change value of const
  const e = 5; // makes a new const e here, gives no error; e will always be 5 inside this scope...
  // console.log(e); // prints 5
  
}
// console.log(e); // prints 500

let g = 6
let t = 800
if (true) {
  t = 8 // uses the t defined outside this scope
  // console.log(t); // as let is defined outside this scope, so this works and gives it a value of 8  
  
  const g = 333 // makes a new g inside this scope with value of 333
  // console.log(g); // prints 333
}
// console.log(t); // prints 8, as the function above overwrites the t outside its scope
// console.log(g); // prints 6, g always remains 6 outside this function

let f = 1
if (true) {
  f = 888; // changes the value of f outside this scope
}
// console.log(f); // prints 888

