const http = require("http")
const express = require("express");

const app = express();

// const myServer = http.createServer(app);
// myServer.listen(3000, () => {
//     console.log("Server Started!");
// })
app.listen(3000, () => {
    console.log("Server Started!");
})

app.get('/', (req, res) => {
    return res.send('Hello From Home Page')
})
app.get('/about', (req, res) => {
    return res.send('Hello From About Page')
})

