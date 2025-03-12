// how to create new elements in DOM

const parent = document.querySelector(".parent");
parent.childern[0]
parent.childern[0].innerHTML

for (let i = 0; i < parent.childern.length; i++) {
  parent.childern[i].innerHTML
}

let dayOne = parent.childern[0]

dayOne.parentElement
dayOne.nextElementSibling

parent.childNodes


const div = document.createElement("div")
div.className = "main"
div.id = Math.round((Math.random() * 1000) + 1)
div.setAttribute("title", "Hello") // title = "Hello" // faster way - optimized, devs use this
div.style.background = "green"
div.style.padding = "12px"
// div.innerText = "Hello"
const addText = document.createTextNode("Hello")
div.appendChild(addText)
parent.appendChild(div)

document.body.appendChild(div)

