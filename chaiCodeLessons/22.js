// for loop with break and continue in JS


// ✔️ const inside a for loop is recreated in every iteration.
// ✔️ Each iteration gets a new block scope with a fresh const.
// ✔️ You cannot modify const, even in loops.
// ✔️ Declaring const outside the loop keeps it the same for all iterations.

for (let i = 0; i < 10; i++) {
  if (i === 5) {
    // console.log(i," inner start point");
    // break;
    // continue;
    // console.log(i, " inner end point");
    
  }
  // console.log(i);
}

for (let i = 0; i < 3; i++) {
  // console.log(`Outer Loop i:${i}`);
  for (let j = 0; j < 3; j++) {
    // console.log(`Inner Loop i:${i} j:${j}`);
  }
}

let myArray = ["flash", "batman", "superman", "ironman", "spiderman"];

for (let i = 0; i < myArray.length; i++) {
  const element = myArray[i];
  // console.log(element);
}

for (let i = 1; i <= 10; i++) {
  if (i == 5) {
    // console.log(`favorite number detected`);
    break; // breaks the control flow, exits the loop
  }
  // console.log(`Number is ${i}`);  
}
for (let i = 1; i <= 10; i++) {
  if (i == 5) {
    // console.log(`favorite number detected`);
    continue; // skips the current iteration, but loop continues
  }
  // console.log(`Number is ${i}`);  
}

