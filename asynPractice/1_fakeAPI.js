setTimeout(() => {
    console.log("Fake API response received after 2 seconds");
}, 2000);

// JS -> setTimeout -> Browser timer

// Microtask Queue   -- Promises
    // -- Processed First (Before TaskQueue)
    Promise.resolve().then(()=>{console.log("Promise Resolved...")})

// Task Queue        -- setTimeout()
    setTimeout(() => {console.log("after a second...")}, 1000);

// Microtasks in Microtasks 
    Promise.resolve().then(()=>{
        console.log('level 1 promise')
        Promise.resolve().then(()=>{
            console.log('level 2 promise')
        })
    })

// queueMicrotasks (an API specifically for scheduling a microtask)

queueMicrotask(()=>{
    console.log('queueMicrotask');
})

// Promise -> pending, resolve, reject

// creating a promise
const promise1 = new Promise( (resolve, reject) => { } )
// (resolve, reject) => {} // executor function, js runs it immediately when a promise is created.

const promise2 = new Promise( (resolve, reject) => { resolve('Success') } )
// pending -> fulfilled -> success

const promise3 = new Promise( (resolve, reject) => { reject('something went wrong...') } )
// pending -> rejected -> something went wrong...

// using .then() // consuming the result...
const promise4 = new Promise( (resolve) => { resolve("Hello") } )
promise4.then( (value) => {console.log(value)} )
// when the promise fulfills, run this function...


function getUser1() {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve({
                name: 'John Doe',
                age: 20
            })
        }, 2000);
    })
}
getUser1().then((user)=>{console.log(user)})
// getUser() -> 
// Promise created -> 
// pending(setTimeout) -> 
// 2 seconds -> 
// resolve(user) -> 
// fulfilled -> 
// .then() -> 
// user

// .catch 
const promise5 = new Promise((resolve, reject)=>{reject(new Error('Failed'))})
promise5.catch((error) => { console.log(error) })

// .finally
getUser1()
    .then(user => {
        console.log(user);
    })
    .catch(error => {
        console.log(console.log(error))
    })
    .finally(() => {
        console.log('Finished');
        // finally() doesn't care whether the Promise fulfilled or rejected.
    })


// Promise Chaining
Promise.resolve(10)
    .then(value => {
        return value + 5; // new Promise
    })
    .then(value => {
        return value * 3; // new Promise
    })
    .then(value => {
        console.log(value);
    })
// 10 -> 10+5=15 -> 15*3=45 -> 45
// Promise -> .then() -> new Promise -> .then() -> new Promise -> .then()


// Returning a Promise
function getUser2() {
    return Promise.resolve(
        {
            name: 'Alex'
        }
    )
}
function getPosts2(user) {
    return Promise.resolve(
        [
            'Post 1',
            'Post 2'
        ]
    )
}
getUser2()
    .then(user => {
        return getPosts2(user)
    })
    .then(posts => {
        console.log(posts);
    })
// The first .then() returns another Promise.
// The next .then() waits for that Promise.
// getUser() ->
// Promise<User> ->
// .then() ->
// getPosts() ->
// Promise<Posts> ->
// .then() ->
// posts

// callback nesting eliminated

// Promise Error Propagation
getUser2()
    .then(user => {
        return getPosts2(user)
    })
    .then(posts => {
        throw new Error('Something failed') // return a rejected Promise
        // return Promise.reject(new Error('Ops')) // also produces a rejected promise
    })
    .catch(error => {
        console.log(error.message);
        
    })
// Promise
// then
// then
// Error
// catch



// ----  what .then() actually returns? ----

// every .then() returns a new Promise

// returning a normal value
Promise.resolve(10)
    .then(value => {
        return value * 2; // new Promise fulfilled with 20
    })
    .then(value => {
        console.log(value);
    });

// returning another promise
Promise.resolve(10)
    .then(value => {
        return Promise.resolve(value * 2);
    })
    .then(value => {
        console.log(value);
    });
// The next .then() doesn't receive the Promise object itself. it receives eventual value 20
// This is called Promise assimilation/adoption.

// --- why return matters ---
// if you don't use return in the first .then(), then it effectively returns undefined...
// so the next .then(), receives undefined...

Promise.resolve()
    .then(() => {
        throw new Error("Oops");
    })
    .catch(error => {
        console.log(error.message);
    });
// .then() throws
// the promise returned becomes rejected


// --- Promise Resolution ---

resolve(10) // normal value // fulfills with 10
resolve({name: 'Ben'}) // Object // fulfills with that object
resolve(Promise.resolve(10)) // outer promise follows the inner promise then 10




