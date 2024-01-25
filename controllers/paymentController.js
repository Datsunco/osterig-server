const paymentService = require('../service/paymentService');

class PaymentController {
    async initialPayment(req, res, next) {
        try {
            const {userId, totalAmount, paymenttype} = req.body
            console.log(req?.body)
            const resp = paymentService.initialPayment(totalAmount)
            return res.json(resp)
            
            
        } catch (e) {
            next(e)
            
        }
    }

}



module.exports = new PaymentController();