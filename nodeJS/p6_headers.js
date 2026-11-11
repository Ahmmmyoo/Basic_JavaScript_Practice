const express = require("express");
const fs = require("fs");

const users = require("./MOCK_DATA_Users.json");

const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

/// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  next();
});

app.use((req, res, next) => {
  fs.appendFile(
    "nodeJS/log.txt",
    `${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    },
  );
});

// REST API - JSON

// GET /api/users - list all users
// GET /users - HTML Document Render

// GET /api/users/1 - get the user with id 1
// GET /api/users/2 - get the user with id 2

// Dynamic Path Parameters
// GET /api/user/:id
// :id -> Dynamic / Variable

// POST /api/users - create new user

// PATCH /api/user/1 - edit user with id 1

// DELETE /api/user/1 - delete the user with id 1

// www.mockaroo.com - generate fake data for testing

app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// REST API endpoints

app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Piyush Garg");
  // Always add X to custom headers

  return res.json(users);
});
app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("Body", body);
  users.push({ id: users.length + 1, ...body });
  fs.writeFile(
    "./nodeJS/MOCK_DATA_Users.json",
    JSON.stringify(users, null, 2),
    (err, data) => {
      return res.json({ status: "success", id: users.length });
    },
  );
});

app.get("/api/user/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  return res.json(user);
});
app.patch("/api/user/:id", (req, res) => {
  return res.json({ status: "pending" });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    return res.json({ status: "pending get" });
  })
  .patch((req, res) => {
    return res.json({ status: "pending patch" });
  })
  .put((req, res) => {
    return res.json({ status: "pending put" });
  })
  .delete((req, res) => {
    return res.json({ status: "pending delete" });
  });
