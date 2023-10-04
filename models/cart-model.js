const {Schema, model} = require('mongoose')

const CartSchema = new Schema({
    //id: {type: Schema.Types.ObjectId, unique: true},
    cart: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = model('Cart', CartSchema)