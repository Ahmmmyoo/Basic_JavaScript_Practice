// call and this in JS


function setUsername(username) {
  this.username = username;
}

function createUser(username, email, password){
  
  setUsername(username); // this will be undefined because setUsername is called without a context, so 'this' will refer to the global object (or undefined in strict mode) 
  setUsername.call(this, username); // this will refer to the current instance of createUser, so 'this.username' will be set correctly
  
  this.email = email;
  this.password = password;
}

const user1 = new createUser('john_doe', 'john@example.com', 'password123');
log(user1); // Output: createUser { username: 'john_doe', email: 'john@example.com', password: 'password123' }

// this in JavaScript refers to the object that is executing the current function. Its value can change depending on how a function is called. In the example above, when we use `setUsername.call(this, username)`, we are explicitly setting the context of `this` to the current instance of `createUser`, allowing us to correctly set the `username` property on that instance.