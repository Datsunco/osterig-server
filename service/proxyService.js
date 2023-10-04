const ApiError = require("../exceptions/apiError");
const axios = require('axios')

class ProxyService{
    param = {
        currentPage: 1,
        pageSize: 25,
        catalogIdList: [],
        paramNameValueMap: {}
    };


    async parse_data(catalogId){
        const endpoint = `https://api.scraperapi.com?api_key=${process.env.SCRAPER_KEY}&url=${process.env.SOURCE_URL}`
        this.param.catalogIdList = [catalogId]
        
        const resp = await axios.post(endpoint, this.param)
        if (!resp){
            throw ApiError.BadRequest()
        }

        return resp.data
        }
    }

module.exports = new ProxyService();