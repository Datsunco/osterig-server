const bcrypt = require('bcrypt')
const uuid = require('uuid')
const axios = require('axios');
import { YooCheckout, ICreatePayment } from '@a2seven/yoo-checkout';

class PaymentService {
    async initialPayment(price) {
        try {
            
            // const my_url = "https://www.instagram.com/sprestay/";
            // const initial_payment_msg = "Списываем оплату за заказ";
            // const authorization = process.env.UKASSA_SECRET;
            // const url = "https://api.yookassa.ru/v3/payments";
            // var headers = {
            //     // "account_id": process.env.UKASSA_ID,
            //     // "secret_key": process.env.UKASSA_SECRET,
            //     // "Authorization": `Basic  ${process.env.UKASSA_ID}:${process.env.UKASSA_SECRET}`,
            //     "Authorization": `Basic MzIyMDI1OmxpdmVfZjFjaE1rMEJpY0h3Q3JUNWZ5cGc1S2NmOFhuOFNOTnJOdi1Vd2tzd2JCUQ==`,
            //     "Idempotence-Key": uuid.v4().toString(),
            //     "Content-Type": 'application/json'
            // };
            // var params = {
            //     "amount": {
            //         "value": price.toString(),
            //         "currency": "RUB"
            //     },
            //     "payment_method_data": {
            //         "type": "bank_card"
            //     },
            //     "confirmation": {
            //         "type": "redirect",
            //         "return_url": my_url
            //     },
            //     "description": initial_payment_msg,
            //     "save_payment_method": "false"
            // };
            // console.log("pre log")
            // const { status, data } = await axios.post(url, params, {headers: headers})
            const checkout = new YooCheckout({ shopId: process.env.UKASSA_ID, secretKey: process.env.UKASSA_SECRET });
            const idempotenceKey = uuid.v4().toString();

            const createPayload = {
                amount: {
                    value: '2.00',
                    currency: 'RUB'
                },
                payment_method_data: {
                    type: 'bank_card'
                },
                confirmation: {
                    type: 'redirect',
                    return_url: 'test'
                }
            };

            const payment = await checkout.createPayment(createPayload, idempotenceKey);
            console.log(payment)
            return payment

            // if (status !== 200) {
            //     throw ApiError.BadRequest();
            // }
            // return data
            // axios.post(url, params, {
            //     headers: headers,
            // }).then((res) => {
            //     console.log(res)
            //     return res.data;
            // })
            // .then(async (res) => {
            //     if (res.status == "pending") {
            //         console.log('change status ')
            //         // await orders.doc(order_id).update({ "payment_id": res.payment_method.id });
            //         return res.confirmation.confirmation_url
            //         response.send({
            //             "url": res.confirmation.confirmation_url,
            //         });
            //     }
            // })
            // .catch((err) => {
            //     functions.logger.log("ERROR", err);
            //     response.send({
            //         "status": "error",
            //         "body": err,
            //     });
            // });
        } catch (e) {
            console.log(e)
        }
        // return users
    }

    async getOrder(orderId) {
        const ordersData = await orderModel.find({ id: orderId })

        return ordersData
    }

}

module.exports = new PaymentService();