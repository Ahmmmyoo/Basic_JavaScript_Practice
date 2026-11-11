const express = require("express");

const staticRouter = express.Router();

staticRouter.get("/", async (req, res) => {
  res.render("main.ejs");
});

module.exports = staticRouter;
