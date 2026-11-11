const express = require("express");

const { logReqRes } = require("./middlewares");

const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");

// const users = require("./MOCK_DATA_Users.json");


const app = express();
const PORT = 3000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/practice")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Mongo Err: ", err);
  });

/// Middleware
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("/nodeJS/log.txt"));

// app.use((req, res, next) => {});

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
