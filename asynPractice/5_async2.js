async function getUser() {return {user: 'jack', age: 22}}
async function getPosts(user) {return {post: `${user.user}'s great day`}}

async function main1() {
    try {
        const user = await getUser();
        const posts = await getPosts(user);

        console.log(posts);
    } catch (error) {
        console.log("Something went wrong:", error);
    } finally {
        console.log("Finished Query");
        // hide loading indicators
        // cleaning resources
        // resetting state
        // releasing locks
    }
}

main1()


async function getUsers() {
    return [
        {
            userId: 1,
            name: 'john'
        },
        {
            userId: 2,
            name: 'alex'
        },
        {
            userId: 3,
            name: 'ben'
        },
        {
            userId: 4,
            name: 'kent'
        },
    ]
}

async function getProducts() {
    return [
        {
            productId: 1,
            name: 'foods'
        },
        {
            productId: 2,
            name: 'games'
        },
        {
            productId: 3,
            name: 'appliances'
        },
        {
            productId: 4,
            name: 'tools'
        },
    ]
}

async function getOrders() {
    return [
        {
            orderId: 1,
            name: 'panda'
        },
        {
            orderId: 2,
            name: 'bird'
        },
        {
            orderId: 3,
            name: 'fish'
        },
        {
            orderId: 4,
            name: 'tiger'
        },
    ]
}

async function main2() {
    const [users, products, orders] = await Promise.all(
        [
            getUser(),
            getProducts(),
            getOrders()
        ]
    )
}

Promise.all() // I need all of these operations to succeed.
Promise.allSettled() // You get information about all. (succeeded or failed)
Promise.race() // Give me the result of the first Promise to settle. (fulfilled OR rejected)
Promise.any() // Give me the first Promise that fulfills successfully.

// Method	                Waits for	            Fails when
// Promise.all()	        All	                    Any rejects
// Promise.allSettled()     All	                    Never because of individual rejection
// Promise.race()	        First settled	        First settled rejects
// Promise.any()	        First fulfilled	        All reject