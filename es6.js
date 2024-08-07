// costants -----------------------------------

const pi = 3.142;
// console.log(pi);

function calcAreaCustomPi(r) {
  const pi = 10;
  // you can redeclare/overwrite pi value inside this function
  // pi value inside this function will always be 10

  // console.log("Value of pi inside the fucntion : " + pi);

  return pi * r * r;
}

// pi value outside the function will be 3.142
// console.log("Value of pi outside the fucntion : " + pi);

function calcAreaPi(r) {
  return pi * r * r;
}

console.log("Area of (r:2) with Default pi = " + calcAreaPi(2));
console.log("Area of (r:2) with Custom pi = " + calcAreaCustomPi(2));



// Let Keyword ----------------------------------

// the let keyword makes a variable inside the current scope

var x = 10; // makes a global var

if (x > 5) {
  // var x = 5; // this overwrites the x to 5
  let x = 5; // this makes a new instances of x with value 10 inside this scope
  console.log("Inside: " + x);
}
console.log("Outside: " + x);

// console.log(x);

var items = document.getElementsByTagName("li");

// for(var i = 0; i < items.length; i++) { // the var will not work correctly here
//   items[i].onclick = function () {
//     console.log(i);
//   }
// }

for (let i = 0; i < items.length; i++) {
  items[i].onclick = function () {
    console.log(i);
  }
}

// Default Parameters -------------------------------

function log(num = "10") {
  console.log(num);
}

log(); // using the default parameter
log(30);

function logNinga(name = "Ryu", belt = "Gray", age = 0) {
  console.log("My name is " + name +
    " and my belt is " + belt +
    " and my age is " + age);
}

logNinga(); // using the default parameters
logNinga("Shaun", "Black", "28");


// Spread Operator ----------------------------------

var nums1 = [1, 2, 3, 4, 5, 6];
var nums2 = [7, 8, 9, 10];

var sumArray = [...nums1, ...nums2] // using the spread operator

console.log(nums1);
console.log(sumArray);

var threeNums = [1, 2, 3,];

function sumThreeNums(a, b, c) {
  console.log("Sum is : " + (a + b + c));
}

sumThreeNums(...threeNums); // using spread operator to give back three seperate numbers


// Template Strings ----------------------------------


// white spaces arnt ignored

var str1 = ` hello, 

 my name is ryu`;
console.log(str1);

// adding variables in it

function strTemp(a, b, c) {
  console.log(`var a is ${a} and var b is ${b} and c is ${c}`);
}

strTemp("aa", "bbb", "sdf");

console.log(` hmmmm sum of 5 and 8 is ${5 + 8}`);


