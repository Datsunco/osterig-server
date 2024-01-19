const Router = require('express').Router;
const userController = require('../controllers/userContoller');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/registration', userController.registration);
router.post('/login', userController.login);

router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', authMiddleware, userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);


module.exports = router