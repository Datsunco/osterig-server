const cartModel = require('../models/cart-model')
const orderModel = require('../models/order-model')
const cartDeviceModel = require('../models/cart-device-model')
const ApiError = require('../exceptions/apiError')
const { v4: uuidv4 } = require('uuid');
const axios = require('axios')
const checkout =  require('./yoouKassaConfig')


class OrderService{
    async createOrder(userId, device, paymentType){
        

        
        const usd = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`).data.Valute['USD'].Value

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
            confirmation: {
                type: 'redirect',
                return_url: 'https://osterrig-electronics.ru/return-url' // Укажите URL для возврата после оплаты
            }
        };
        
        try {
            const cartData = await orderModel.create({order: userId, deviceList: device})
            const payment = await checkout.createPayment(createPayload, idempotenceKey);
            console.log(payment);

            // Обновляем заказ в базе данных с информацией о платеже
            orderData.paymentId = payment.id;
            orderData.idempotenceKey = idempotenceKey;
            orderData.totalAmount = totalAmount;
            orderData.paymentType = paymentType;
            await orderData.save();

            return orderData;
        } catch (error) {
            console.error(error);
            throw new ApiError('Ошибка при создании платежа', 500);
        }
    }

    async getOrders(userId){
        const ordersData = await orderModel.find({order: userId})

        return ordersData
    }
}

module.exports = new OrderService()