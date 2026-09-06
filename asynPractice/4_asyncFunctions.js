async function hello() {
    return 'Hello';
}
// this function returns Promise('Hello')
const result = hello();
console.log(result); // Promise { 'Hello' }

// async functions return a promise
async function getH() {return 'h'}
function getJ() {return Promise.resolve('j')}

console.log(getH); // [AsyncFunction: getH]
console.log(getJ); // [Function: getJ]

getH().then(v => {console.log(v)}) // h
getJ().then(v => {console.log(v)}) // j

// BUTT

const h = getH() // Promise
const j = getJ() // Promise

console.log(h); // Promise { 'h' }
console.log(j); // Promise { 'j' }

// async + throwing
async function throwError() {
    throw new Error('Oops')
}
throwError().catch((e) => {console.log(e.message)})


// await
async function waitExmp() {
    const val = await Promise.resolve(10);
    // await here means wait for this promise's result before continuing this async function.
    console.log(val);
}
// Promise -> await -> 10

// await only pauses the async function
{
    console.log('a');
    async function m() {
        console.log('b');
        await Promise.resolve(23); // here function m() pauses at await
        console.log('c');
    }
    m();
    console.log('d');
} // async -> await -> promise -> microtask -> event loop


// await is basically promise consumption
function getP() {return Promise.resolve('p')}

getP().then(v => {console.log(v)});

async function get() {
    const p = await getP();
    console.log(p);
}

// sequential async operations
function getUser() {return Promise.resolve({id: 1, name: 'ajax'})}
function getPosts(userId) {return Promise.resolve([{id: 101, userId, Title: 'my new post'}])}
function getComments(postId, userId) {return Promise.resolve([{id: 1011, userId, postId, comment: 'great post'}])}

async function mn() {
    const user = await getUser();
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id, posts[0].userId);

    console.log('mn', comments);
}

mn();

// here posts is an array of posts
const postsEmp = [
    { id: 101, title: "First Post" },
    { id: 102, title: "Second Post" }
];
// so posts[0] means the first post



// real practice

const users = [
    {
        id: 1,
        name: "Ali Khan",
        email: "ali@example.com",
        age: 24
    },
    {
        id: 2,
        name: "Sarah Ahmed",
        email: "sarah@example.com",
        age: 27
    },
    {
        id: 3,
        name: "John Smith",
        email: "john@example.com",
        age: 31
    }
];

const posts = [
    {
        id: 101,
        userId: 1,
        title: "Learning JavaScript",
        content: "I started learning JavaScript today."
    },
    {
        id: 102,
        userId: 1,
        title: "Understanding Async/Await",
        content: "Async and await make asynchronous code easier to read."
    },
    {
        id: 103,
        userId: 1,
        title: "My First JavaScript Project",
        content: "Today I finished my first JavaScript project."
    },

    {
        id: 201,
        userId: 2,
        title: "My Web Development Journey",
        content: "I started learning web development six months ago."
    },
    {
        id: 202,
        userId: 2,
        title: "CSS Tips for Beginners",
        content: "Here are some useful CSS tips I learned."
    },
    {
        id: 203,
        userId: 2,
        title: "Building Responsive Websites",
        content: "Responsive design is important for modern websites."
    },
    {
        id: 204,
        userId: 2,
        title: "JavaScript Array Methods",
        content: "Map, filter, and reduce are powerful array methods."
    },

    {
        id: 301,
        userId: 3,
        title: "Understanding APIs",
        content: "APIs allow different applications to communicate with each other."
    },
    {
        id: 302,
        userId: 3,
        title: "Node.js Basics",
        content: "Node.js allows us to run JavaScript outside the browser."
    },
    {
        id: 303,
        userId: 3,
        title: "Working With Databases",
        content: "Databases allow applications to store and retrieve information."
    },
    {
        id: 304,
        userId: 3,
        title: "My Backend Project",
        content: "I'm building a small backend application with Node.js."
    }
];

const comments = [
    {
        id: 1001,
        postId: 101,
        userId: 2,
        text: "Great start! Keep learning."
    },
    {
        id: 1002,
        postId: 101,
        userId: 3,
        text: "JavaScript is really fun once you understand the basics."
    },

    {
        id: 1003,
        postId: 102,
        userId: 2,
        text: "Async/await was confusing for me at first too."
    },
    {
        id: 1004,
        postId: 102,
        userId: 3,
        text: "Nice explanation!"
    },
    {
        id: 1005,
        postId: 102,
        userId: 1,
        text: "Thanks!"
    },

    {
        id: 1006,
        postId: 103,
        userId: 2,
        text: "Congratulations on your first project!"
    },

    {
        id: 1007,
        postId: 201,
        userId: 1,
        text: "Six months is a great amount of progress."
    },
    {
        id: 1008,
        postId: 201,
        userId: 3,
        text: "What technologies are you learning?"
    },

    {
        id: 1009,
        postId: 202,
        userId: 1,
        text: "These CSS tips are really helpful."
    },
    {
        id: 1010,
        postId: 202,
        userId: 3,
        text: "I especially liked the flexbox section."
    },
    {
        id: 1011,
        postId: 202,
        userId: 2,
        text: "Glad you found it useful!"
    },

    {
        id: 1012,
        postId: 203,
        userId: 1,
        text: "Responsive design is definitely important."
    },

    {
        id: 1013,
        postId: 204,
        userId: 3,
        text: "Reduce took me a while to understand."
    },
    {
        id: 1014,
        postId: 204,
        userId: 1,
        text: "Same here, but it's very useful."
    },

    {
        id: 1015,
        postId: 301,
        userId: 1,
        text: "APIs are an important backend concept."
    },
    {
        id: 1016,
        postId: 301,
        userId: 2,
        text: "Can you explain REST APIs next?"
    },

    {
        id: 1017,
        postId: 302,
        userId: 1,
        text: "Node.js is great for backend development."
    },

    {
        id: 1018,
        postId: 303,
        userId: 2,
        text: "Which database are you using?"
    },
    {
        id: 1019,
        postId: 303,
        userId: 3,
        text: "I'm currently learning PostgreSQL."
    },

    {
        id: 1020,
        postId: 304,
        userId: 1,
        text: "Good luck with your project!"
    },
    {
        id: 1021,
        postId: 304,
        userId: 2,
        text: "Can't wait to see the final version."
    },
    {
        id: 1022,
        postId: 304,
        userId: 3,
        text: "Keep building!"
    }
];


async function getUserById(userId) {
    if(!Number.isInteger(userId))
        return null;
    return users.find((usr => usr.id === userId));
}

async function getUserPosts(userId) {
    if(!Number.isInteger(userId))
        return null;    
    return posts.filter(pst => pst.userId === userId);
}

async function getUserCommentsByPost(postId) {
    if(!Number.isInteger(postId))
        return null;    
    return comments.filter(cmnt => cmnt.postId === postId);
}

(async function app() {
    const usr = await getUserById(1);
    const psts = await getUserPosts(usr.id);
    const cmnts = await getUserCommentsByPost(psts[0].id);

    console.log('user:', usr);
    console.log('post:', psts[0]);
    console.log('comment:', cmnts[0]);
    
})()

