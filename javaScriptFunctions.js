console.log("I'm From Console Log Line 1");

// made a function
function sayHello() {
  console.log("Hello");
}

// called that function
sayHello();

// made an anonymous function
var sayBye = function () {
  console.log("Bye");
}

// called that function
sayBye();

// sing with parameters 
function sing(song) {
  console.log(song);
}

// using the function sing to sing a song
sing("laaa deee daaa");

// multiply two numbers
// it did multiply it but we didn't get an output
function multiply(a, b) {
  a * b; // there is no return
}

// if we call that fucntion we will get undefined
multiply(console.log(multiply(5, 5)));

// now it returns the result 
function mul(a, b) {
  return a * b;
}

mul(console.log(mul(2, 2)))

