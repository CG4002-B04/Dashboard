const express = require('express')
const router = express.Router()

// Require our controllers
const prediction_controller = require('../controllers/predictionController');

router.get('/prediction/moveAccuracyDancer', prediction_controller.move_accuracy_dancer);

router.get('/prediction/accuracyDancer', prediction_controller.accuracy_dancer);

module.exports = router;