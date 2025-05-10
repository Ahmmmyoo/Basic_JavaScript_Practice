// Class Constructor and Static in JS

class UserChai {
  constructor(username, email, password) {
    this.username = username
    this.email = email
    this.password = password
    console.log(`New user created: ${this.username} ${this.email} ${this.password}`);

  }

  encryptPassword() {
    this.password = `${this.password}abc`
    return this.password
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

UserTea.prototype.encryptPassword = function () {
  this.password = `${this.password}abc`
  return this.password
}

UserTea.prototype.changeUsername = function (newUsername) {
  this.username = newUsername
  return this.username
}

const tea = new UserTea("Tea", "tea@example.com", "12345")

console.log(tea.encryptPassword());
console.log(tea.changeUsername("Bike"));


// Inheritance in JS

console.log("*** ****** ***");


class UserXYZ {
  constructor(username) {
    this.username = username
  }

  logMe() {
    console.log(`username ${this.username} is logged`);
  }
} 

class Teacher extends UserXYZ {
  constructor(username, subject) {
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
// userSmith.addCourse();

console.log(`teacherJohn Instance of UserXYZ: ${teacherJohn instanceof UserXYZ}`);
console.log(`teacherJohn Instance of Teacher: ${teacherJohn instanceof Teacher}`);
console.log(`userSmith Instance of Teacher: ${userSmith instanceof Teacher}`);

// Static Properties in JS

console.log(`****** ****** ******`);

class UserParent {
  constructor (username) {
    this.username = username

    this.userId = UserParent.createId()
    console.log(`${this.username} created with Id ${this.userId}`);
  }

  logMe() {
    console.log(`username ${this.username} is logged in`);
  }

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

    this.id2 = UserChild.createId()
    console.log(`${this.username} id2: ${this.id2}`);
    
  }
}

const user3 = new UserChild("Kent", true);

user3.logMe();
// user3.createId();

