// Magic of Prototype in JS


console.log(`
************ NEW KEYWORD ************  
`);



function multiplyBy5(num) {
  return num * 5
}

// in JS function is an object and we can add properties to it

multiplyBy5.power = 2 // gives power property to multiplyBy5 function
multiplyBy5.prototype // gives prototype property to multiplyBy5 function

// in JS everything is an object, even functions are objects and we can add properties to them

// array >> obj >> null
// function >> obj >> null
// string >> obj >> null

// console.log(multiplyBy5(5));
// console.log(multiplyBy5.power);
// console.log(multiplyBy5.prototype);

function createUser(username, score) {
  this.username = username
  this.score = score
}

createUser.prototype.loginDemo = function () {
  console.log(`${this.username} just logged in!`);
  // here this is the object that is calling the function
}

createUser.prototype.incrementScore = function () {
  this.score += 1
  // here this is the object that is calling the function
  // when we call this function using userOne object, this will refer to userOne object, and increase the score of userOne object by 1
}

createUser.prototype.printScore = function () {
  console.log(`Score for ${this.username} is ${this.score}`);
}

const arr = ["a", "b", "c"]
// arr.prototype.map()
// arr.map() // map is a function of array object, and it is defined in the prototype of array object
// you don't have to write prototype when you call the function, because JS automatically looks for the function in the prototype of the object

const ob1 = createUser("John Doe", 1)
ob1.loginDemo() // this will give error because we are not using new keyword to create the object, so this will refer to the global object, and global object doesn't have username property, so it will give error

const userOne = new createUser("Smith Kent", 3)

userOne.loginDemo()
userOne.incrementScore()
userOne.printScore()

// const userTwo = createUser("Oliver Jack", 2)

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




let myName = "Smith      "
myName.length
myName.trueLength // **Error** trueLength is not a function of string object, because we haven't defined it yet
myName.trim().length // this will give the length of the string after trimming the whitespace from both ends of the string


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

const cars = {}
cars.sars() // **Error** sars is not a function of cars object, because we haven't defined it yet
Object.prototype.sars = function () {
  console.log("Sars function is called");
} // this will add sars function to the prototype of Object, so now all objects will have access to sars function

cars.sars() // this will work now, because we have defined sars function in the prototype of Object, so now all objects will have access to sars function

myHeros.sars() // even arrays are objects in JS, so this will work now, because we have defined sars function in the prototype of Object, so now all objects will have access to sars function

Array.prototype.nars = function () {
  console.log("Nars function is called");
} // this will add nars function to the prototype of Array, so now all arrays will have access to nars function

myHeros.nars() // this will work now, because we have defined nars function in the prototype of Array, so now all arrays will have access to nars function

cars.nars() // **Error** nars is not a function of cars object, because we have defined nars function in the prototype of Array, so only arrays will have access to nars function

const User = {
  name: "username",
  email: "useremail@com"
}

const Teacher = {
  makeVideo: true
}
const TeachingSupport = {
  isAvailable: false
}
const TASupport = {
  makeAssignment: "JS Assignment",
  fullTime: true,
  __proto__: TeachingSupport // this will make TASupport object inherit from TeachingSupport object, so now TASupport object will have access to all properties and methods of TeachingSupport object
}

Teacher.__proto__ = User // this will make Teacher object inherit from User object, so now Teacher object will have access to all properties and methods of User object

// modern syntax
Object.setPrototypeOf(Teacher, User) // this will make Teacher object inherit from User object, so now Teacher object will have access to all properties and methods of User object



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