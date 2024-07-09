const orderService = require('../service/orderService')
const cartService = require('../service/cartService')

class OrderController {
    async create(req, res, next) {
        try {
            const userId = req.user.id
            const { totalAmount, paymentData} = req.body

            console.log(userId, totalAmount, paymentData)

            const device = await cartService.getCart(userId)

            const data = await orderService.createOrder(userId, totalAmount ,device, paymentData)
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

    async confirmPayment(req, res, next) {
        try {
            const { idempotenceKey } = req.body;
            const data = await orderService.confirmPayment(idempotenceKey);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new OrderController();