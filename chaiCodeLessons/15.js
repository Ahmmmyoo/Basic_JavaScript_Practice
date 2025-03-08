// Functions with objects and array in JS

// function calculateCartPrice(...nums) {
function calculateCartPrice(val1, val2, ...nums) {
  return nums
}

// console.log(calculateCartPrice(100, 200, 300, 400));

const user = {
  username: "Sam",
  price: 499,
}

function handleObject(anyObject) {
  console.log(`username is ${anyObject.username} and price is ${anyObject.price}`);
}

// handleObject(user);
// handleObject({username: "Ryu", price: 399});

const myNewArray = [100, 200, 400, 600, 300];

function returnSecondValue(getArray) {
  return getArray[1];
}

// console.log(returnSecondValue(myNewArray));
// console.log(returnSecondValue([200, 500, 700, 300]));


