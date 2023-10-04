const {Schema, model} = require('mongoose')

const FavoritesSchema = new Schema({
    //id: {type: Schema.Types.ObjectId, unique: true},
    favorites: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = model('Favorites', FavoritesSchema)