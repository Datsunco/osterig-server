const bcrypt = require('bcrypt')
const uuid = require('uuid')
const axios = require('axios');

const client_id = 'HeyDcTj6Et72w0WrcJTThpoAHl6YkZWP'
const client_secret = 'sEAUDL4CfsPNR63oxaC072R2joMVpRB2'

class DeliveryService {
        
    async getTarrif() {
        const { status, data } = await axios.request({
            url: `https://api.cdek.ru/v2/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
            method: 'post',
        });

        if (status !== 200) {
            throw ApiError.BadRequest();
        }
        console.log(status, data, "test")
        return data;
    }

}

module.exports = new DeliveryService();