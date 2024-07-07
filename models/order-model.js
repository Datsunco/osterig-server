const {Schema, model} = require('mongoose')

const OrderSchema = new Schema({
    order: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    deviceList: {type: Schema.Types.Array, required: true},
    id: {type: Number},
    totalAmount: {type: Number},
    paymentType: {type: String},
    idempotenceKey: {type:  String}
})

module.exports = model('Order', OrderSchema)