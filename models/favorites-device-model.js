const {Schema, model} = require('mongoose')

const FavoritesDeviceSchema = new Schema({
    favoritesDevice: {type: Schema.Types.ObjectId, ref: 'Favorites'}, // Айдишник избранного к которому относиться товар
    productModel: {type: String, required: true},
    catalogId: {type: String, required: true},
    productCode: {type: String, required: true},
    brandNameEn: {type: String, required: true},
    productImageUrl: {type: String, required: true},
    price: {type: String, required: true},
    minCount: {type: Number, required: true}

})

module.exports = model('FavoritesDevice', FavoritesDeviceSchema)