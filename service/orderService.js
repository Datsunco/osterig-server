const cartModel = require('../models/cart-model')
const orderModel = require('../models/order-model')
const cartDeviceModel = require('../models/cart-device-model')
const ApiError = require('../exceptions/apiError')
const { v4: uuidv4 } = require('uuid');
const axios = require('axios')
const checkout = require('./yoouKassaConfig')


class OrderService {
    async createOrder(userId, device, paymentType) {



        const resp = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`)
        const usd = resp.data.Valute['USD'].Value
        // console.log("cart", device)
        console.log('usd', usd)

        const idempotenceKey = uuidv4();; // Генерируйте уникальный ключ для каждого запроса
        const createPayload = {
            amount: {
                value: '10.00', // Укажите сумму заказа
                currency: 'RUB'
            },
            payment_method_data: {
                type: 'bank_card'
            },
            receipt: {
                customer: {
                    email: "danya200375@gmail.com"
                },
                items: [
                    {
                        description: "Топ трикотажный",
                        quantity: "1.00",
                        amount: {
                            value: "10.00",
                            currency: "RUB"
                        },
                        vat_code: "4",
                        payment_mode: "full_prepayment",
                        payment_subject: "marked",
                        mark_mode: 0,
                        // mark_code_info:
                        // {
                        //     "gs_1m": "DFGwNDY0MDE1Mzg2NDQ5MjIxNW9vY2tOelDFuUFwJh05MUVFMDYdOTJXK2ZaMy9uTjMvcVdHYzBjSVR3NFNOMWg1U2ZLV0dRMWhHL0UrZi8ydkDvPQ=="
                        // },
                        measure: "piece"
                    }
                ]
            },
            confirmation: {
                type: 'redirect',
                return_url: 'https://osterrig-electronics.ru/return-url' // Укажите URL для возврата после оплаты
            }
        };
        checkout.cre

        try {
            const orderData = await orderModel.create({ order: userId, deviceList: device, totalAmount: 10})
            const payment = await checkout.createPayment(createPayload, idempotenceKey);
            console.log(payment);

            // Обновляем заказ в базе данных с информацией о платеже
            orderData.paymentId = payment.id;
            orderData.idempotenceKey = idempotenceKey;
            orderData.paymentType = paymentType;
            await orderData.save();

            return {orderData, payment};
        } catch (error) {
            console.error(error);
            throw new ApiError('Ошибка при создании платежа', 500);
        }
    }

    async getOrders(userId) {
        const ordersData = await orderModel.find({ order: userId })

        return ordersData
    }
}

module.exports = new OrderService()