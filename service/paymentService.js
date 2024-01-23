const bcrypt = require('bcrypt')
const uuid = require('uuid')
const axios = require('axios');

class PaymentService {
    async initialPayment(order_id, price) {
        const my_url = "https://www.instagram.com/sprestay/";
        const initial_payment_msg = "Списываем оплату за заказ";
        const authorization = "Basic ВАШ ТОКЕН";
        const url = "https://api.yookassa.ru/v3/payments";
        var headers = {
            "Authorization": authorization,
            "Idempotence-Key": uuid.v4().toString(),
            "Content-Type": 'application/json'
        };
        var params = {
            "amount": {
                "value": price.toString(),
                "currency": "RUB"
            },
            "payment_method_data": {
                "type": "bank_card"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": my_url
            },
            "description": initial_payment_msg,
            "save_payment_method": "false"
        };
        axios.post(url, params, {
            headers: headers,
        }).then((res) => {
            return res.data;
        })
            .then(async (res) => {
                if (res.status == "pending") {
                    await orders.doc(order_id).update({ "payment_id": res.payment_method.id });
                    response.send({
                        "url": res.confirmation.confirmation_url,
                    });
                }
            })
            .catch((err) => {
                functions.logger.log("ERROR", err);
                response.send({
                    "status": "error",
                    "body": err,
                });
            });
        return users
    }

    async getOrder(orderId) {
        const ordersData = await orderModel.find({ id: orderId })

        return ordersData
    }

}

module.exports = new PaymentService();