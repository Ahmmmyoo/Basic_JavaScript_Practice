


const query = "orange";

const res = await fetch(`https://api.duckduckgo.com/?q=${query}&format=json&no_html=1`);
const da = await res.json();
console.log(da);


