const express = require("express");
const router = express.Router();
const signupCtrl = require("../controller/signup.controller");
const loginCtrl = require("../controller/login.controller");
const meCtrl = require("../controller/me.controller");
const auth = require("../middleware/auth");
const logoutCtrl = require("../controller/logout.controller");

router.post("/signup", signupCtrl);

router.post("/login", loginCtrl);

router.get("/me", auth, meCtrl);

router.post("/logout",auth, logoutCtrl);

module.exports = router;
