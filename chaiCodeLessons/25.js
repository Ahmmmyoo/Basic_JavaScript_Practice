// Filter map and reduce in JS

const coding = ["js", "python", "c++", "java", "ruby"];

// const values = coding.forEach((item) => {
//   console.log(item);
//   return item
// })
// console.log(values);

const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const newNums = myNums.filter( (num) => num > 4 )
const newNums = myNums.filter((num) => {
  return num > 4; // have to return explicitly
})
// console.log(newNums);

const nNums = []
myNums.forEach((num) => {
  if (num > 4) {
    nNums.push(num)
  }
})

// console.log(nNums);


const books = [
  {
    title: "Book One",
    genre: "Fiction",
    publish: 1981,
    edition: 2004
  },
  {
    title: "Book Two",
    genre: "Non-Fiction",
    publish: 1992,
    edition: 2008
  },
  {
    title: "Book Three",
    genre: "History",
    publish: 1999,
    edition: 2011
  },
  {
    title: "Book Four",
    genre: "Non-Fiction",
    publish: 2009,
    edition: 2014
  },
  {
    title: "Book Five",
    genre: "Science",
    publish: 2009,
    edition: 2014
  },
  {
    title: "Book Six",
    genre: "History",
    publish: 2014,
    edition: 2018
  },
  {
    title: "Book Seven",
    genre: "Science",
    publish: 1987,
    edition: 1996
  }
]

const userBooks = books.filter((book) => {
  // return book.genre === "History"
  // return book.publish > 2000;
  // return book.publish > 2000 && book.genre === "History"
})

// console.log(userBooks);

// chaining

const nnNums = myNums
  .map((num) => num * 10)
  .map((num) => num + 1)
  .filter((num) => num > 40)

// console.log(nnNums);


const num = [1, 2, 3, 4];

// const myTotal = num.reduce((total, num) => total + num, 0)

// const errorTotal = num.reduce((total, num) => {
//   console.log(`acc: ${total}, num: ${num}`);
//   return total + num
// }, 0)
// console.log(errorTotal);


// const myTotal = num.reduce(function (total, num) {
//   console.log(`acc: ${total}, num: ${num}`);
//   return total + num
// }, 0)
// console.log(myTotal);

// const myTotal = num
//   .reduce((acc, curr) => acc + curr, 0)
// console.log(myTotal);

const shoppingCart = [
  {
    item: "apple",
    price: 2.99
  },
  {
    item: "banana",
    price: 3.99
  },
  {
    item: "orange",
    price: 4.99
  },
  {
    item: "grape",
    price: 5.99
  }
]

const myTotal = shoppingCart
  .reduce((acc, item) => acc + item.price, 0)
  // .toLocaleString("en-US", {
  //   style: "currency",
  //   currency: "USD"
  // })
console.log(myTotal);

