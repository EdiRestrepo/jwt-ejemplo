const express = require("express");
const router = express.Router();
const signupCtrl = require("../controller/signup.controller");
const loginCtrl = require("../controller/login.controller");
const meCtrl = require("../controller/me.controller");
const auth = require("../middleware/auth");
const { createContact, getAllContacts } = require("../service/contacts");

const invalidatedTokens = new Set();

const validToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if(invalidatedTokens.has(token)){
    return res.status(401).json({
        status:"error",
        code:401,
        message: "Unathorized: Invalid token",
        data: "Unathorized",
    })
  }
  next();
};

router.post("/signup", signupCtrl);

router.post("/login", loginCtrl);

router.get("/me", validToken, auth, meCtrl);

router.post("/logout", validToken, auth, (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  invalidatedTokens.add(token);
  console.log(Array.from(invalidatedTokens));
  res.status(200).json({
    status:"success",
    code:200,
    message: "Logout: successful",
    data: "Success",
  });
});

router.post("/contacts", validToken, auth, async (req, res, next) => {
  const {name, email, phone, favorite} = req.body;
  const owner = req.user._id;
  try{
    const result = await createContact({name,email,phone,favorite, owner});
    res.status(201).json({
        status:"created",
        status: 201,
        data:{contact: result},
    })
  }catch(e){
    next(e);
  }
  });

  router.get("/contacts", validToken, auth, async (req, res, next) => {
    const owner = req.user._id;
    try{
      const result = await getAllContacts({ owner});
      res.status(200).json({
          status:"success",
          status: 200,
          data:{contact: result},
      })
    }catch(e){
      next(e);
    }
    });

module.exports = router;
