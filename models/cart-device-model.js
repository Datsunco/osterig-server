const {Schema, model} = require('mongoose')

const CartDeviceSchema = new Schema({
    CartDevice: {type: Schema.Types.ObjectId, ref: 'Cart'}, // Айдишник коризны к которому относиться товар
    productModel: {type: String, required: true},
    typeId: {type: String, required: true},
    count: {type: Number, required: true},
    productCode: {type: String, required: true},
    productImageUrl: {type: String, required: true},
    price: {type: String, required: true},
    minCount: {type: Number, required: true}
})

module.exports = model('CartDevice', CartDeviceSchema)