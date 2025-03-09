// Immediately Invoked Function Expression (IIFE)

// (function () {console.log("IIFE")})()

function conn() {
  console.log(`DB Connected`);
}
// conn();

// (function () {
//   console.log(`IIFE`);
// })();

// (function chai() {
//   // named IIFE
//   console.log(`IIFE`);
// })();

// (function definition)(execution) ; this ends the existence of the function

// (() => {
//   console.log(`arrow IIFE`);
// })(); //removing ; will cause error
// (() => {
//   console.log(`arrow IIFE`);
// })();

// ((name) => {
//   console.log(`welcome ${name}`);
// })("Ryu");

