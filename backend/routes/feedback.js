const express = require("express");
const { check, validationResult } = require("express-validator");
const Feedback = require("../models/feedbackModel");
const Archive = require("../models/archivesModel");
const Retraining = require("../models/retrainingModel");
const { ErrorHandler } = require("../responseHandler");
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

    const { limit, page } = req.params; 

    await Feedback.find()
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

router.post(
  "/",
  [
    // check("image", "image is Required")
    //   .not()
    //   .isEmpty(),
    // check("plantNameResult", "plantNameResult is Required")
    //   .not()
    //   .isEmpty(),
    // check("plantNameCorrection", "plantNameCorrection is Required")
    //   .not()
    //   .isEmpty(),
    GeneralUserAuth
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log('req', req);
    return req;
    const { image, plantNameResult, plantNameCorrection } = req.body;
    const newFeedback = new Feedback({
      image,
      feedbackSent: new Date.now(),
      plantNameResult,
      plantNameCorrection
    });
    await newFeedback.save((err, result) => {
      if (err) {
        return res.status(500).json(ErrorHandler("Problem saving data, retry"));
      }
      return res.status(200).json(result);
    });
  }
);

router.delete("/",
  [
    check("id").not().isEmpty(),
    check("remarks").not().isEmpty(),
    check("username").not().isEmpty(),
    GeneralUserAuth
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, remarks, username } = req.body;

    // Get data
    const feedbackData = Feedback.findById(id);
    const { Image, FeedbackSent } = feedbackData;
    //  Add to Archives
    const newArchive = new Archive({
      Image,
      FeedbackSent,
      Remarks: remarks,
      ArchivedDate: new Date(),
      IsRetrained: false,
    });
    //  Remove from feedback data
    await Feedback.findByIdAndRemove(id);
    await newArchive.save();
    return res.status(200).json({ msg: 'Feedback Archived' });
  });

  
router.post(
  '/for-retraining/"id',
  [
    check("id").not().isEmpty(),
    GeneralUserAuth
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const feedbackData = Feedback.findById(id);
    const { Image, FeedbackSent, PlantNameCorrection: Suggestion } = feedbackData;
    const newRetraining = new Retraining({
      Image,
      FeedbackSent,
      Suggestion,
      IsDownloaded: false,
    });

    await newRetraining.save((err, result) => {
      if (err) {
        return res.status(500).json(ErrorHandler("Problem saving data, retry"));
      }
      return res.status(200).json(result);
    });
  }
);

module.exports = router;