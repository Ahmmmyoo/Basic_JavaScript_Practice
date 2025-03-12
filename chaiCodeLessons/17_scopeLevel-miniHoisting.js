// scope level and mini hoisting in JS

function one() {
  const username = "Hike";
  function two() {
    const website = "youtube";
    console.log(username);
  }
  // console.log(website);
  two();
}
// one(); 

addOne(5); // works here
function addOne(num) {
  return num + 1;
}
addOne(); // works here

// addTwo(5); // does not work here
const addTwo = function (num) {
  return num + 2;
}
addTwo(3); // works here

