// objects in JS

// singleton // when made with constructor
// object literals // when made with, const a = {}


const mySym = Symbol("key1");

const JsUser = {
  name: "Sam",
  "full name": "Sam Smith",
  [mySym]: "mykey1",
  age: 21,
  location: "London",
  email: "sam@com",
  isLoggedIn: false,
  lastLogin: ["Monday", "Tuesday"]
}

// console.log(JsUser.email);
// console.log(JsUser["email"]);
// console.log(JsUser["full name"]);
// console.log(JsUser[mySym]);


JsUser.email = "newemail@com";
// Object.freeze(JsUser);
// Object.seal(JsUser);
// JsUser.email = "reallynewemail@com";
// console.log(JsUser);

JsUser.greeting = function () {
  console.log("Hello JS User");
}
JsUser.greeting2 = function () {
  console.log(`Hello JS User,  ${this.name}`);
}

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

// console.log(">> ",regularUser);
// console.log(">> ",regularUser.fullname);
// console.log(">> ",regularUser.fullname.userfullname);
// console.log(">> ",regularUser.fullname.userfullname.firstname);

// console.log(regularUser.fullname?.userfullname);

const obj1 = {1: "a", 2: "b"};
const obj2 = {3: "c", 4: "d"};

const obj3 = {obj1, obj2};
const obj4 = {...obj1, ...obj2}; // if same keys are present then the 2nd objects key will overwrite,  If both objects have the same key, the second one will overwrite the first.

const obj5 = Object.assign({}, obj1, obj2);
// console.log(obj3);
// console.log(obj4);
// console.log(obj5);


const users = [
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

// console.log(users[1].email);

// console.log(Object.keys(JsUser));
// console.log(Object.values(JsUser));
// console.log(Object.entries(JsUser));

// console.log(Object.keys(users));

// console.log(JsUser.hasOwnProperty("name"));
// console.log(JsUser.hasOwnProperty("nameee"));


