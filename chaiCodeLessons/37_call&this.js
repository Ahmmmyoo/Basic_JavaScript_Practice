// call and this in JS


function setUsername(username) {
  this.username = username;
}

function createUser(username, email, password){
  
  // setUsername(username); // function called but no changes in this function
  setUsername.call(this, username);
  
  this.email = email;
  this.password = password;
}

