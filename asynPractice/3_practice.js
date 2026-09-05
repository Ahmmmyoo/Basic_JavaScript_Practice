async function getNumber() {
    return 20;
}
const x = getNumber();
console.log(x); // Promise { 20 }
// here x is a promise

const y = x.then(g => { // x.then(...) immediately creates and returns a new promise
    return g * 3;
})
console.log('simple',y); //simple Promise { <pending> }
console.log(y.then(r => console.log('notSimple',r)));


setTimeout(() => {y.then(j => { // creates a task, tasks always runs after microTasks (Promises)
    console.log('timeOutJ',j); // gives 60 at the end
})}, 3);


Promise.resolve(15).then(value => {
    console.log(value); // 15
})

Promise.resolve(10).then(error => {
    console.log('e1',error); // 10
    return 2; // 2 is returned
}).catch(error => {
    console.log('e2',error); // not printed // skipped catch block
    return 5; // not passed to finally // skipped catch block
}).finally((valuePassed) => {
    console.log('Finally'); // Finally
    console.log(valuePassed); // undefined // didn't get a value
    return 3; // not passed to then
}).then((val) => {
    console.log('last then'); // last then
    console.log(val); // 2 // passed from first then
})



// rejected promise does not Normally go to the next .then()

Promise.reject(new Error("Oooops"))
    .then(() => { 
        console.log("A"); // skipped
    })
    .then(() => { 
        console.log("B"); // skipped
    })
    .catch(error => {
        console.log(error.message);
    });
// prints Oops

// A rejection passes through .then() handlers that don't have an onRejected handler until it finds an error handler.

// But .then() CAN consume a rejection
// .then() actually accepts two callbacks:
// .then(onFulfilled, onRejected)

Promise.reject(new Error("Ouchhhh"))
    .then(
        value => {console.log("success:", value)},
        error => {console.log("error:", error.message)}
    );



// What happens after .catch()?
Promise.reject(new Error("Oops"))
.catch(error => {
    console.log("error handled");
    // no return means: return undefined
})
.then(value => {
    console.log("nextThenBlock:", value); 
});
// the value is undefined as catch block didn't return a value
// catch CAN return a value
Promise.reject(new Error("Oops"))
    .catch(error => {
        console.log("handled");
        return 78;
    })
    .then(value => {
        console.log("nextThenBlock2:", value);
    });
// the value becomes 78 as it is returned by the catch block

// A rejected Promise can become a fulfilled Promise if a rejection handler handles the error and returns normally.

//                INPUT PROMISE
//                    │
//                    ▼
//              ┌─────────────┐
//              │    .then   │
//              │             │
//              │ callback()  │
//              └──────┬──────┘
//                     │
//         ┌───────────┼───────────┐
//         │           │           │
//         ▼           ▼           ▼
//     return 20    no return    throw Error
//         │           │           │
//         ▼           ▼           ▼
//    Fulfilled    Fulfilled    Rejected
//       20        undefined       Error

// Promise
//   ↓
// .then()
//   ↓
// Promise
//   ↓
// .then()
//   ↓
// Promise
//   ↓
// .catch()
//   ↓
// Promise
//   ↓
// .then()
//   ↓
// Promise

// ------         RULES            -----------

// return value
// → fulfilled Promise containing value

// return Promise
// → resulting Promise follows that Promise

// no return
// → fulfilled Promise containing undefined

// throw Error
// → rejected Promise containing that Error

// rejected Promise
// → skips normal .then() handlers

// catch / onRejected
// → handles the rejection

// catch that returns normally
// → creates a fulfilled Promise

// catch that throws
// → creates another rejected Promise


