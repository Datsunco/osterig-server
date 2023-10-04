const {Schema, model} = require('mongoose')

const OrderSchema = new Schema({
    order: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    deviceList: {type: Schema.Types.Array, required: true}
})

module.exports = model('Order', OrderSchema)