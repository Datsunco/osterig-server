const ApiError = require("../exceptions/apiError");
const axios = require('axios');

class ProxyService{
    constructor(){
        this.header = {
            'authority': 'wmsc.lcsc.com',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'no-cache',
            'content-type': 'application/json;charset=UTF-8',
            'cookie': 'area_type=overseas; _gid=GA1.2.293319881.1696425323; wmsc_cart_key=5827DB52BB7A49CA95B059FACF4F6DBD132A9A86AC81ED43C3311E03802593DD3AB6C6CA2C8DA1AE; action_track={"from":"https://web.telegram.org/","to":"/"}; _ga_98M84MKSZH=GS1.1.1696425334.1.1.1696425658.60.0.0; _ga=GA1.2.1006412231.1696425323; _gat_gtag_UA_98399433_1=1',
            'origin': 'https://www.lcsc.com',
            'pragma': 'no-cache',
            'referer': 'https://www.lcsc.com/',
            'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36'
        }
    }


    parseParams(params){
        let manuf = []
        let pack = []
        params?.forEach(param => {
            if (param?.id){
                manuf.push(param?.id)
            }else{
                pack.push(param?.name)
            }
        });
        return [manuf, pack]

    }

    async parse_data(catalogId, params=[]) {
        const tmp = this.parseParams(params)
        console.log(tmp)
        // const brandIdList = params[0].id
        
        const { status, data } = await axios.request({
            url: 'https://wmsc.lcsc.com/ftps/wm/product/search/list',
            method: 'post',
            headers: this.header,
            data: {
                'currentPage': 1,
                'pageSize': 25,
                'catalogIdList': [catalogId],
                'paramNameValueMap': {},
                'brandIdList': tmp[0],
                'isStock': false,
                'isEnvironment': false,
                'isHot': false,
                'isDiscount': false,
                'encapValueList': tmp[1]
            }
        });

        console.log

	if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }


    async parse_params(catalogId, params = []) {
        const tmp = this.parseParams(params)
        console.log(tmp)
        const { status, data } = await axios.request({
            url: 'https://wmsc.lcsc.com/ftps/wm/product/search/param/group',
            method: 'post',
            headers: this.header,
            data: {
                'currentPage': 1,
                'pageSize': 25,
                'catalogIdList': [catalogId],
                'paramNameValueMap': {},
                'brandIdList': tmp[0],
                'isStock': false,
                'isEnvironment': false,
                'isHot': false,
                'isDiscount': false,
                'encapValueList': tmp[1]
            }
        });

	if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }

    async parse_product(productCode) {
        const { status, data } = await axios.request({
            url: `https://wmsc.lcsc.com/ftps/wm/product/detail?productCode=${productCode}`,
            method: 'get',
            headers: this.header,
            
        });

	if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }

    async parse_same_product(productCode) {
        const { status, data } = await axios.request({
            url: `
            https://wmsc.lcsc.com/wmsc/product/detail/other?productCode=${productCode}`,
            method: 'get',
            headers: this.header,
            
        });

	if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }
    

    async parse_hot() {
        const { status, data } = await axios.request({
            url: 'https://wmsc.lcsc.com/wmsc/home/index',
            method: 'get',
            headers: this.header,
            
        });

	if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }

    async parse_catalogs() {
        const { status, data } = await axios.request({
            url: 'https://wmsc.lcsc.com/wmsc/product/catalogs/search',
            method: 'get',
            headers: this.header,
            
        });

	if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }

    async search_data(keyword) {
        const { status, data } = await axios.request({
            url: `https://wmsc.lcsc.com/wmsc/search/global?keyword=${keyword}`,
            method: 'get',
            headers: this.header
        });
        

	if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }

    async onlevel_data(keyword) {
        const { status, data } = await axios.request({
            url: `https://wmsc.lcsc.com/ftps/wm/product/catalog/menu/onelevel?catalogId=${keyword}`,
            method: 'get',
            headers: this.header
        });
        

	    if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }

    async pre_data(keyword) {
        const { status, data } = await axios.request({
            url: `https://wmsc.lcsc.com/ftps/wm/search/pre?keyword=${keyword}`,
            method: 'get',
            headers: this.header
        });
        

	    if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }

    async pre_link(type, keyword) {
        const { status, data } = await axios.request({
            // https://wmsc.lcsc.com/wmsc/search/pre/link?type=LCSC+Part+Number&keyword=C286660
            url: `https://wmsc.lcsc.com/wmsc/search/pre/link?type=${type}&keyword=${keyword}`,
            method: 'get',
            headers: this.header
        });
        

	    if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }
}

module.exports = new ProxyService();
