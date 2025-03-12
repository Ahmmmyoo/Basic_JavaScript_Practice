// Date and Time in depth in JS

// Dates

let myDate = new Date();
// console.log(`${myDate}`);
// console.log(`toString: ${myDate.toString()}`);
// console.log(`toDateString: ${myDate.toDateString()}`);
// console.log(`toISOString: ${myDate.toISOString()}`);
// console.log(`toJSON: ${myDate.toJSON()}`);
// console.log(`toLocalString: ${myDate.toLocaleString()}`);
// console.log(`toLocalDateString: ${myDate.toLocaleDateString()}`);
// console.log(typeof myDate);


// let myCreatedDate = new Date(2001, 1, 10);
// let myCreatedDate = new Date(2001, 1, 10, 5, 30, 20, 0);
// let myCreatedDate = new Date("2023-01-23");
let myCreatedDate = new Date("1-14-2023");
// console.log(myCreatedDate.toLocaleString());

let myTimeStamp = Date.now();
// console.log(myTimeStamp);

// console.log(myCreatedDate.getTime());

// console.log(Math.floor(Date.now()/1000));

let newDate = new Date();
// console.log(newDate)
// console.log(newDate.getMonth());
// console.log(newDate.getDay());
// console.log(newDate.getFullYear());
// console.log(newDate.getHours());
// console.log(newDate.getMinutes());
// console.log(newDate.getSeconds());
// console.log(newDate.getMilliseconds());
// console.log(newDate.getTimezoneOffset());

let customDateFormat = newDate.toLocaleString("default", {
  weekday: "long",
  day: "2-digit",
});
console.log(customDateFormat);

// toLocalString can be used for formatting dates and numbers as well

let balance = (1020.75).toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
});
console.log(balance);