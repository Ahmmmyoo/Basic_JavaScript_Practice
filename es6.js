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

var bigName = "Crystal";
var bigBelt = "Black";
var smallName = "Sam";
var smallBelt = "Pink";

var smallNinja = {
  smallName: smallName,
  smallBelt: smallBelt
};

console.log(smallNinja.smallName);

var bigNinja = {
  bigName, bigBelt,
  // chop: function(chopTimes) {  // old way
  //   console.log(`you chopped the enemy ${chopTimes} times`);
  // },
  chop(chopTimes) {  // new way
    console.log(`you chopped the enemy ${chopTimes} times`);
  }
};

console.log(bigNinja.bigName);

bigNinja.chop(4);

// New String Methods --------------------------------------

var strNewStringMethods1 = "graaaaaavy ",
  strNewStringMethods2 = "goodbye",
  strNewStringMethods3 = "Morning",
  strNewStringMethods4 = "apple are oranges";

// repeat method
console.log(strNewStringMethods1.repeat(4));

// startsWith method
console.log("startsWith:")
console.log(strNewStringMethods2.startsWith("good"));
console.log(strNewStringMethods2.startsWith("bye"));
console.log(strNewStringMethods2.startsWith("bye", 4));

// endsWith method
console.log("endsWith:");
console.log(strNewStringMethods3.endsWith("ing"));
console.log(strNewStringMethods3.endsWith("Morn"));
console.log(strNewStringMethods3.endsWith("Morn", 4));
console.log(strNewStringMethods3.endsWith("Mo", 2));

// includes method
console.log("includes:");
console.log(strNewStringMethods4.includes("apple"));
console.log(strNewStringMethods4.includes("apples"));
console.log(strNewStringMethods4.includes(""));
console.log(strNewStringMethods4.includes(" "));
console.log(strNewStringMethods4.includes("a"));

// Arrow Functions -----------------------------------------

// var ninjaGreets = function() {
//   console.log("hiiiiiiiiii");
// };

// var ninjaGreets = () => {
//   console.log("hiiiiiiiiii");
// };

var ninjaGreets = () => console.log("hiiiiiiiiii");
var ninjaGreetsWithName = (ninjaName) => console.log(`hiiiyaaa ${ninjaName}`);

ninjaGreets();
ninjaGreetsWithName("Ryu");

// var greenBelt = {
//   name: "GreenLantern",
//   chop(xTimes) {
//     window.setInterval(function () {
//       if (xTimes > 0) {
//         console.log(this.name + " chopped the watermellon");
//         x--;
//       }
//     }, 1000);
//   }
// }

var greenBelt = {
  name: "GreenLantern",
  chop(xTimes) {
    window.setInterval(() => {
      if (xTimes > 0) {
        console.log(this.name + " chopped the watermellon");
        xTimes--;
      }
    }, 1000);
  }
}

greenBelt.chop(5);


// Sets ----------------------------------------------------

var nameSet = new Set();

s = () => console.log(nameSet);

nameSet.add("Ryu").add("Ryu");
nameSet.add("Sam");
nameSet.add("Shawn").add("Sean").add("Ryu");
s();

nameSet.delete("Ryu");
// nameSet.delete("Ryu"),delete("Sam"); // does not work
// nameSet.clear(); // clears the set
s();

log("Removing Duplicates using sets:");

var duplicateNames = ["Ryu", "Nin", "Cyri", "Hob", "Nin", "Ryu", "ryu", "Hob"];

var noDuplicateNames = new Set(duplicateNames);

newArr = [...noDuplicateNames]; // you can also overwrite the old array with duplicates

console.log(duplicateNames);
console.log(noDuplicateNames);
console.log(newArr);


