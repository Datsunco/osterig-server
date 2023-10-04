const Router = require('express').Router
const router = new Router()
const cartContoller = require('../controllers/cartController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/get', authMiddleware, cartContoller.getCart)
router.post('/add', authMiddleware, cartContoller.addDevice)
router.post('/remove', authMiddleware, cartContoller.removeDevice)

module.exports = router