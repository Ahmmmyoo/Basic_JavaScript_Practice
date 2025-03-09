// THIS and arrow functions in JS

const user = {
  name: "John Doe",
  age: 45,
  greeting: function () {
    console.log(`Hello ${this.name}, Welcome to website`);
    // console.log(this);
    
  },
}

// user.greeting();
user.name = "William";
// user.greeting();

// console.log(this); // {} empty in node environment

function chai() {
  username = "Hike";
  console.log(this);
}

// chai();

const tea = function () {
  username = "Bike";
  console.log(this);
}

// tea();

const coffee = () => {
  username = "Mike";
  console.log(this);
}

// coffee();

// Use normal functions when you need this to refer to the calling object (e.g., methods in objects, event listeners, constructors).
// Use arrow functions when you want to inherit this from the surrounding scope (e.g., inside setTimeout, callbacks).

const addTwo = (num1, num2) => {
  return num1 + num2
}

// const addThree = (num1, num2, num3) => num1 + num2 + num3 
const addThree = (num1, num2, num3) => (num1 + num2 + num3) 

// If you use curly braces then you'd have to use return keyword

// console.log(addTwo(3, 4));
// console.log(addThree(3, 4, 5));

const returnObject = () => ({ name: "John Doe" })

// console.log(returnObject());

const myArr = [1, 2, 3, 4, 5]

// myArr.forEach();