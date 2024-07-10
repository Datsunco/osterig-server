const cartModel = require('../models/cart-model')
const orderModel = require('../models/order-model')
const cartDeviceModel = require('../models/cart-device-model')
const ApiError = require('../exceptions/apiError')
const { v4: uuidv4 } = require('uuid');
const axios = require('axios')
const checkout = require('./yoouKassaConfig')


class OrderService {
    async createOrder(userId, totalAmount, device, paymentData) {



        const resp = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`)
        const usd = resp.data.Valute['USD'].Value
        console.log("cart", device)

        let reCountAmount = 0
        device.forEach(dev => {
            reCountAmount += (item.price * usd * 3).toFixed() * item.count
        });

        const rec = {
            customer: {
                email: paymentData.email,

            },
            items: device.map((item) => {
                return (
                    {
                        description: item.productModel,
                        quantity: `${item.count}`,
                        amount: {
                            value: (item.price * usd * 3).toFixed(),
                            currency: "RUB"
                        },
                        vat_code: "4",
                        payment_mode: "full_prepayment",
                        payment_subject: "marked",
                        mark_mode: 0,
                        measure: "piece"
                    }
                )
            })
        }
        console.log(rec)


        const idempotenceKey = uuidv4();; // Генерируйте уникальный ключ для каждого запроса
        const createPayload = {
            amount: {
                value: totalAmount, // Укажите сумму заказа
                currency: 'RUB'
            },
            payment_method_data: {
                type: 'bank_card'
            },
            receipt: rec,
            confirmation: {
                type: 'redirect',
                return_url: `https://osterrig-electronics.ru/orders/${idempotenceKey}` // Укажите URL для возврата после оплаты
            }
        };

        try {
            const orderData = await orderModel.create({ order: userId, deviceList: device, totalAmount: totalAmount.toFixed() })
            const payment = await checkout.createPayment(createPayload, idempotenceKey);
            console.log(payment);

            // Обновляем заказ в базе данных с информацией о платеже
            orderData.paymentId = payment.id;
            orderData.idempotenceKey = idempotenceKey;
            orderData.paymentType = paymentData.paymentType;
            orderData.deliveryType = paymentData.deliveryType;
            orderData.surname = paymentData.surname;
            orderData.name = paymentData.name;
            orderData.middlename = paymentData.middlename;
            orderData.address = paymentData.address;
            orderData.phone = paymentData.phone;
            orderData.status = 'wait';
            await orderData.save();

            return { orderData, payment };
        } catch (error) {
            console.error(error);
            throw new ApiError('Ошибка при создании платежа', 500);
        }
    }

    async getOrders(userId) {
        const ordersData = await orderModel.find({ order: userId })

        return ordersData
    }

    async confirmPayment(paymentId) {
        const idempotenceKey = uuidv4(); // Генерируем уникальный ключ для подтверждения
        const telegramBotToken = '7297016444:AAFNEUXmsQFpllfc7GThOHd0s-twpxyG1TE';
        const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
        const channelId = '-1002248890601';
        try {

            const orderData = await orderModel.findOne({ idempotenceKey: paymentId });
            const capturePayload = {
                amount: {
                    value: orderData.totalAmount, // Укажите сумму заказа
                    currency: 'RUB'
                }
            };
            const id = orderData.paymentId
            console.log('paymentId', id)
            const payment = await checkout.capturePayment(id, capturePayload, idempotenceKey);
            console.log(payment);


            if (payment.status === 'succeeded') {
                // Обновляем статус заказа в базе данных
                orderData.status = 'paid';
                await orderData.save();

                const telegramPayload = {
                    chat_id: channelId,
                    text: `
                    Заказ номер ${orderData?._id ?? 'hz'}
                    Cумма заказа: ${orderData?.totalAmount ?? 'hz'}
                    Тип доставки: ${orderData?.deliveryType ?? 'hz'}
                    Адресс доставки: ${orderData?.address ?? 'hz'}
                    ФИО: ${orderData.surname} ${orderData.name} ${orderData.middlename}
                    Телефон: ${orderData?.phone ?? 'hz'}
                    Товары: ${JSON.stringify(orderData.deviceList.map((item) => {
                        return (
                            {
                                description: item.productModel,
                                quantity: `${item.count}`,
                                amount: {
                                    value: item.price,
                                    currency: "ЮАНь"
                                }
                            }
                        )
                    }))}
                    `,
                    parse_mode: 'HTML'
                };
                await axios.post(telegramApiUrl, telegramPayload);
            }
            return payment;
        } catch (error) {
            console.error(error);
            // console.log('paymentId', orderData)
            throw new ApiError('Ошибка при подтверждении платежа', 500);
        }
    }
}

module.exports = new OrderService()