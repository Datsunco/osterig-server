const {Schema, model} = require('mongoose')

const FavoritesDeviceSchema = new Schema({
    favoritesDevice: {type: Schema.Types.ObjectId, ref: 'Favorites'}, // Айдишник избранного к которому относиться товар
    deviceId: {type: String, required: true},
    typeId: {type: String, required: true}
})

module.exports = model('FavoritesDevice', FavoritesDeviceSchema)