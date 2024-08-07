var css = document.querySelector("h3");
var colorLeft = document.getElementById("colorLeft");
var colorRight = document.getElementById("colorRight");
var body = document.getElementById("gradient");

// console.log("css");
// console.log("colorLeft");
// console.log("colorRight");
// console.log("body");

function setGradient() {
  body.style.background = "linear-gradient(to right, " + colorLeft.value + " , " + colorRight.value + ")";
  css.textContent = body.style.background;
}

setGradient();

colorLeft.addEventListener("input", function () {
  // console.log("colorLeft.value");
  setGradient();
})

colorRight.addEventListener("input", function () {
  // console.log("colorRight.value");
  setGradient();
})

