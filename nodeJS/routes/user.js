const express = require("express");

const router = express.Router();

const User = require("../models/user");

const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUsers,
} = require("../controllers/user");

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

router.get("/show", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// REST API endpoints

router.route("/").get(handleGetAllUsers).post(handleCreateUsers);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
