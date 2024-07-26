const deliveryService = require('../service/deliveryService');
const paymentService = require('../service/paymentService');

class DevliveryController {
    async getTarrif(req, res, next) {
        try {
            const address = req.params.address;
            const token = await deliveryService.getToken()
            const data = await deliveryService.getTarrif(address, token)
            console.log(data)
            return res.json(data)
        } catch (e) {
            next(e)
            
        }
    }

    async getDeliveryPoints(req, res, next) {
        try {
            const lat = req.params.lat;
            const lon = req.params.lon;
            const token = await deliveryService.getToken()
            const postal = await deliveryService.getPostal(lat, lon)
            console.log('postal',postal)
            const data = await deliveryService.getDeliveryPoints(postal,token)
            console.log('points', data)
            return res.json(data)
        } catch (e) {
            next(e)
            
        }
    }

}



module.exports = new DevliveryController();