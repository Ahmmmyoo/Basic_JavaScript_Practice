// functions and parameters in js

function sayMyName(){
  console.log("K");
  console.log("Y");
  console.log("R");
  console.log("I");
  console.log("A");
  console.log("S");
}

// sayMyName();

function addTwoNumbers(number1, number2){
  // console.log(number1 + number2);
  
  // let result = number1 + number2
  // return result

  return number1 + number2
  
  console.log("Will not Execute"); // code won't execute after return
}

addTwoNumbers() // this will return a NaN
addTwoNumbers(3,4); // this will return 7
addTwoNumbers(3,"4") // this will convert to string and return 34
addTwoNumbers(3, "a") // this will return 3a

const result = addTwoNumbers(3,4);
// console.log("Result: ", result);

function addOne(number1) {
  let result = number1 + 1
  console.log("This will print")
  return result
  console.log("This will not print")
}

function loginUserMessage(username) {
  return `${username} just logged in`
}

// console.log(loginUserMessage("K"));
// console.log(loginUserMessage()); // undefined just logged in

function loginUserMessage2(username) {
  // if (username === undefined) {
  if (!username) {
    console.log("Please enter a username");
    return
  }
  return `${username} just logged in`
}

console.log(loginUserMessage2());

function greetUser(username = "Guest") { // default parameter
  return `Welcome ${username}`
}

greetUser("K"); // Welcome K