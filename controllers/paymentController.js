const paymentService = require('../service/paymentService');

class PaymentController {
    async initialPayment(req, res, next) {
        try {
            
            // получаем заказ из БД и цену заказа
            const {order_id} = request.body;
            var order = paymentService.getOrder(order_id)
            var price = order.price;
            const resp = await paymentService.initialPayment()
            
        } catch (e) {
            next(e)
            
        }
    }

}



module.exports = new PaymentController();