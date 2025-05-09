// Magic of Prototype in JS


console.log(`
************ NEW KEYWORD ************  
`);



function multiplyBy5(num) {
  return num * 5
}

multiplyBy5.power = 2

// console.log(multiplyBy5(5));
// console.log(multiplyBy5.power);
// console.log(multiplyBy5.prototype);

function createUser(username, score) {
  this.username = username
  this.score = score
}

createUser.prototype.loginDemo = function () {
  console.log(`${this.username} just logged in!`);
}

createUser.prototype.incrementScore = function () {
  this.score += 1
}

createUser.prototype.printScore = function () {
  console.log(`Score for ${this.username} is ${this.score}`);
}

const userOne = new createUser("Smith Kent", 3)

userOne.loginDemo()
userOne.incrementScore()
userOne.printScore()

const userTwo = createUser("Oliver Jack", 2)

// **Error** use new keyword to create a new object

// userTwo.loginDemo()
// userTwo.incrementScore()
// userTwo.printScore()



/*

Here's what happens behind the scenes when the new keyword is used:

A new object is created: The new keyword initiates the creation of a new JavaScript object.

A prototype is linked: The newly created object gets linked to the prototype property of the constructor function. This means that it has access to properties and methods defined on the constructor's prototype.

The constructor is called: The constructor function is called with the specified arguments and this is bound to the newly created object. If no explicit return value is specified from the constructor, JavaScript assumes this, the newly created object, to be the intended return value.

The new object is returned: After the constructor function has been called, if it doesn't return a non-primitive value (object, array, function, etc.), the newly created object is returned.

*/

console.log(`
************* PROTOTYPE *************
  `);


let myHeros = ["flash", "batman", "superman", "ironman", "spiderman"]

let heroPower = {
  flash: "speed",
  batman: "intelligence",
  superman: "strength",
  ironman: "money",
  spiderman: "spider sense",

  getSpiderPower: function () {
    console.log(`Spiderman's power is ${this.spiderman}`);
  }
}

Object.prototype.randomObjectFunction = function () {
  console.log("Random object function is called");
}

Array.prototype.randomArrayFunction = function () {
  console.log("Random array function is called");
}

heroPower.randomObjectFunction()
// heroPower.randomArrayFunction() // **Error** randomArrayFunction is not a function of heroPower object

myHeros.randomObjectFunction()
myHeros.randomArrayFunction()

console.log(`
************ INHERITANCE ************  
`);

const User = {
  name: "John Doe",
  email: "johndoe@com",
}

User.login = function () { 
  console.log(`${this.name} just logged in!`);
}

const Teacher = {
  makeVideo: true
}

const TeachingSupport = {
  makeAssignment: true,
  __proto__: User
}

// old syntax
// Teacher.__proto__ = User

// modern syntax 
Object.setPrototypeOf(Teacher, User)

Teacher.login()

// Injecting Properties in String Object

let anotherUserName = "John    "

String.prototype.trueLength = function () {
  console.log(`True Length: ${this.trim().length}`)
}

anotherUserName.trueLength();
"Kat    ".trueLength()