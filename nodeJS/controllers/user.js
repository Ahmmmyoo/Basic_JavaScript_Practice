const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleCreateUsers(req, res) {
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
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  return res.json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

module.exports = {
  handleGetAllUsers,
  handleCreateUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
