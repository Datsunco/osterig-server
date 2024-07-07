const orderService = require('../service/orderService')
const cartService = require('../service/cartService')

class OrderController {
    async create(req, res, next) {
        try {
            const userId = req.user.id
            const { totalAmount, paymentType} = req.body

            console.log(userId, totalAmount, paymentType)

            const device = await cartService.getCart(userId)

            const data = await orderService.createOrder(userId, device, paymentType)
            return res.json(data)
        } catch (e) {
            console.log(e)
            next(e)
        }

    }

    async getOrders(req, res, next) {
        try {
            const userId = req.user.id
            const data = await orderService.getOrders(userId)
            return res.json(data)
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new OrderController();