const Router = require('express').Router
const router = new Router()
const favoritesContoller = require('../controllers/favoritesController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/get', authMiddleware, favoritesContoller.getFavorites)
router.post('/add', authMiddleware, favoritesContoller.addFavorite)
router.post('/remove', authMiddleware, favoritesContoller.removeFavorite)

module.exports = router