const proxyService = require('../service/proxyService')

class ProxyController{
    async parse_data(req, res, next){
        try{
            const params = JSON.parse(req.params.selected);
            const catalogId = req.params.link;
            const data = await proxyService.parse_data(catalogId, params)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async parse_hotdata(req, res, next){
        try{
            const data = await proxyService.parse_data()
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async parse_parsebypage(req, res, next){
        try{
            const params = JSON.parse(req.params.selected);
            const catalogId = req.params.link;
            const page = req.params.page;
            const data = await proxyService.parse_parsebypage(catalogId, params, page)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async parse_hot_parsebypage(req, res, next){
        try{
            const params = JSON.parse(req.params.selected);
            const page = req.params.page;
            const data = await proxyService.parse_hot_parsebypage(params, page)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async parse_params(req, res, next){
        try{
            const params = JSON.parse(req.params.selected);
            console.log(params)
            const catalogId = req.params.link;
            const data = await proxyService.parse_params(catalogId, params)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async parse_hot_params(req, res, next){
        try{
            const params = JSON.parse(req.params.selected);
            const data = await proxyService.parse_params(params)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async parse_product(req, res, next){
        try{
            const productCode = req.params.link;
            const data = await proxyService.parse_product(productCode)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async parse_same_product(req, res, next){
        try{
            const productCode = req.params.link;
            const data = await proxyService.parse_same_product(productCode)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async parse_hot(req, res, next){
        try{
            const data = await proxyService.parse_hot()
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async parse_catalogs(req, res, next){
        try{
            const data = await proxyService.parse_catalogs()
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async search_data(req, res, next){
        try{
            const keyword = req.params.keyword;
            const data = await proxyService.search_data(keyword)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async onlevel_data(req, res, next){
        try{
            const keyword = req.params.keyword;
            const data = await proxyService.onlevel_data(keyword)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }

    async pre_data(req, res, next){
        try{
            const keyword = req.params.keyword;
            const data = await proxyService.pre_data(keyword)
            return res.json(data)
        } catch (e){
            // console.log(e)//tmp
            next(e)
        }
        
    }

    async pre_link(req, res, next){
        try{
            const keyword = req.params.keyword;
            const type = req.params.type;
            const data = await proxyService.pre_link(type, keyword)
            return res.json(data)
        } catch (e){
            next(e)
        }
        
    }
}

module.exports = new ProxyController();