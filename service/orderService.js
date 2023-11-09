const cartModel = require('../models/cart-model')
const orderModel = require('../models/order-model')
const cartDeviceModel = require('../models/cart-device-model')
const ApiError = require('../exceptions/apiError')

class OrderService{
    async createOrder(userId, device){
        const cartData = await orderModel.create({order: userId, deviceList: device})
        return cartData
    }

    async getCart(cart){
        const devices = await cartDeviceModel.find({CartDevice: cart})
        console.log(devices)

        return devices
    }

    async addDevice(cart, device, type, count){
        const candidate = await cartDeviceModel.findOne({CartDevice: cart, deviceId: device,typeId: type})
        if (candidate){
            throw ApiError.BadRequest(`Такой товар уже лежит в коризне`)
        }


        const deviceData = await cartDeviceModel.create({
            CartDevice: cart,
            deviceId: device,
            typeId: type,
            count: count
        })
        return deviceData
    }


    async removeDevice(cart, device, type, count){
        const candidate = await cartDeviceModel.findOne({CartDevice: cart, deviceId: device,typeId: type})
        if (!candidate){
            throw ApiError.BadRequest(`Товара в корзине нет`)
        }

        if (count != 0){
            candidate.count = count
            return candidate.save()
        }

        const deviceData = await cartDeviceModel.deleteOne({CartDevice: cart, deviceId: device,typeId: type})
        return deviceData
    }
}

module.exports = new OrderService()