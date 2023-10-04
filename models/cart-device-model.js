const {Schema, model} = require('mongoose')

const CartDeviceSchema = new Schema({
    CartDevice: {type: Schema.Types.ObjectId, ref: 'Cart'}, // Айдишник коризны к которому относиться товар
    deviceId: {type: String, required: true},
    typeId: {type: String, required: true},
    count: {type: Number, required: true}
})

module.exports = model('CartDevice', CartDeviceSchema)