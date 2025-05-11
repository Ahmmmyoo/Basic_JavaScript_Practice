// Now you know Objects in JS

// ************** Math.pi **************

// console.log(Math.PI)
// Math.PI = 5;
// console.log(Math.PI);

// console.log(Object.getOwnPropertyDescriptor(Math, "PI"));

// writeable: false, enumerable: false, configurable: false

const myNewObj = {
  name: "Ginger Tea",
  price: 250,
  isAvailable: true,

  orderTea: function () {
    console.log(`Ordering ${this.name} Price: Rs.${this.price}`);
  }
}

console.log(Object.getOwnPropertyDescriptor(myNewObj, "name"));

Object.defineProperty(myNewObj, "name", {
  writable: false,
  enumerable: false,
  // configurable: false
});

console.log(Object.getOwnPropertyDescriptor(myNewObj, "name"));


console.log(`\ntrying changes in object: ${myNewObj.name}`);

myNewObj.name = "Ginger Tea Remix";
myNewObj.price = 300;

console.log(`\nchecking changes in object: ${myNewObj.name}`);

console.log(`\nloop on object:`);
for (let [key, value] of Object.entries(myNewObj)) {
  if (typeof value !== "function") {
    console.log(`${key}: ${value}`);
  }
}