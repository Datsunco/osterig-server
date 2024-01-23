const Router = require('express')
const router = new Router() 
const userRouter = require('./userRouter')
const proxyRouter = require('./proxyRouter')
const cartRouter = require('./cartRouter')
const paymentRouter = require('./paymentRouter')
const orderRouter = require('./orderRouter')
const deliveryrouter = require('./deliveryRouter')

const favoritesRouter = require('./favoritesRouter')

router.use('/user', userRouter)
router.use('/proxy', proxyRouter)
router.use('/cart', cartRouter)
router.use('/favorites', favoritesRouter)
router.use('/order', orderRouter)
router.use('/payment', paymentRouter)
router.use('/delivery', deliveryrouter)

module.exports  = router
