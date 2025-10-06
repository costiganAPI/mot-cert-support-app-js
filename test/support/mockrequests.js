const { default: axios } = require("axios")

const mockrequests = {

   getUsers : async () => {
       return await axios.get('http://127.0.0.1:8080/v1/user', {
           headers: {
               'Authorization' : 'Bearer abc123'
           }
       })
   },

   createUser : async () => {
       return axios.post('http://127.0.0.1:8080/__admin/mappings', {
               "request": {
                 "method": "POST",
                 "url": "/v1/auth/login",
                 "bodyPatterns": [{
                   "equalToJson" : "{\"email\":\"new-user@test.com\",\"password\":\"password123\"}"
                 }]
               },
               "response": {
                 "status": 200,
                 "body" : "{\"token\" : \"abc123\",\"admin\": false, \"id\": 2}",
                 "headers": {
                   "Content-Type": "application/json"
                 }
               }
             })
   }

}

module.exports = mockrequests;