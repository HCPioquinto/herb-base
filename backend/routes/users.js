const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Auth = require("../models/authModel");
const Users = require("../models/usersModel");
const { GeneralUserAuth } = require("../middleware/auth");
const { ErrorHandler } = require("../responseHandler");
const router = express.Router();

router.get('/', GeneralUserAuth, async (req, res) => {
  const users = await Users.find();
  res.send(users);
})

router.post(
  "/",
  [
    GeneralUserAuth,
    check("Firstname", "Firstname is required")
      .not()
      .isEmpty(),
    check("Lastname", "Lastname is required")
      .not()
      .isEmpty(),
    check("Role", "Role is required")
      .not()
      .isEmpty(),
    check("Username", "Username is required")
      .not()
      .isEmpty(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { Firstname, Lastname, Password, Role, Username } = req.body;
      const isUserExists = await Users.findOne({ Username });
      if (isUserExists) {
        return res.status(400).json(ErrorHandler("User already exists"));
      }
      const user = new Users({
        Firstname,
        Lastname,
        Role,
        Username
      });
      await user.save();

      const salt = await bcrypt.genSalt(10);
      const auth = new Auth({
        Username,
        Password
      });
      auth.Password = await bcrypt.hash(Password, salt);
      await auth.save();
      res.send(auth);
    } catch (err) {
      console.error(err.message);
      res.status(500);
    }
  }
);

module.exports = router;
