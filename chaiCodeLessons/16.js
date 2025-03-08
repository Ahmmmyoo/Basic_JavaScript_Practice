// global and local scope in JS

// let a = 10;
// const b = 20;
// var c = 30;

// console.log(a, b, c);

if (true) {
  let a = 100;
  const b = 200;
  var c = 300;
}

// console.log(a);
// console.log(b);
// console.log(c);

var d = 400;
if (true) {
  d = 4;
}
// console.log(d);


const e = 500;
if (true) {
  // e = 5;
  const e = 5;
}
// console.log(e);

let t = 800;
if (true) {
  let t = 8;
}
// console.log(t); // 800

if (true) {
  t = 888;
}
// console.log(t); // 888

