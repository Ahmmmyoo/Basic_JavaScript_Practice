// Class Constructor and Static in JS

class UserChai {
  // constructor method is a special method for creating and initializing an object created with a class. It is called automatically when a new instance of the class is created. The constructor can take parameters to initialize the object's properties.
  constructor(username, email, password) {
    this.username = username
    this.email = email
    this.password = password
    console.log(`New user created: ${this.username} ${this.email} ${this.password}`);

  }
  // encryptPassword and changeUsername are instance methods. They are defined on the prototype of the class, which means they can be called on instances of the class. These methods can access and modify the properties of the instance they are called on.
  encryptPassword() {
    this.password = `abc ${this.password} abc`
    return this.password // this method modifies the password property of the instance and returns the new password
    // if no return is used, the method will return undefined by default. In this case, since we want to see the modified password, we use return to send the new password back to the caller.
  }
  changeUsername(newUsername) {
    this.username = newUsername
    return this.username
  }

}

const chai = new UserChai("Chai", "chai@example.com", "12345")

console.log(chai.encryptPassword());
console.log(chai.changeUsername("Hike"));


// behind the scenes *******************************


function UserTea(username, email, password) {
  this.username = username
  this.email = email
  this.password = password
  console.log(`New user created: ${this.username} ${this.email} ${this.password}`);
}

// Instance methods are defined on the prototype
UserTea.prototype.encryptPassword = function () {
  this.password = `abc ${this.password} abc`
  return this.password
}

UserTea.prototype.changeUsername = function (newUsername) {
  this.username = newUsername
  return this.username
}

const tea = new UserTea("Tea", "tea@example.com", "12345")

console.log(tea.encryptPassword());
console.log(tea.changeUsername("Bike"));




// Inheritance in JS ******************************************



console.log("*** ****** ***");


class UserXYZ {
  constructor(username) {
    this.username = username
  }

  logMe() {
    console.log(`username ${this.username} is logged`);
  }
} 

// Here we are creating a new class Teacher that extends the UserXYZ class. This means that Teacher inherits all the properties and methods of UserXYZ. The constructor of Teacher calls the constructor of UserXYZ using super(username), which initializes the username property. The Teacher class also has its own property subject and a method addCourse().
class Teacher extends UserXYZ {
  constructor(username, subject) {
    // The super() function is used to call the constructor of the parent class (UserXYZ) and pass the username parameter to it. This ensures that the username property is properly initialized in the Teacher instance.
    super(username)
    this.subject = subject
  }

  addCourse() {
    console.log(`New course added by ${this.username}`);
  }
}

const teacherJohn = new Teacher("John", "Maths");

teacherJohn.logMe();
teacherJohn.addCourse();

const userSmith = new UserXYZ("Smith");
userSmith.logMe();
// userSmith.addCourse(); // // This line would throw an error because userSmith is an instance of UserXYZ, which does not have the addCourse() method. Only instances of Teacher have access to the addCourse() method, as it is defined in the Teacher class.

console.log(teacherJohn === userSmith); // false, because they are two different instances of different classes

const userJohn = new UserXYZ("John");
console.log(userJohn === userSmith); // false, because they are two different instances of the same class, but with different properties

console.log(`teacherJohn Instance of UserXYZ: ${teacherJohn instanceof UserXYZ}`); // true, because teacherJohn is an instance of Teacher, which extends UserXYZ, so it is also considered an instance of UserXYZ
console.log(`teacherJohn Instance of Teacher: ${teacherJohn instanceof Teacher}`); // true, because teacherJohn is an instance of Teacher
console.log(`userSmith Instance of Teacher: ${userSmith instanceof Teacher}`); // false, because userSmith is an instance of UserXYZ, which does not extend Teacher, so it is not considered an instance of Teacher



// Static Properties in JS **************************************



console.log(`****** ****** ******`);

class UserParent {
  constructor (username) {
    this.username = username

    // Static methods are called on the class itself, not on instances of the class. They are often used for utility functions that are related to the class but do not require access to instance properties. In this case, createId() is a static method that generates a unique ID for each user. It is called using the class name (UserParent.createId()) rather than an instance of the class.
    this.userId = UserParent.createId()
    console.log(`${this.username} created with Id ${this.userId}`);
  }

  logMe() {
    console.log(`username ${this.username} is logged in`);
  }
  // Static methods are defined using the static keyword. They can be called without creating an instance of the class. In this case, createId() generates a random ID by adding 1000 to a random number between 0 and 1000, and returns it as a string. This method can be called directly on the UserParent class, like UserParent.createId().
  static createId() {
    // console.log(`static method called: ${this}`);
    return `${1000 + Math.round(Math.random()*1000)}`;
  }
}

const user1 = new UserParent("John");
const user2 = new UserParent("Smith");

user1.logMe();
// user1.createId();

class UserChild extends UserParent {
  constructor(username, playGames) {
    super(username)
    this.playGames = playGames

    // Here we are calling the static method createId() from the UserChild class, which inherits it from UserParent. This generates a unique ID for the user and assigns it to the id2 property. We then log the username and the generated ID to the console.
    this.id2 = UserChild.createId()
    console.log(`${this.username} id2: ${this.id2}`);
    
  }
}

const user3 = new UserChild("Kent", true);

user3.logMe();
// user3.createId(); // This line would throw an error because createId() is a static method and cannot be called on an instance of the class. It can only be called on the class itself, like UserChild.createId() or UserParent.createId().

