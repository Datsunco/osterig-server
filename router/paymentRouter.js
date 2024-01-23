const Router = require('express').Router;

const router = new Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware')


router.get('/initial', authMiddleware, paymentController.initialPayment);


module.exports = router