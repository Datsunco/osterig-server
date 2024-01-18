const Router = require('express').Router;
const orderController = require('../controllers/orderController') 
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create', authMiddleware, orderController.create);
router.get('/get', authMiddleware, orderController.getOrders);
//router.get('/users', authMiddleware, userController.getUsers);


module.exports = router