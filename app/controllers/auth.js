var config = require('../../config/config.js');
var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');
var router = express.Router();
var bcrypt = require('bcrypt-as-promised');

module.exports = function (app) {
    app.use('/auth', router);
};

router.post('/', function (req, res, next) {
    
    var username = req.body.username;
    var password = req.body.password;

    if(username === undefined || password === undefined) {
        return next({status: 401, message: "Please provide credentials"});
    }

    User.findOne({
        'username': username
    })
    .then(function(user) {
        if (user === null) {
            throw new Error("user does not exist");
        }
        console.log("Found user: " + user);
        return user
    })
    .then(function(user) {
        return bcrypt.compare(password, user.password)
        .then(function(){
            return user;
        })
    })
    .then(function(user) {
        var data = {
            "who": user.username,
            "where": "here"
        };
        var token = jwt.sign(data, config.jwtsecret);
        console.log("Issuing web token: " + token);
        res.json(token);
    })
    .catch(function(error) {
        console.error("Error: " + error);
        return next({status: 401, message: error.message});
    });
});