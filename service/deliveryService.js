const bcrypt = require('bcrypt')
const uuid = require('uuid')
const axios = require('axios');

const client_id = 'HeyDcTj6Et72w0WrcJTThpoAHl6YkZWP'
const client_secret = 'sEAUDL4CfsPNR63oxaC072R2joMVpRB2'

class DeliveryService {
    async getTarrif() {
        try {
            const {status, data} = await axios.request({
                url: `https://api.cdek.ru/v2/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
                method: 'post',
            });

            var token = data.access_token
            var headers = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            };
            var body = {
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
            }

            const {response} = await axios.request({
                data: body,
                headers: headers,
                url: `https://api.cdek.ru/v2/calculator/tarifflist`,
                method: 'post',
            });
            console.log(response)

            if (status !== 200) {
                throw ApiError.BadRequest();
            }
            return response;
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new DeliveryService();