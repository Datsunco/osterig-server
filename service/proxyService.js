const ApiError = require("../exceptions/apiError");
const axios = require('axios');

class ProxyService {
    constructor() {
        this.header = {
            'authority': 'wmsc.lcsc.com',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'no-cache',
            'content-type': 'application/json;charset=UTF-8',
            'cookie': 'wmsc_cart_key=531991F5FC7ACF9CCD68C7BA06639DC6FE0D9E5997ABB45D7C3DDBE8B1106B9C20654B061C28181C; _gcl_au=1.1.1037411912.1713687111; action_track={"from":"https://yandex.ru/","to":"/"}; _gid=GA1.2.702086745.1715761246; _clck=9hb9kf%7C2%7Cfls%7C0%7C1572; _uetsid=076ad2c0129411ef991815bbc1f87706; _uetvid=ce8fb300ffb611eea3638bbc882d59a5; _clsk=1tikkj1%7C1715761647756%7C13%7C1%7Cx.clarity.ms%2Fcollect; _ga=GA1.1.1220136030.1713687111; _ga_98M84MKSZH=GS1.1.1715761249.2.1.1715761892.60.0.0',
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


    parseParams(params) {
        let manuf = []
        let pack = []
        params?.forEach(param => {
            if (param?.id) {
                manuf.push(param?.id)
            } else {
                pack.push(param?.name)
            }
        });
        return [manuf, pack]

    }

    async parse_data(catalogId, params = []) {
        // const tmp = this.parseParams(params)

        const tmp = params
        
        let manufacturer = [];
        let packageName = [];
        let otherTypes = {};

        tmp.forEach(item => {
            if (item.type === 'Manufacturer') {
                manufacturer = [item.name];
            } else if (item.type === 'Package') {
                packageName = [item.id];
            } else {
                otherTypes[item.type] = [item.name];
            }
        });

        console.log('request', {
            url: 'https://wmsc.lcsc.com/ftps/wm/product/search/list',
            method: 'post',
            data: {
                'currentPage': 1,
                'pageSize': 25,
                'catalogIdList': [catalogId],
                'paramNameValueMap': otherTypes,
                'brandIdList': manufacturer,
                'isStock': false,
                'isEnvironment': false,
                'isHot': false,
                'isDiscount': false,
                'encapValueList': packageName,
            },

        })


        // const brandIdList = params[0].id

        const { status, data } = await axios.request({
            url: 'https://wmsc.lcsc.com/ftps/wm/product/search/list',
            method: 'post',
            headers: this.header,
            data: {
                'currentPage': 1,
                'pageSize': 25,
                'catalogIdList': [catalogId],
                'paramNameValueMap': otherTypes,
                'brandIdList': manufacturer,
                'isStock': false,
                'isEnvironment': false,
                'isHot': false,
                'isDiscount': false,
                'encapValueList': packageName,
            },

        });

        if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }

    async parse_parsebypage(catalogId, params = [], page) {
        const tmp = this.parseParams(params)
        console.log(tmp)
        // const brandIdList = params[0].id

        const { status, data } = await axios.request({
            url: 'https://wmsc.lcsc.com/ftps/wm/product/search/list',
            method: 'post',
            headers: this.header,
            data: {
                'currentPage': page,
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

    async parse_hot_parsebypage(params = [], page) {
        const tmp = this.parseParams(params)
        console.log(tmp)

        const { status, data } = await axios.request({
            url: 'https://wmsc.lcsc.com/ftps/wm/product/search/list',
            method: 'post',
            headers: this.header,
            data: {
                'currentPage': page,
                'pageSize': 25,
                'catalogIdList': [],
                'paramNameValueMap': {},
                'brandIdList': tmp[0],
                'isStock': false,
                'isEnvironment': false,
                'isHot': true,
                'isDiscount': false,
                'encapValueList': tmp[1]
            }
        });

        if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }



    async parse_params(catalogId, params = []) {
        const tmp = params
        
        let manufacturer = [];
        let packageName = [];
        let otherTypes = {};

        tmp.forEach(item => {
            if (item.type === 'Manufacturer') {
                manufacturer = [item.id];
            } else if (item.type === 'Package') {
                packageName = [item.name];
            } else {
                otherTypes[item.type] = [item.name];
            }
        });

        console.log('request', {
            url: 'https://wmsc.lcsc.com/ftps/wm/product/search/list',
            method: 'post',
            data: {
                'currentPage': 1,
                'pageSize': 25,
                'catalogIdList': [catalogId],
                'paramNameValueMap': otherTypes,
                'brandIdList': manufacturer,
                'isStock': false,
                'isEnvironment': false,
                'isHot': false,
                'isDiscount': false,
                'encapValueList': packageName,
            },

        })

        const { status, data } = await axios.request({
            url: 'https://wmsc.lcsc.com/ftps/wm/product/search/param/group',
            method: 'post',
            headers: this.header,
            data: {
                'currentPage': 1,
                'pageSize': 25,
                'catalogIdList': [catalogId],
                'paramNameValueMap': otherTypes,
                'brandIdList': manufacturer,
                'isStock': false,
                'isEnvironment': false,
                'isHot': false,
                'isDiscount': false,
                'encapValueList': packageName,
            },
        });

        if (status !== 200) {
            throw ApiError.BadRequest();
        }

        return data;
    }

    async parse_hot_params(params = []) {
        const tmp = this.parseParams(params)

        const { status, data } = await axios.request({
            url: 'https://wmsc.lcsc.com/ftps/wm/product/search/param/group',
            method: 'post',
            headers: this.header,
            data: {
                'paramNameValueMap': {},
                'brandIdList': tmp[0],
                'isStock': false,
                'isEnvironment': false,
                'isHot': true,
                'isDiscount': false,
                'encapValueList': tmp[1],
            },
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
            url: 'https://wmsc.lcsc.com/ftps/wm/product/catalogs/search',
            method: 'get',
            headers: this.header,

        });

        if (status !== 200) {
            console.log('200 error detecct')//ytmp
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
