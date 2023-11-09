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

    async search_data(req, res, next){
        try{
            const keyword = req.params.keyword;
            const data = await proxyService.search_data(keyword)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }
}

module.exports = new OrderController();