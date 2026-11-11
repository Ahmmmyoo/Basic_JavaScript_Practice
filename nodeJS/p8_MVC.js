const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

// const users = require("./MOCK_DATA_Users.json");

const app = express();
const PORT = 3000;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/practice")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Mongo Err", err);
  });

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

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

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// REST API endpoints

app.get("/api/users", async (req, res) => {
  res.setHeader("X-MyName", "Dev Practice User");
  // Always add X to custom headers

  const AllDbUsers = await User.find({});

  return res.json(AllDbUsers);
});
app.post("/api/users", async (req, res) => {
  const body = req.body;
  console.log("Body", body);
  //   users.push({ id: users.length + 1, ...body });
  //   fs.writeFile(
  //     "./nodeJS/MOCK_DATA_Users.json",
  //     JSON.stringify(users, null, 2),
  //     (err, data) => {
  //       return res.json({ status: "success", id: users.length });
  //     },
  //   );
  await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "success" });
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
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "changed"});
    return res.json({ status: "success" });
  })
  .put((req, res) => {
    return res.json({ status: "pending put" });
  })
  .delete((req, res) => {
    return res.json({ status: "pending delete" });
  });
