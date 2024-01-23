const bcrypt = require('bcrypt')
const uuid = require('uuid')
const axios = require('axios');

const client_id = 'HeyDcTj6Et72w0WrcJTThpoAHl6YkZWP'
const client_secret = 'sEAUDL4CfsPNR63oxaC072R2joMVpRB2'

class DeliveryService {
    async getToken() {
        try {
            const { status, data } = await axios.request({
                url: `https://api.cdek.ru/v2/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
                method: 'post',
            });

            if (status !== 200) {
                throw ApiError.BadRequest();
            }
        
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async getTarrif(token) {
        try {
            var headers = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            };
            console.log(headers)
            const { status, data } = await axios.request({
                url: `https://api.cdek.ru/v2/calculator/tarifflist`,
                method: 'post',
                headers: headers,
                data: {
                    "type": 1,
                    "date": "2020-11-03T11:49:32+0700",
                    "currency": 1,
                    "lang": "rus",
                    "from_location": {
                        "address": "Балашиха"
                    },
                    "to_location": {
                        "address": "Мытищи семашко 4 к 3"
                    },
                    "packages": [
                        {
                            "height": 10,
                            "length": 10,
                            "weight": 4000,
                            "width": 10
                        }
                    ]
                },
            });
            console.log(data)
            
            if (status !== 200) {
                console.log(status)
                throw ApiError.BadRequest();
            }
            return data;
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new DeliveryService();