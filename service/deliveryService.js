const bcrypt = require('bcrypt')
const uuid = require('uuid')
const axios = require('axios');

const client_id = process.env.CDEK_ID
const client_secret = process.env.CDEK_SECRET
const dada_key = process.env.DADA_KEY

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
        
            return data.access_token;
        } catch (e) {
            console.log(e)
        }
    }

    async getPostal(lat, lon) {
        try {
            var headers = {
                "Authorization": `Token  ${dada_key}`,
                "Content-Type": 'application/json',
                "Accept": "application/json",
            };
            
            const { status, data } = await axios.request({
                url: `http://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address`,
                method: 'post',
                headers: headers,
                body: JSON.stringify({ lat, lon })
            });

            if (status !== 200) {
                throw ApiError.BadRequest();
            }
            return data.suggestions;
            return data.suggestions;
        } catch (e) {
            console.log(e)
        }
    }

    async getTarrif(address,token) {
        try {
            var headers = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            };
            
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
                        "address": "Москва, ул. Михалковская, дом 63Б строение 1, офис 3/1"
                    },
                    "to_location": {
                        "address": address
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

            if (status !== 200) {
                throw ApiError.BadRequest();
            }
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async getDeliveryPoints(postal, token) {
        try {
            var headers = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            };
            
            const { status, data } = await axios.request({
                url: `https://api.cdek.ru/v2/deliverypoints`,
                method: 'get',
                headers: headers,
                params: { postal_code: postal },
            });

            if (status !== 200) {
                throw ApiError.BadRequest();
            }
            return data;
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new DeliveryService();