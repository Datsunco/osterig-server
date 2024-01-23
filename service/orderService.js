const cartModel = require('../models/cart-model')
const orderModel = require('../models/order-model')
const cartDeviceModel = require('../models/cart-device-model')
const ApiError = require('../exceptions/apiError')

class OrderService{
    async createOrder(userId, device){
        const cartData = await orderModel.create({order: userId, deviceList: device})
        return cartData
    }

    async getOrders(userId){
        const ordersData = await orderModel.find({order: userId})

        return ordersData
    }
}

module.exports = new OrderService()