// Functions with objects and array in JS

function cal1(num) {
  return num
}
cal1(1, 2, 3, 4) // just returns 1

function cal2(...num) {
  return num
}
cal2(1, 2, 3, 4, 5) // returns an array of num [1, 2, 3, 4, 5]


// function calculateCartPrice(...nums) {
function calculateCartPrice(val1, val2, ...nums) {
  return nums
}
calculateCartPrice(1, 2, 3, 4, 5, 6) // return an array [3, 4, 5, 6]; 1 and 2 goes in val1 and val2 which are not returned...
// console.log(calculateCartPrice(100, 200, 300, 400));

const user = {
  username: "Sam",
  price: 499,
}

function handleObject(anyObject) {
  console.log(`username is ${anyObject.username} and price is ${anyObject.price}`);
}

// handleObject(user); // output will be "username is Sam and price is 499"

// handleObject({username: "Wan", price: 199}) // we can also directly pass an object to this function

// handleObject({username: "Ryu", price: 399}); output will be "username is Ryu and price is 399"


const myNewArray = [100, 200, 400, 600, 300];

function returnSecondValue(getArray) {
  return getArray[1];
}

returnSecondValue(myNewArray) // this will return 200

// console.log(returnSecondValue(myNewArray));
// console.log(returnSecondValue([200, 500, 700, 300]));


