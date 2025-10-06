const mockrequests = require("./mockrequests.js");

const databuilder = {

   getUserCredentials: async (role) => {
       const response = await mockrequests.getUsers();

       return new Promise((resolve) => {
           for (let i = 0; i < response.data.length; i++) {
               if(response.data[i].role == role){
                   resolve(response.data[i]);
               }
           }

           mockrequests.createUser()
               .then((response) => {
                   const newCredentials = JSON.parse(response.data.request.bodyPatterns[0].equalToJson);
                   resolve(newCredentials);
               })
       })
   }

}

module.exports = databuilder