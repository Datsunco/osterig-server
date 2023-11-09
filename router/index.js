const Router = require('express')
const router = new Router() 
const userRouter = require('./userRouter')
const proxyRouter = require('./proxyRouter')
const cartRouter = require('./cartRouter')
const orderRouter = require('./orderRouter')
const favoritesRouter = require('./favoritesRouter')

router.use('/user', userRouter)
router.use('/proxy', proxyRouter)
router.use('/cart', cartRouter)
router.use('/favorites', favoritesRouter)
router.use('/order', orderRouter)

module.exports  = router
