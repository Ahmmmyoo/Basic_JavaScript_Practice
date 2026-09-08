


// -----  Async Iterators  -----

async function getUser(val) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${val}`);
    const user = await response.json();
    return user?.name
}

const users = [getUser(1),getUser(2),getUser(3),getUser(4),getUser(5)];
// users
//   ↓
// [
//   Promise 1,
//   Promise 2,
//   Promise 3,
//   Promise 4,
//   Promise 5
// ]

(async () => {
    for await (const u of users) { // "Take each item, and if it's a Promise, wait for it to resolve before giving me the value."
        console.log(u);
    }
})()

// for await is not making your five fetches sequential. Since you called all five getUser() functions first, all five fetches have already started concurrently. The for await loop then waits for them in array order.

// ---- Async Generators ----

// The * makes it a generator, while async makes it an async generator.
async function* getUsers() {
    yield await getUser(1);
    yield await getUser(2);
    yield await getUser(3);
    yield await getUser(4);
    yield await getUser(5);
}

// When you call:
// getUsers()
// it doesn't immediately execute the whole function.
// Instead, you get an async generator object:

// getUsers()
//     ↓
// AsyncGenerator


(async function main() {
    for await (const user of getUsers()) {
        console.log('g: ',user);
    }
})()

// for await (const user of getUsers())
// asks the generator for the next value:

// next()
//   ↓
// getUser(1)
//   ↓
// await fetch
//   ↓
// yield "Leanne Graham"
//   ↓
// loop receives it

// Then the loop asks for the next value:

// next()
//   ↓
// getUser(2)
//   ↓
// await fetch
//   ↓
// yield "Ervin Howell"
//   ↓
// loop receives it

// And so on.

// getUser(1) ──────→ done
//                      ↓
// getUser(2) ──────→ done
//                      ↓
// getUser(3) ──────→ done

// With the generator, the next fetch doesn't start until the previous value has been consumed.


// ---- retry logic ----

// Request
//    ↓
// Network error

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function fetchWithRetry(url) {
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return response;

        } catch (error) {
            console.log(`Attempt ${attempt} failed`);

            if (attempt === 3) {
                throw error;
            }

            // immediate retries aren't ideal
            // You're hammering an already struggling server.
            // Instead, wait between attempts.
            // That's where backoff comes in.

            const delay = 1000 * 2 ** (attempt -1);

            // In production systems, you often don't want thousands of clients retrying with exactly the same delay
            // Add jitter (randomness)

            const delayRandomness = delay + Math.random() * 500;

            // Math.radom() * 500 gives us that random jitter...
            // Now clients retry at slightly different times...

            await wait(delayRandomness);
        }
    }
}


// ----- Timeouts -----

async function getDataWithTimeout(url) {
    const response = await fetch(url, {
        signal: AbortSignal.timeout(5000) // Now the request is automatically aborted if it exceeds the timeout.
    });

    return response.json();
}
