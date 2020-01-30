const express = require("express");
const { check, validationResult } = require("express-validator");
const Archive = require("../models/archivesModel");
const { GeneralUserAuth } = require("../middleware/auth");
const router = express.Router();

router.get(
  "/",
  [
    check("page", "Page is Required")
      .not()
      .isEmpty(),
    GeneralUserAuth
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { limit = 15, page = 1 } = req.params;

    await Archive.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .exec((err, results) => {
        if (err) {
          return res.status(500).json(ErrorHandler("Problem fetching data"));
        }
        return res.status(200).json(results);
      });
  }
);


router.delete("/:id",
  [
    check("id").not().isEmpty(),
    GeneralUserAuth
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    await Archive.findByIdAndRemove(id);
    return res.status(200).json({ msg: 'Archive Deleted Forever' });
  }
);

module.exports = router;