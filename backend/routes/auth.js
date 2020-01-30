const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');
const { ErrorHandler } = require("../responseHandler");
const Auth = require("../models/authModel");
const { GeneralUserAuth } = require("../middleware/auth");
const router = express.Router();


router.get("/", GeneralUserAuth, (req, res) => {
  res.send({
    Hello: "Za warudo"
  });
});

router.post("/", [
  check("Username", "username is required")
    .not()
    .isEmpty(),
  check("Password", "password is required")
    .not()
    .isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  try {
    const { Username, Password } = req.body;
  
    const user = await Auth.findOne({ Username });
    if (!user) return res.status(400).json(ErrorHandlerkw('Invalid credentials'));
  
    const isPasswordMatch = bcrypt.compare(Password, user.Password);
    if (!isPasswordMatch) return res.status(400).json(ErrorHandler('Invalid credentials'));
  
    const payload = {
      UserId: user.Id,
      Role: user.Role,
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 36000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    )
  } catch(err) {
    console.error(err.message);
    res.status(500);
  }
});

module.exports = router;
 