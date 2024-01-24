const paymentService = require('../service/paymentService');

class PaymentController {
    async initialPayment(req, res, next) {
        try {
            console.log(req)
            return res.json(req.body)
            
            
        } catch (e) {
            next(e)
            
        }
    }

}



module.exports = new PaymentController();