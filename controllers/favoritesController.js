const favoritesService = require('../service/favoritesService')

class FavoritesController{
    async getFavorites(req, res, next){
        try{
            const favoritestId = req.user.id

            const device = await favoritesService.getFavorites(favoritestId)
            return res.json(device)
        } catch(e){
            next(e)
        }
    }

    async addFavorite(req, res, next){
        try{
            const favoritestId = req.user.id
            const {productModel, catalogId, productCode, brandNameEn, productImageUrl, price, minCount} = req.body

            const device = await favoritesService.addFavorite(favoritestId, productModel, catalogId, productCode, brandNameEn,productImageUrl, price, minCount)
            return res.json(device)
        } catch(e){
            next(e)
        }
    }

    async removeFavorite(req, res, next){
        try{
            const favoritestId = req.user.id
            const {deviceId, typeId} = req.body
        
            const device = await favoritesService.removeFavorite(favoritestId, deviceId, typeId)
            return res.json(device)
        } catch(e){
            next(e)
        }
    }
}

module.exports = new FavoritesController()