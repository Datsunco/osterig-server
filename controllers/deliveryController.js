const deliveryService = require('../service/deliveryService');
const paymentService = require('../service/paymentService');

class DevliveryController {
    async getTarrif(req, res, next) {
        try {
            console.log('test1')
            const data = await deliveryService.getTarrif()
            return res.json(data)
        } catch (e) {
            next(e)
            
        }
    }

}



module.exports = new DevliveryController();