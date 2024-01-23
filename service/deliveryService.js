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
                "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJvcmRlcjphbGwiLCJwYXltZW50OmFsbCJdLCJleHAiOjE3MDYwMjAzMjYsImF1dGhvcml0aWVzIjpbInNoYXJkLWlkOnJ1LTA0IiwiY29udHJhZ2VudC11dWlkOjExODI4NmRmLTljNjQtNGZhYS1hZjgyLTlhOTRiZjIyYmZkYyIsImFjY291bnQtdXVpZDoyYjkwNzU4Mi1kZjM4LTQ5MzctODZkMy1iZTkyN2ZiNTNlOTQiLCJjbGllbnQtZW1haWxzOnZvcmRncnVwcEB5YW5kZXgucnUiLCJjbGllbnQtaWQtZWM0Ojk3MzgyOTEiLCJjbGllbnQtY2l0eTrQpdC40LzQutC4LCDQnNC-0YHQutC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCIsImZ1bGwtbmFtZTrQkdCw0YDRhdCw0YLQvtCy0LAg0JDQvdC90LAg0K7RgNGM0LXQstC90LAiLCJhY2NvdW50LWxhbmc6cnVzIiwiY29udHJhY3Q60JjQnC3QoNCkLdCSN9CgLTU0IiwiYXBpLXZlcnNpb246MS4xIiwiY2xpZW50LWlkLWVjNToxMTgyODZkZi05YzY0LTRmYWEtYWY4Mi05YTk0YmYyMmJmZGMiLCJzb2xpZC1hZGRyZXNzOmZhbHNlIiwiY29udHJhY3QtaWQ6NzQwNjlkMWUtMDIwMC00YWJiLTg0NTAtZTE2ZjUxYTAyYzljIl0sImp0aSI6IkowbHNEWmRodXVmdGc1R1RnVGNQQkdDSVdkQSIsImNsaWVudF9pZCI6IkhleURjVGo2RXQ3MncwV3JjSlRUaHBvQUhsNllrWldQIn0.A5DxgPDzlmG1UjnQT-nwiDoHyniK5pX2xyFWLQximcpu-cyYPZfa24LpD4JRHezz9mdxaTyhsV23leFm03-Fm9vTZncYAl5GKP_5vVp65wzOsKmyyrp7NxkqX5pIjLIPw8R5itRcVXcjTVc2zb2YNwdHtnl-TQ_ZSAsyHdHAUPOEomnMKnYxGDtlsR7Hr8T7AG3xkP7N9ytTi5PrS-WvyUa3nkUHda4wEWkzg8gIE59N9pSeDWxv_l0lCPDoziwCY2QiWKzo8bRmKan6jMT4OZomCt5C7nLza1K3RQ7qPjktFyaXJJPCrLEhqHyErpZkVcS4F-5VsNvdAK4-4T4cog`,
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
            console.log(status)
            if (status !== 200) {
                console.log(status)
                return false
            }
            return data;
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new DeliveryService();