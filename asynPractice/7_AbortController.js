

const controller = new AbortController();

async function getUser1() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
            signal: controller.signal
        });

        // error handling
        if (!response.ok) { // checks if status is in range 200-299
            throw new Error(`HTTP error: ${response.status}`);
        }

        const user = await response.json();

        return user;

    } catch (error) {
        console.error(`errorrrrr: ${error}`);
    }
}

controller.abort(); // aborts the async operation before it has completed

const user1 = await getUser1().then(r => r)

console.log(`name: ${user1?.name}`);



// --------- Debouncing -----------

// The idea: Wait until the user stops typing for a short period.

let timer;

async function fetchResults(value) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${value}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const user = await response.json();

        return user?.name;

    } catch (error) {
        console.error(`errorrrrr: ${error}`);
    }
}

function search(value) {
    clearTimeout(timer);

    return new Promise((resolve) => {
        timer = setTimeout(async () => {
            const result = await fetchResults(value);
            resolve(result);
        }, 300);
    });
}

function searchName(val) {
    search(val).then(name => {
        console.log('search: --- name:', name);
    })
}

searchName(1);
searchName(2);
searchName(3);
searchName(4);

// 0ms     search(1)
//         └── setTimeout #1 scheduled for 300ms

// 100ms   search(2)
//         └── clearTimeout(#1)  ❌
//         └── setTimeout #2 scheduled

// 200ms   search(3)
//         └── clearTimeout(#2)  ❌
//         └── setTimeout #3 scheduled

// 300ms   search(4)
//         └── clearTimeout(#3)  ❌
//         └── setTimeout #4 scheduled

// 600ms   setTimeout #4 runs
//         └── fetchResults(4)
//              └── fetch(...)

// "Don't do the operation until the user has stopped triggering it for 300ms."


// Adding Abort Controller to this --------

let timer2;
let controller2;

function search2(value) {
    clearTimeout(timer2);

    // Cancel previous fetch
    controller2?.abort();

    controller2 = new AbortController();

    timer2 = setTimeout(async () => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${value}`,
                {
                    signal: controller2.signal
                }
            );

            const user = await response.json();

            console.log('search(abort): ',user.name);

        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Previous request cancelled');
            } else {
                console.error(error);
            }
        }
    }, 300);
}

search2(1);
search2(3);
search2(5);
search2(7);

// search(1)
//    ↓
// ⏰ timer

// search(2)
//    ↓
// cancel timer for 1
//    ↓
// cancel fetch for 1 (if it already started)
//    ↓
// ⏰ new timer for 2

// Debouncing prevents unnecessary requests from starting. AbortController cancels requests that have already started.

// Debounce: Run after the activity stops.
// Throttle: Run at most once during a specific interval.

