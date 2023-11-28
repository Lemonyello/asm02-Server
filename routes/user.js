const express = require("express");

const ctrlUser = require("../controllers/user");

const router = express.Router();

router.post("/admin-login", ctrlUser.adminLogin);

router.post("/user-login", ctrlUser.userLogin);

router.post("/user-signup", ctrlUser.userSignup);

router.get("/users", ctrlUser.getUsers);

module.exports = router;
