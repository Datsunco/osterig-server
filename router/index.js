const Router = require('express')
const router = new Router() 
const userRouter = require('./userRouter')
const proxyRouter = require('./proxyRouter')
const cartRouter = require('./cartRouter')
const favoritesRouter = require('./favoritesRouter')

router.use('/user', userRouter)
router.use('/proxy', proxyRouter)
router.use('/cart', cartRouter)
router.use('/favorites', favoritesRouter)

module.exports  = router
