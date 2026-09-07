// fetch() -> Promise<Response>

// when you do 
const p = fetch('https://jsonplaceholder.typicode.com/users/1');
// it immediately returns a Promise, but that Promise is not resolved yet.

// fetch()
//    ↓
// returns Promise
//    ↓
// pending ⏳
//    ↓
// network request happens...
//    ↓
// server responds
//    ↓
// Promise fulfilled with a Response object

console.log(`p: --- `,p); // p: --- Promise { <pending> }

// The response here is a Response object, not yet the actual JSON/data inside the response.
// Here's a Promise. Its result will be a Response once the network operation reaches the point where a response is available.

const p2 = await p;
// this is a response object
console.log('p2: --- ',p2);

const p3 = p2.json();
// this also returns a promise.
// Here's another Promise. Its result will be the parsed body once the body has been read and parsed.
console.log('p3: --- ',p3); 

const p4 = await p3;
// now this is the parsed response...
console.log('p4: --- ',p4);



// Browser
//    │
//    │ HTTP Request       Method URL Headers Body
//    ▼
// Server
//    │
//    │ HTTP Response      Status Headers Body
//    ▼
// Browser

// const response = await fetch('/api/users');
// const users = await response.json(); // JSON -> JS data
// console.log(response);
// // GET request



// POST request

// const reponse2 = await fetch('/api/users', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ // JS data -> JSON text
//         name: 'Alan',
//         age: 21
//     })
// })

// simple GET request
async function getUser() {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
    );

    const user = await response.json();

    return user;
}
// getUser(); // this is a promise...

async function getUserById(userId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    const user = await response.json();

    return user;
}

async function getUsers() {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const users = await response.json();

    return users;
}

const users = await getUsers();
console.log('first user name:',users[0]?.name);


// simple POST request
async function createPost() {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "Learning Fetch",
                body: "I am learning how to make POST requests.",
                userId: 1
            })
        }
    );

    const post = await response.json();

    console.log(post);
}
createPost();



// HTTP Errors vs Fetch Errors
async function getUsersErrHndle() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        // error handling
        if (!response.ok) { // checks if status is in range 200-299
            throw new Error(`HTTP error: ${response.status}`);
        }

        const users = await response.json();

        return users;

    } catch (error) {
        console.error(error);
    }
}
// console.log(getUsersErrHndle().then(urs => urs[3]?.name)); 
// returns a pending promise
// as .then() returns a promise

// use await for pending promise
console.log(await getUsersErrHndle().then(urs => urs[3]?.name)); 