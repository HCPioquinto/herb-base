const express = require("express");
const { check, validationResult } = require("express-validator");
const Feedback = require("../models/feedbackModel");
const Archive = require("../models/archivesModel");
const Retraining = require("../models/retrainingModel");
const { ErrorHandler } = require("../responseHandler");
const { GeneralUserAuth } = require("../middleware/auth");
const { IMAGE_CONTENT_TYPES } = require("../constants/contentTypes");
const { storage, uploadToS3 } = require('./helpers/feedback');
const { InitImageUpload } = require('../../config/db');
const multer = require('multer');
const router = express.Router();

const upload = multer({ storage });

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
    const { limit, page } = req.body;
    const finalLimit = limit || 15;
    const gfs = await InitImageUpload();

    await Feedback.find()
      .limit(finalLimit)
      .skip(finalLimit * (page - 1))
      .exec((err, results) => {
        if (err) {
          return res.status(500).json(ErrorHandler("Problem fetching data"));
        }
        const finalResult = [];
        results.forEach( feedback => {
          const readstream = gfs.createReadStream(feedback.Image);
          readstream.pipe(res);
          const buf = [];
          readstream.on('data', (chunk) => {
            buf.push(chunk);
          });
          readstream.on('end', function () {
            const fbuf = Buffer.concat(bufs);
            const finalImage = fbuf.toString('base64');
            finalResult.push({
              ...feedback,
              Image: finalImage,
            })
          });
        });
      });
  }
);

router.post(
  "/",[],
  async (req, res) => {
    const errors = validationResult(req);
    const { file: image } = req;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const isImage = IMAGE_CONTENT_TYPES.filter(type => type === image.contentType);
    if (!isImage) {
      return res.status(400).json({ errors: 'Not an Image' });
    }

    const { plantNameResult, plantNameCorrection } = req.body;
    const newFeedback = new Feedback({
      Image: image.filename,
      FeedbackSent: Date.now(),
      PlantNameResult: plantNameResult,
      PlantNameCorrection: plantNameCorrection,
      IsApproved: false,
    });
    await newFeedback.save((err, result) => {
      if (err) {
        return res.status(500).json({
          Error: ErrorHandler("Problem saving data, retry"),
          Data: image,
          ErrorMessage: err.message,
        });
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