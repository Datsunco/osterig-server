const paymentService = require('../service/paymentService');

class PaymentController {
    async initialPayment(req, res, next) {
        try {
            console.log(req?.body)
            console.log(req?.body?.data)
            return res.json(req.body.data)
            
            
        } catch (e) {
            next(e)
            
        }
    }

}



module.exports = new PaymentController();