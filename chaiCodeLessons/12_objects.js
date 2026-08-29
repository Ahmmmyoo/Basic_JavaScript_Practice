// objects in JS

// singleton // when made with constructor
// object literals // when made with, const a = {}


const mySym = Symbol("key1");

const JsUser = {
  name: "Sam",  // name or "name" both are correct, name is converted to string; you don't have to define it as "name"
  "full name" : "Sam Smith", 
  mySym2 : "not used as symbol here, typeof isn't symbol", // not used as symbol here; will return string...
  [mySym]: "mykey1", // correct way of using symbol
  age: 21,
  location: "London",
  email: "sam@com",
  isLoggedIn: false,
  lastLogin: ["Monday", "Tuesday"]
}

// console.log(typeof JsUser.mySym2) // will return string
// console.log(JsUser[mySym]) // only way to use it

// console.log(JsUser.email); 
// console.log(JsUser["email"]); // both .email and ["email"] are correct; can't use "email" as is so we use it in [] like ["email"]
// console.log(JsUser["full name"]); // cant use .full name here so we have to use ["full name"]
// console.log(JsUser[mySym]);


JsUser.email = "newemail@com";
// Object.freeze(JsUser);  // freeze doesn't allow value changes; also doesn't give error if you change it... and no change happens...
// Object.seal(JsUser);
// JsUser.email = "reallynewemail@com";
// console.log(JsUser);

JsUser.greeting = function () {
  console.log("Hello JS User");
}
JsUser.greeting2 = function () {
  console.log(`Hello JS User,  ${this.name}`);
}

// console.log(JsUser.greeting) // only returns the reference of this function
// console.log(JsUser.greeting());
// console.log(JsUser.greeting2());



// const appUser = new Object() // singleton object
const appUser = {}  // non singleton object

appUser.id = "123abc";
appUser.name = "Samy";
appUser.isLoggedIn = false;

// console.log(appUser); 


const regularUser = {
  email: "some@email.com",
  fullname: {
    userfullname: {
      firstname: "Tommy",
      lastname: "Hanks"
    }
  }
}

// console.log(regularUser.fullname?.userfullname) // here ? is used if you don't know if that property exists or not

// console.log(">> ",regularUser);
// console.log(">> ",regularUser.fullname);
// console.log(">> ",regularUser.fullname.userfullname);
// console.log(">> ",regularUser.fullname.userfullname.firstname);

// console.log(regularUser.fullname?.userfullname);

const obj1 = {1: "a", 2: "b"};
const obj2 = {3: "c", 4: "d"};

const obj3 = {obj1, obj2}; // gives objects obj1 and obj2 in an object obj3, {{obj1}{obj2}} gives object in an object
const obj4 = {...obj1, ...obj2}; // if same keys are present then the 2nd objects key will overwrite,  If both objects have the same key, the second one will overwrite the first.

const obj5 = Object.assign({}, obj1, obj2); // copy from one or more targets to source
// const obj6 = Object.assign(obj1, obj2) // also works but the above one is preferred to work guaranteed 

// console.log(obj3);
// console.log(obj4);
// console.log(obj5);


const users = [ // an array of objects
  {
    id: 1,
    email: "Vx2bG@example.com",
    name: "John"
  },
  {
    id: 2,
    email: "Hs4g@example.com",
    name: "Smith"
  },
  {
    id: 3,
    email: "Kd3v@example.com",
    name: "Kathryn"
  }
] 

users[0].email // first object in an array, then that objects property
// console.log(users[1].email);

Object.keys(JsUser) // gives an array of properties name in that object
// console.log(Object.keys(JsUser));
Object.values(JsUser) // gives an array of values of the properties in that object
// console.log(Object.values(JsUser));
Object.entries(JsUser) // gives an array of key/value in that object; array in an array [[key/value],[key/value]]
// console.log(Object.entries(JsUser));

// console.log(Object.keys(users));

JsUser.hasOwnProperty("name") // determines if that object has a property of that name, returns true/false
// console.log(JsUser.hasOwnProperty("name"));
// console.log(JsUser.hasOwnProperty("nameee"));

const myObj2 = {
  js: "JavaScript",
  cpp: "C++",
  rb: "Ruby",
  swift: "Swift by Apple"
}

console.log(myObj2.js); // Object.key = the keys value // JavaScript
Object.keys // gives an array of keys in an object
Object.keys(myObj2) // an array of keys in myObj2 // === ['js', 'cpp', 'rb', 'swift'] 
Object.keys(myObj2)[0] // the first key in an array of keys of myObj2 // === js
console.log(myObj2[Object.keys(myObj2)[0]]);

