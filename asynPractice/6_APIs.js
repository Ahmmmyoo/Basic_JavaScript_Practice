// fetch() -> Promise<Response>

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

    // error handling
    if(!response.ok) { // checks status in range 200-299
        throw new Error(`Request Failed: ${response.status}`)
    }

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



