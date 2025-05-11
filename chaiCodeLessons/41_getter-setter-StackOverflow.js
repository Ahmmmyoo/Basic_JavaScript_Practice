// Getter Setter and Stack Overflow in JS

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  get email() {
    return this._email.toUpperCase();
  }
  set email(value) {
    this._email = value;
  }

  get password() {
    return `${this._password}abcd`;
  }
  set password(value) {
    this._password = value;
  }

}

const user1 = new User("johndoe@com", "123456");
const user2 = new User("smith@com", "abcdef");

console.log(user1.password);
console.log(user2.password);

// for (let [key, value] of Object.entries(user1)) {
//   console.log(`${key}: ${value}`);
// }


// OLD METHOD how to getter and setter through properties

// Function Based Syntax

console.log(`*******************`);


function UserOld(email, password) {
  this._email = email;
  this._password = password;  

  Object.defineProperty(this, "email", {
    get: function() {
      return this._email.toUpperCase();
    },
    set: function(value) {
      this._email = value;
    }
  });

  Object.defineProperty(this, "password", {
    get: function() {
      return `${this._password}abcd`;
    },
    set: function(value) {
      this._password = value;
    }
  });
}

const user3 = new UserOld("smith@com", "xyz");

console.log(user3.password);

// Object Based Syntax

console.log(`*******************`);

const UserObjectBased = {
  _email: "objectBased@com",
  _password: "123xyz",

  get email() {
    return this._email.toUpperCase();
  },
  set email(value) {
    this._email = value;
  },

  get password() {
    return `${this._password}abcd`;
  },
  set password(value) {
    this._password = value;
  }
}

// advantage?

const teaAdvantage = Object.create(UserObjectBased);

console.log(teaAdvantage.email);
