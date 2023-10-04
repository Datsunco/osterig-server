const cartService = require('../service/cartService')

class CartContoller {
    async getCart(req, res, next) {
        try {
            const cartId = req.user.id

            const device = await cartService.getCart(cartId)
            return res.json(device)
        } catch (e) {
            next(e)
        }
    }

    async addDevice(req, res, next) {
        try {
            console.log('check')
            const cartId = req.user.id
            const { deviceId, typeId, count } = req.body

            const device = await cartService.addDevice(cartId, deviceId, typeId, count)
            return res.json(device)
        } catch (e) {
            console.log('errro')
            next(e)
        }
    }

    async removeDevice(req, res, next) {
        try {
            const cartId = req.user.id
            const { deviceId, typeId, count } = req.body

            const device = await cartService.removeDevice(cartId, deviceId, typeId, count)
            return res.json(device)
        } catch (e) {
            next(e)


        }
    }

}

module.exports = new CartContoller()