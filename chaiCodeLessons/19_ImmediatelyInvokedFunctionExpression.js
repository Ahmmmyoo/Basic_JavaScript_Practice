// Immediately Invoked Function Expression (IIFE)

// (function () {console.log("IIFE")})();

// the semicolon ; at the end is important, it tells the IIFE where to stop...

function conn() {
  console.log(`DB Connected`);
}
// conn();

// (function () {
//   console.log(`IIFE`);
// })();

// (function chai() { // named IIFE; chai is the name
//   // named IIFE
//   console.log(`IIFE`);
// })();

// (function definition)(execution) ; this ends the existence of the function

// (() => {
//   console.log(`arrow IIFE`);
// })(); // removing ; will cause error

// (() => {
//   console.log(`arrow IIFE`);
// })();

// this is how to pass to a function...
// ((name) => {                              // expects the name here
//   console.log(`welcome ${name}`);         // uses the name here
// })("Ryu");                                // from here we will pass the name to the function

