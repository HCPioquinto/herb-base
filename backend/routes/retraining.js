const express = require("express");
const { check, validationResult } = require("express-validator");
const Archive = require("../models/archivesModel");
const Retraining = require("../models/retrainingModel");
const { ErrorHandler } = require("../responseHandler");
const { GeneralUserAuth } = require("../middleware/auth");
const router = express.Router();

router.get('/',
  [
    check("page", "Page is Required")
      .not()
      .isEmpty(), GeneralUserAuth
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { limit, page } = req.params;
    await Retraining.find()
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

router.patch(
  '/:id',
  [GeneralUserAuth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updatedItem = { IsDownloaded: true };
    let retrainingItem = await Retraining.findById(id);
    if (!retrainingItem) return res.status(404).json(ErrorHandler('Item not found'));
    retrainingItem = await Retraining.findByIdAndUpdate(id,
      { $set: updatedItem });
    return res.status(200).json(retrainingItem);
  }
)

router.post(
  '/archive-item/:id',
  [
    check("id", "Page is Required")
      .not()
      .isEmpty(),
    GeneralUserAuth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, isRetraining } = req.params;
    const Remarks = isRetraining ? 'Approved for Retraining' : "Removed from Retraining";
    const retrainingItem = Retraining.findById(id);
    const { Image, FeedbackSent } = retrainingItem;
    const newArchive = new Archive({
      Image,
      FeedbackSent,
      Remarks,
      ArchivedData: new Date(),
      IsRetrained: isRetraining
    });

    Retraining.findByIdAndRemove(id);
    await newArchive.save(
      (err, result) => {
        if (err) {
          return res.status(500).json(ErrorHandler("Problem saving data, retry"));
        }
        return res.status(200).json(result);
      }
    )

  }
)

module.exports = router;
