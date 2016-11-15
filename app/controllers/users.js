var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var passport = require('../../config/passport.js');

module.exports = function (app) {
  app.use('/users', router);
};

router.use(passport.authenticate("jwt", {session: false}));

router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params["id"];
  console.log("GET /user/" + id);
  User.findOne({_id: id}, function(err, user) {
    if (err) return next(err);
    res.json(user);
  })
});
