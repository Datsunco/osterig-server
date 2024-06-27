const deliveryService = require('../service/deliveryService');
const paymentService = require('../service/paymentService');

class DevliveryController {
    async getTarrif(req, res, next) {
        try {
            const token = await deliveryService.getToken()
            const data = await deliveryService.getTarrif(token)
            console.log(data)
            return res.json(data)
        } catch (e) {
            next(e)
            
        }
    }

}



module.exports = new DevliveryController();