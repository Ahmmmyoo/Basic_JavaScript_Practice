// high order array loops


// ["", "", ""]
// [{}, {}, {}]

const arr = [1, 2, 3, 4, 5];

for (const num of arr) {
  // console.log(num);
}

const str = "hello world!";

for (const char of str) {
  // console.log(char);
}

// Maps

const myMap = new Map();

myMap.set("USA", "United States of America");
myMap.set("UK", "United Kingdom");
myMap.set("CA", "Canada");
myMap.set("USA", "United States of America");

// console.log(myMap);


for (const entry of myMap) {
  // console.log(entry);
}

for (const [key, value] of myMap) {
  // console.log(key, ':-', value);
}

const gamesObject = {
  "game1" : "NFS",
  "game2" : "SpiderMan",
  "game3" : "BatMan"
}

// for (const [key, value] of gamesObject) {
  // console.log(key, ":-", value); does not work
// }


const myObj = {
  js: 'javascript',
  cpp: 'C++',
  rb: 'ruby',
  swift: 'swift by apple',
}

for (const key in myObj) {
  // console.log(`${key} shortcut is for ${myObj[key]}`);
}

const programming = ['js', 'rb', 'py', 'java', 'cpp']

// for (const key in programming) {
  // console.log(programming[key]);
// }

// for (const key in myMap) {
//   console.log(key); // wont work, map isnt iteratable
// }

arr.forEach(function (item) {
  // console.log(item);
});

arr.forEach((item) => {
  // console.log(item);
})

function printMe(item) {
  // console.log(item);
}

// arr.forEach(printMe);

arr.forEach( (item, index, fullarr) => {
  // console.log(item, index, fullarr);
})

const myCoding = [
  {
    languageName: "javascript",
    languageFileName: "js",
  },
  {
    languageName: "python",
    languageFileName: "py",
  },
  {
    languageName: "c++",
    languageFileName: "cpp",
  },
  {
    languageName: "java",
    languageFileName: "java",
  },
  {
    languageName: "ruby",
    languageFileName: "rb",
  }
]

myCoding.forEach( (item) => {
  // console.log(item.languageName);
});

