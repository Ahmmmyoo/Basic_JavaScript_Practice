// strings in JS

const name = "Sam"
const repoCount = 50

// console.log(name + " has " + repoCount + " repos");

// template literals // string interpolation
console.log(`typeof Name: ${typeof name}`);
console.log(`${name} has ${repoCount} repos`);

const gameName = new String("Super Mario Bros");

console.log(gameName.__proto__);

console.log(`typeof GameName: ${typeof gameName}`);
console.log(gameName.length);
console.log(gameName.toUpperCase());

console.log(`
  substring: ${gameName.substring(0, 5)}
  slice: ${gameName.slice(0, 5)}
  split: ${gameName.split(" ")}
  `)

const spaceName = "     space name @ fksd. c0mc   "
console.log(`
  orignal: ${spaceName}
  trim: ${spaceName.trim()}
  `)

const url = "https://google.com/name%20and%20space"
console.log(`
  orignal: ${url}
  replace: ${url.replace("%20", " ")}
  `)

