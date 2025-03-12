// Stack and Heap memory in javascript

// Stack (Primitive)
// Heap (Non primitive)

let mailOne = "OG mail ma mannn"; // stored in stack

let mailTwo = mailOne; // made a copy and stored in stack

mailTwo = "nooooo change two" // changed the copy...

console.table({mailOne, mailTwo})

let objOne = {
  name: "Classic Object",
  age: 45,
}

let objTwo = objOne;

objTwo.name = "Changes Done Here"

console.table({objOne, objTwo})

