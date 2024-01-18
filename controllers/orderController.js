const orderService = require('../service/orderService')
const cartService = require('../service/cartService')

class OrderController{
    async create(req, res, next){
        try{
            const userId = req.user.id
            const device = await cartService.getCart(userId)

            const data = await orderService.createOrder(userId, device)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async getOrders(req, res, next){
        try{
            const userId = req.user.id
            const data = await orderService.getOrders(userId)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }
}

module.exports = new OrderController();