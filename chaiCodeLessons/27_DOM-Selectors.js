// All DOM selectors NodeList and HTMLCollection

document.getElementById("demo").innerHTML

document.getElementById("id")
document.getElementsByClassName("className")
document.getElementsByTagName("tagName")

document.getElementsById("id").getAttribute("attribute")
document.getElementsById("id").getAttribute("id")
document.getElementsById("id").setAttribute("attribute", "value")
document.getElementsById("id").setAttribute("class", "heading")

title = document.getElementById("title")

title.style.color = "red"
title.style.fontSize = "100px"
title.style.backgroundColor = "#242424"

// textContent returns the text content of the element and its descendants, without any HTML tags.
title.textContent

// innerHTML returns the HTML content of the element, including tags.
title.innerHTML

// innerText returns the visible text content of the element, considering CSS styles (e.g., ignores hidden elements).
title.innerText

document.querySelector("tag")
document.querySelector('input[type="password"]')
document.querySelector("#id")
document.querySelector(".class")

document.querySelectorAll('li')

// example of nodelist
const nodeList = document.querySelectorAll(".list-item");
listItems.forEach((item) => {
  item.style.color = "red";
});

// example of htmlcollection
const htmlCollection = document.getElementsByClassName("list-item");
for (let i = 0; i < listItems.length; i++) {
  listItems[i].style.color = "red";
}

arrHTMLcollection = Array.from(htmlCollection)

arrHTMLcollection.forEach(function(li) {
  li.style.color = "red"
})

