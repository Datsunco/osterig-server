const bcrypt = require('bcrypt')
const uuid = require('uuid')
const axios = require('axios');

const client_id = 'HeyDcTj6Et72w0WrcJTThpoAHl6YkZWP'
const client_secret = 'sEAUDL4CfsPNR63oxaC072R2joMVpRB2'

class DeliveryService {
    // constructor(){
    //     this.header = {
    //         'authority': 'wmsc.lcsc.com',
    //         'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'cache-control': 'no-cache',
    //         'content-type': 'application/json;charset=UTF-8',
    //         'cookie': 'area_type=overseas; _gid=GA1.2.293319881.1696425323; wmsc_cart_key=5827DB52BB7A49CA95B059FACF4F6DBD132A9A86AC81ED43C3311E03802593DD3AB6C6CA2C8DA1AE; action_track={"from":"https://web.telegram.org/","to":"/"}; _ga_98M84MKSZH=GS1.1.1696425334.1.1.1696425658.60.0.0; _ga=GA1.2.1006412231.1696425323; _gat_gtag_UA_98399433_1=1',
    //         'origin': 'https://www.lcsc.com',
    //         'pragma': 'no-cache',
    //         'referer': 'https://www.lcsc.com/',
    //         'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
    //         'sec-ch-ua-mobile': '?1',
    //         'sec-ch-ua-platform': '"Android"',
    //         'sec-fetch-dest': 'empty',
    //         'sec-fetch-mode': 'cors',
    //         'sec-fetch-site': 'same-site',
    //         'user-agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36'
    //     }
    // }
        
    async getTarrif() {
        try{
        console.log('test2')

        // axios.post(`https://api.cdek.ru/v2/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`).then((res) => {
        //     console.log(res)
        //     return res;
        // })
        console.log('test2.5')
        const resp = await axios.request({
            url: `https://api.cdek.ru/v2/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
            method: 'post',
        });

        console.log('test3', resp)

        // if (status !== 200) {
        //     throw ApiError.BadRequest();
        // }
        // console.log(status, data, "test")
        return resp;
        }catch(e){
            console.log(e)
        }
    }

}

module.exports = new DeliveryService();