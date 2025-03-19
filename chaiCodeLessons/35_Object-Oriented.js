// Object Oriented in JS

// was introduced in ES6
// helps to make code more modular and reusable

// OOP
// Object
// - collection of properties and methods
// - toLowerCase

// why use OOP

// parts of OOP
// Object literal

// - Constructor function
// - Prototype
// - Classes
// - Inheritance (new, this)

// 4 pillars of OOP
// Abstraction     (hides details)
// Encapsulation   (hide data, wrap data)
// Inheritance     (reuse code)
// Polymorphism    (many forms)





// Object literal 

const user = {
  username: "John Wick",
  loginCount: 8,
  signedIn: true,

  getUserDetails: function () {
    console.log("Got user details from database");
    console.log(`Username: ${this.username}`);
  },
  getThis: function () {
    console.log(this);
  },
}

// console.log(user.username);
// user.getUserDetails();
// user.getThis();
// console.log(this);



// Constructors

// const promiseOne = new Promise()
// const date = new Date()


function User(username, loginCount, signedIn) {
  this.username = username
  this.loginCount = loginCount
  this.signedIn = signedIn

  this.greeting = function () {
    console.log(`Welcome ${this.username}`);
  }

  return this // by default it is already done
}

// const userOne = User("Smith Kent", 3, true)
// const userTwo = User("Chai Smith", 2, false) // overwrites userOne
const userOne = new User("Smith Kent", 3, true)
const userTwo = new User("Chai Smith", 2, false)

// console.log(userOne);
// console.log(userTwo);

// console.log(userTwo.constructor);


