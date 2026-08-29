// how to create new elements in DOM

// Selects the first element that has the class "parent" and stores it in parent.
const parent = document.querySelector(".parent");
// Intended to access the first child element inside parent.
parent.childern[0]
// Intended to read the HTML content of the first child element.
parent.childern[0].innerHTML

// Intended to loop through all child elements inside parent.
for (let i = 0; i < parent.childern.length; i++) {
  // Intended to read the HTML content of each child element one by one.
  parent.childern[i].innerHTML
}

// Intended to store the first child element of parent in dayOne.
let dayOne = parent.childern[0]

// Accesses the parent element of dayOne.
dayOne.parentElement
// Accesses the next sibling element after dayOne.
dayOne.nextElementSibling

// Gets all child nodes of parent, including element nodes, text nodes, and comments.
parent.childNodes


// Creates a new <div> element and stores it in div.
const div = document.createElement("div")
// Sets the class of the new div to "main".
div.className = "main"
// Sets a random numeric id on the new div.
div.id = Math.round((Math.random() * 1000) + 1)
// Adds a title attribute with the value "Hello" to the div.
div.innerText = "Chai aur Code" // overwrites; ❌ don't use it for safety...

div.setAttribute("title", "Hello") // title = "Hello" // faster way - optimized, devs use this
// setAttribute adds and doesn't overwrite...

const addText = document.createTextNode("Chai aur Code") // makes a TextNode
div.appendChild(addText) // adds a node to the end...
// document.body.appendChild(div) // adds the div to the body...

// Changes the background color of the div to green.
div.style.background = "green"
// Adds 12px padding inside the div.
div.style.padding = "12px"
// This commented example would directly set the visible text inside the div.
// div.innerText = "Hello"
// Creates a text node containing the word "Hello".
const addText = document.createTextNode("Hello")
// Appends the text node inside the div.
div.appendChild(addText)
// Appends the new div inside the parent element.
parent.appendChild(div)

// Appends the same div directly to the document body.
document.body.appendChild(div)


