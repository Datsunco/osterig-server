const Router = require('express').Router;

const router = new Router();
const deliveryController = require('../controllers/deliveryController');


router.get('/get/:address', deliveryController.getTarrif);
router.get('/deliverypoints', deliveryController.getDeliveryPoints);


module.exports = router