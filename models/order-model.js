const {Schema, model} = require('mongoose')

const OrderSchema = new Schema({
    order: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    deviceList: {type: Schema.Types.Array, required: true},
    paymentId: {type: String},
    totalAmount: {type: Number},
    paymentType: {type: String},
    idempotenceKey: {type:  String},
    status: {type: String}
})

module.exports = model('Order', OrderSchema)