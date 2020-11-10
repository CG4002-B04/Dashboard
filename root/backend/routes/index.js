const express = require('express')
const router = express.Router()

// Require our controllers
const prediction_controller = require('../controllers/predictionController');

router.get('/prediction/moveAccuracyDancer', prediction_controller.move_accuracy_dancer);

router.get('/prediction/accuracyDancer', prediction_controller.accuracy_dancer);

router.get('/prediction/syncDelayDancer', prediction_controller.sync_delay_dancer);

router.get('/prediction/moveAccuracyOverall', prediction_controller.move_accuracy_overall);

router.get('/prediction/accuracyOverall', prediction_controller.accuracy_overall);

router.get('/prediction/syncDelayOverall', prediction_controller.sync_delay_overall);


module.exports = router;