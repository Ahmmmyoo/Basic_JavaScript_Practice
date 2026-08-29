// THIS and arrow functions in JS

const gloConsA = "String"
const gloConsB = 444
let gloLetC = "Sentence"
let gloLetD = 222
var gloVarE = "Var"
var gloVarF = 111

// this

const user = {
  name: "John Doe",
  age: 45,

  greeting: function () { //  define function inside an object
    console.log(`Hello ${this.name}, Welcome to website`); // here "this" refers to the current context
  
    console.log(this); // prints context; which is { name: "John Doe", age: 45, greeting: [Function: greeting] }
  },
}

// user.greeting(); // John Doe
user.name = "William"; // changed name of user to William
// user.greeting(); // William

// console.log(this); // prints {}; because context is empty in node environment


function chai() {
  username = "Hike"; // global object property
  let user2 = "Jake" // local variable
  console.log(this); // prints a lot of context; (does not include user2)
  console.log(`Username (this): ---- ${this.username} ----`); // ---- Hike ---- ; works fine here as username is now part of the global object property
  console.log(`Username (this): ---- ${this.user2} ----`); // does NOT work; prints undefined // ---- undefined ----
  console.log(`Username (direct): ---- ${username} ----`); // works fine here // ---- Hike ----

  this.user3 = "ABC"
  // console.log(user3); // works
  // console.log(this.user3); // works
}

// chai(); // works 
// console.log(username); // works if you fun chai(), which creates a global object property "username"
// console.log(user3); // works



const tea = function () { // normal function
  username = "TEA";
  console.log(this); // prints the whole global object
}
// tea();


const coffee = () => { // arrow function
  username = "Coffee";
  console.log(this); // prints {}
}
// coffee();


const gym = () => { // arrow function
  username = "gym"
  console.log(`arrow function:`);
  console.log(this); // {}
  console.log(this.username); // undefined 
  console.log(username); // gym
}
// gym() 

          () => {} // arrow function
let abc = () => {} // arrow function in abc

let a1 = (n1, n2) => {return n1 + n2} // we have to use return if we coded inside {}
let a2 = (n1, n2) => (n1 + n2)  // used implicit return here, we don't have to use return here; we coded in ()

// Use normal functions when you need this to refer to the calling object (e.g., methods in objects, event listeners, constructors).
// Use arrow functions when you want to inherit this from the surrounding scope (e.g., inside setTimeout, callbacks).

const addTwo = (num1, num2) => {
  return num1 + num2
}

// const addThree = (num1, num2, num3) => num1 + num2 + num3 // put inside () here 
const addThree = (num1, num2, num3) => (num1 + num2 + num3) // this is correct way

// If you use curly braces then you'd have to use return keyword

// console.log(addTwo(3, 4));
// console.log(addThree(3, 4, 5));

// if we want to return object

const retObj = () => {name: "HEHE"} // returns undefined
// console.log(retObj());

// to return object we have to wrap object inside ()
const returnObject = () => ({ name: "John Doe" }) // return this object { name: 'John Doe' }
// console.log(returnObject());


const myArr = [1, 2, 3, 4, 5]

myArr.forEach( (n) => (n+1) );