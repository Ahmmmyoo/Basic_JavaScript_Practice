// Promise in JS

const promiseOne = new Promise(function (resolve, reject) {
  // Do an async task async task and then...

  setTimeout(() => {
    console.log('Async Task 1 Complete');
    resolve();
    // resolve('Promise 1 resolved');
  }, 300);
});

promiseOne.then(function () {
  console.log(`Promise 1 Consumed`);
})


// Other way to make a promise in JS

new Promise(function (resolve, reject) {
  // Do an async task 

  setTimeout(function () {
    console.log(`Async Task 2`);
    resolve();
  }, 400)
}).then(function () {
  console.log(`Async 2 Resolved`);
})




// Third Promise

const promiseThree = new Promise(function (resolve, reject) {
  // Do an async task

  setTimeout(function () {
    resolve({
      username: "John Smith", email: "john@example.come"
    });
  }, 500)
}).then(function (user) {
  console.log(user);
})



// Fourth Promise

const promiseFour = new Promise(function (resolve, reject) {
  // Do an async task

  setTimeout(function () {
    let error = false;
    if (!error) {
      resolve({ username: "John Smith", password: "234kefwbejrb1" });
    } else {
      reject(`Error: Something went wrong`);
    }
  }, 600)
});

promiseFour
  .then((user) => {
    return user.username
  })
  .then((username) => {
    console.log(username);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(() => console.log(`the promise is resolved or rejected`));



// Fifth Promise 

const promiseFive = new Promise(function (resolve, reject) {
  // Do an async task

  setTimeout(function () {
    let error = true;
    if (!error) {
      resolve({ username: "JavaScript", password: "123" });
    } else {
      reject(`Error: JS went wrong`);
    }
  }, 700)
})

// promiseFive
//   .then(function(user) {
//     console.log(user);
//   })
//   .catch(function(error) {
//     console.log(error);
//   })

// another approach

async function consumePromiseFive() {
  // const response = await promiseFive
  // console.log(response);

  try {
    const response = await promiseFive
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

consumePromiseFive()



// Practice

// async function getAllUsers() {
//   try {
//     const responseUsers = await fetch('https://jsonplaceholder.typicode.com/users')
//     // console.log(responseUsers);

//     const data = await responseUsers.json()
//     console.log(data);

//   } catch (error) {
//     console.log("Error: ", error);
//   }
// }

// getAllUsers()

// other way to handle it

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(`Name : ${data[0].name}`);
  })
  .catch(function (error) {
    console.log(error);
  })


// fetch('https://randomuser.me/api')
//   .then((response) => {
//     return response.json()
//   })
//   .then((data) => {
//     console.log(`Random User State: ${data.results[0].location.state}`);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })

