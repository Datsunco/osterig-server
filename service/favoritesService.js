const favoritesModel = require("../models/favorites-model")
const favoriteDeviceModel = require('../models/favorites-device-model')
const ApiError = require('../exceptions/apiError')

class FavoritesService{
    async createFavorites(userId){
        const cartData = await favoritesModel.create({favorites: userId})
        return cartData
    }

    async getFavorites(favorite){
        const devices = await favoriteDeviceModel.find({favoritesDevice: favorite})
        console.log(devices)

        return devices
    }

    async addFavorite(favoritestId, productModel, catalogId, productCode, brandNameEn, productImageUrl, price, minCount){
        const candidate = await favoriteDeviceModel.findOne({
            favoritesDevice: favoritestId,
            productModel,
            catalogId,
        })
        console.log(candidate)
        if (candidate){
            candidate.deleteOne()
            return candidate
            throw ApiError.BadRequest(`Такой товар уже лежит в избранном`)
        }

        
        
        const deviceData = await favoriteDeviceModel.create({
            favoritesDevice: favoritestId,
            productModel,
            catalogId,
            productCode,
            brandNameEn,
            productImageUrl,
            price,
            minCount
        })
        return deviceData
    }


    async removeFavorite(favorite, productModel, catalogId){
        const candidate = await favoriteDeviceModel.findOne({
            favoritesDevice: favorite,
            productModel,
            catalogId
        })
        if (!candidate){
            throw ApiError.BadRequest(`Товара нет в избранном`)
        }

        const deviceData = await favoriteDeviceModel.deleteOne({
            favoritesDevice: favorite,
            productModel,
            catalogId
        })
        return deviceData
    }
}

module.exports = new FavoritesService()