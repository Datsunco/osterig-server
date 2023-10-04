const proxyService = require('../service/proxyService')

class ProxyController{
    async parse_data(req, res, next){
        try{
            const catalogId = req.params.link;
            const data = await proxyService.parse_data(catalogId)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }
}

module.exports = new ProxyController();