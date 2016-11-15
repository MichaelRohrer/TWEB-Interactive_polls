var apiPrefix = "http://localhost:3000";
var api = require("supertest-as-promised")(apiPrefix);

function getUsers(jsonWebToken) {
    var request = api.get("/users");
    if (jsonWebToken != undefined) {
        request.set("Authorization", "Bearer " + jsonWebToken)
    }
    return request
        .then(function (response) {
            return response
        });
}

module.exports = {
    getUsers: getUsers
}