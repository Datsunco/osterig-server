const Router = require('express').Router;
const proxyController = require('../controllers/proxyContorller');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/parse/:link', proxyController.parse_data);
//router.get('/users', authMiddleware, userController.getUsers);


module.exports = router