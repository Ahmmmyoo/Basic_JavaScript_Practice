// All DOM selectors NodeList and HTMLCollection

// Reads the HTML content inside the element whose id is "demo".
document.getElementById("demo").innerHTML

// Selects a single element by its id.
document.getElementById("id")
// Selects all elements that have the class name "className".
document.getElementsByClassName("className")
// Selects all elements with the given tag name.
document.getElementsByTagName("tagName")

// Intended to get the value of an attribute from the element with id "id".
document.getElementsById("id").getAttribute("attribute")
// Intended to get the id attribute value from the element with id "id".
document.getElementsById("id").getAttribute("id")
// Intended to set an attribute to a new value on the element with id "id".
document.getElementsById("id").setAttribute("attribute", "value")
// Intended to change the class attribute of the element with id "id" to "heading".
document.getElementsById("id").setAttribute("class", "heading")

// Stores the element with id "title" in the variable title.
title = document.getElementById("title")

// Changes the text color of the title element to red.
title.style.color = "red"
// Changes the font size of the title element to 100px.
title.style.fontSize = "100px"
// Changes the background color of the title element.
title.style.backgroundColor = "#242424"

// textContent returns the text content of the element and its descendants, without any HTML tags.
title.textContent

// innerHTML returns the HTML content of the element, including tags.
title.innerHTML

// innerText returns the visible text content of the element, considering CSS styles (e.g., ignores hidden elements).
title.innerText

// Selects the first element that matches the given tag selector.
document.querySelector("tag")
// Selects the first password input element.
document.querySelector('input[type="password"]')
// Selects the first element with the given id.
document.querySelector("#id")
// Selects the first element with the given class.
document.querySelector(".class")

// Selects all <li> elements and returns them as a NodeList.
document.querySelectorAll('li')

// example of nodelist
// Stores all elements with class "list-item" in a NodeList.
const nodeList = document.querySelectorAll(".list-item");
// Loops through each item in listItems and changes its text color to red.
listItems.forEach((item) => {
  // Applies red text color to the current item.
  item.style.color = "red";
});

// example of htmlcollection
// Stores all elements with class "list-item" in an HTMLCollection.
const htmlCollection = document.getElementsByClassName("list-item");

// Loops through each item in listItems using a traditional for loop.
for (let i = 0; i < listItems.length; i++) {
  // Applies red text color to the current item.
  listItems[i].style.color = "red";
}

// Converts the HTMLCollection into a real array.
arrHTMLcollection = Array.from(htmlCollection)

// Loops through each list item in the converted array.
arrHTMLcollection.forEach(function(li) {
  // Applies red text color to the current list item.
  li.style.color = "red"
})

