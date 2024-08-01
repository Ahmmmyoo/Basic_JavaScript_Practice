
// getting an element(button) by tag name
var btn = document.getElementsByTagName("button")[0];

btn.addEventListener("click", function() {
  console.log("CLICKK!!");
}) 

btn.addEventListener("mouseenter", function() {
  console.log("MOUSEINNN!");
})

btn.addEventListener("mouseleave", function() {
  console.log("MOUSEOUTT!");
})

//entering elements

var userInput = document.getElementById("userInput");
var inputBtn = document.getElementById("enter");
var ul = document.querySelector("ul");

function addingToList() {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(userInput.value));
  ul.appendChild(li);
  userInput.value = "";
}

function addListAfterClick() {
  if (userInput.value.length > 0) {
    addingToList();
  }
}

function addListAfterKeypress(event) {
  if((userInput.value.length > 0) && (event.key === "Enter")) {
    addingToList();
  }
}

inputBtn.addEventListener("click", addListAfterClick);

userInput.addEventListener("keypress", addListAfterKeypress);
