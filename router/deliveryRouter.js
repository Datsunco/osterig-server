const Router = require('express').Router;

const router = new Router();
const deliveryController = require('../controllers/deliveryController');


router.get('/get/:address', deliveryController.getTarrif);
router.get('/get/tarrifbypoint/:address/:type', deliveryController.getTariffByPoint);
router.get('/get/featuresBy/:address', deliveryController.getFeaturesByAddress);
router.get('/deliverypoints/:lat/:lon', deliveryController.getDeliveryPoints);


module.exports = router