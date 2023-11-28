const User = require("../models/user");

exports.userSignup = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username, isAdmin: false });

    if (user)
      return res.status(400).json({ msg: "Username is already taken." });

    const u = new User({ ...req.body, isAdmin: false });

    await u.save();

    res.status(200).json({ msg: "Signup successfully." });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password, isAdmin: false });

    if (user) return res.status(200).json({ msg: "Login successfully." });

    res.status(400).json({ msg: "Username or password is incorrect." });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password, isAdmin: true });

    if (user) return res.status(200).json({ msg: "Login successfully." });

    res.status(400).json({ msg: "Username or password is incorrect." });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false });

    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};
