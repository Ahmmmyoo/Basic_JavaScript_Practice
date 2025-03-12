// Async JS Fundamentals

// JS
// - Synchronous (default behavior)
// - Single Thread (default behavior)

// Execution Context
// - execute one line of code at a time

// Asynchronous JavaScript
// - Allows for non-blocking operations
// - Uses callbacks, promises, and async/await for handling async operations

// Callbacks
// - Functions passed as arguments to other functions
// - Executed after the completion of a given task
// - Can lead to "callback hell" if not managed properly

// Promises
// - Objects representing the eventual completion or failure of an asynchronous operation
// - States: pending, fulfilled, rejected
// - Methods: then(), catch(), finally()

// Async/Await
// - Syntactic sugar over promises
// - Makes asynchronous code look synchronous
// - Uses the 'async' keyword to declare an async function
// - Uses the 'await' keyword to wait for a promise to resolve

// Event Loop
// - Handles asynchronous operations
// - Continuously checks the call stack and the task queue
// - Moves tasks from the task queue to the call stack when the call stack is empty

// Microtasks and Macrotasks
// - Microtasks: Promises, process.nextTick
// - Macrotasks: setTimeout, setInterval, I/O operations
// - Microtasks have higher priority over macrotasks

// Example of a Promise
const myPromise = new Promise((resolve, reject) => {
  if (true /* condition */) {
    resolve('Success!');
  } else {
    reject('Failure!');
  }
});

// Example of Async/Await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example of Event Loop
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');

