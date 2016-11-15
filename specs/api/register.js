var register = require("./support/register.js");
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

describe("The /register endpoint", function() {
    it("should make it possible to create a new account", itShouldMakeItPossibleToCreateANewAccount);
    it("should refuse to create an account if mandatory fields are not provided", itShouldRefuseToCreateAnAccountIfMandatoryFieldsAreNotProvided);
    it("should refuse to create an account if the password length is < 8", itShouldRefuseToCreateAnAccountIfPasswordLengthIsSmallerThan8);
    it("should refuse to create an account if the provided username is not available", itShouldRefuseToCreateAnAccountIfUsernameIsNotAvailable);
    it("should return the id of the created account in the location header", itShouldReturnTheIdOfTheCreatedUserInTheLocationHeader);

});

function itShouldMakeItPossibleToCreateANewAccount() {
    var payload = register.generateUser();
    return register.register(payload)
        .then(function(response) {
            response.status.should.equal(201);
            response.should.have.property('status', 201);
            return response;
        });
}

function itShouldRefuseToCreateAnAccountIfMandatoryFieldsAreNotProvided() {
    var payload = register.generateUser();
    var original = JSON.stringify(payload);

    var wrongPayloads = [];
    for(var i=0; i<4; i++) {
        wrongPayloads.push(JSON.parse(original));
    }
    delete wrongPayloads[0].username;
    delete wrongPayloads[1].firstname;
    delete wrongPayloads[2].lastname;
    delete wrongPayloads[3].password;

    var promises = wrongPayloads.map(p => register.register(p));

    return Promise.all(promises)
        .then(function(response) {
            response.forEach(r => (r.status.should.equal(422)));
        });
}

function itShouldRefuseToCreateAnAccountIfPasswordLengthIsSmallerThan8() {
    var payload = register.generateUser();
    payload.password = "1234567";
    return register.register(payload)
        .then(function(response) {
            response.status.should.equal(422);
        })
        .then(function() {
            payload.password = "12345678";
            return register.register(payload)
        })
        .then(function(response) {
            response.status.should.equal(201);
        });  
}

function itShouldRefuseToCreateAnAccountIfUsernameIsNotAvailable() {
    var p1 = register.generateUser();
    var p2 = register.generateUser();
    p2.username = p1.username;
    return register.register(p1)
        .then(function(response) {
            response.status.should.equal(201);
            return register.register(p2);
        })
        .then(function(response) {
            response.status.should.equal(422);
        });  
}

function itShouldReturnTheIdOfTheCreatedUserInTheLocationHeader() {
    var payload = register.generateUser();
    return register.register(payload)
        .then(function(response) {
            response.status.should.equal(201);
            response.headers.should.include.keys("location");
        });  
}