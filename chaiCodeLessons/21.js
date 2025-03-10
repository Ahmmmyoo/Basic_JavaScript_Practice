// Control Flow in JS


// < > <= >= == != === !==


// The if statement in JavaScript checks whether a condition evaluates to a "truthy" or "falsy" value. It does not use strict (===) or loose (==) equality unless explicitly specified.

if (true) {
  console.log("condition is true");
} else {
  console.log("condition is false");
}

// Truthy and Falsy Values
// ✅ Truthy values (evaluated as true in an if statement):
// ✅ true
// ✅ Any non-zero number (1, -3, 0.5, Infinity)
// ✅ Any non-empty string ("hello", "false", "0")
// ✅ Any object ({}, [], function() {})
// ✅ new Date(), Symbol(), Promise

// ❌ Falsy values (evaluated as false in an if statement):
// ❌ false
// ❌ 0 (zero) -0 (negative zero)
// ❌ BigInt(0n)
// ❌ "" (empty string)
// ❌ null
// ❌ undefined
// ❌ NaN

if (false) {
  console.log("first");
} else if (true) {
  console.log("second");
} else {
  console.log("third");
}


// ✔️ switch uses strict equality (===) for comparisons.
// ✔️ No type conversion (unlike ==).
// ✔️ Always ensure matching data types in case statement s.

let switchKey = 1;

switch (switchKey) {
  case true:
    console.log("true");
    break;
  case false:
    console.log("false");
    break;
  case 1:
    console.log("numeric one");
    break;
  case "1":
    console.log("string one");
    break;
  case null:
    console.log("null");
    break;
  case undefined:
    console.log("undefined");
    break;
  case NaN:
    console.log("NaN");
    break;
  default:
    console.log("default");
    break;
}

// ✔️ if checks truthy and falsy values, not strict equality.
// ✔️ switch uses ===, but if can use == or === explicitly.
// ✔️ Objects ({}) and Arrays ([]) are always truthy, even if empty.
// ✔️ Use === in if for type-safe comparisons.


userEmail = [];
if(userEmail.length === 0) {
  console.log("Array is empty");
}

const emptyObj = {};

if(Object.keys(emptyObj).length === 0) {
  console.log("Object is empty");
}

false == 0
false == ""
0 == ""
false == null
0 == null
false == undefined
0 == undefined

// Nullish Coalescing Operator (??) : null undefined

val1 = 5 ?? 10; // 5
val2 = null ?? 10; // 10
val3 = undefined ?? 10; // 10
val4 = null ?? undefined ?? 20 ?? 5 // 20
val5 = NaN ?? 5 // NaN
val6 = {} ?? [] ?? 45 // {}


// Terniary Operator
// condition ? true : false

const loggedIn = true;
loggedIn ? console.log("User is logged in") : console.log("User is not logged in");

const temp = 90;
temp > 50 ? console.log("It's hot more than 50") : console.log("It's not hot less than 50");

