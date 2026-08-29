// scope level and mini hoisting in JS

// Scope Level

function one() {
  const username = "Hike"; // only available inside one() and its functions, e.g. two()
  function two() {
    const website = "youtube"; // only available inside two()
    // console.log(username); // prints hike
  }
  // console.log(website); // error; website is not defined here
  two(); // works
}

one(); // works 

// two() // gives error, two is not defined here; it's inside one()

// Hoisting

addOne(5); // works here
function addOne(num) {
  return num + 1;
}
addOne(); // works here

// addTwo(5); // does not work here; can't access before initialization
const addTwo = function (num) { // here addTwo holds a function; has the reference of the function
  return num + 2;
}
addTwo(3); // works here