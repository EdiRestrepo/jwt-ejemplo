const express = require("express");
const router = express.Router();
const signupCtrl = require("../controller/signup.controller");
const loginCtrl = require("../controller/login.controller");


router.post("/signup", signupCtrl );

router.post("/login", loginCtrl );

module.exports = router;
