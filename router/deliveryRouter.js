const Router = require('express').Router;

const router = new Router();
const deliveryController = require('../controllers/deliveryController');


router.get('/get/:address', deliveryController.getTarrif);


module.exports = router