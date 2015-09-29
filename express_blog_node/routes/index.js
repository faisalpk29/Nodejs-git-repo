var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var util = require('util');
/* Home page for blog posts */
router.get('/', function(req, res, next) {
  var db = req.db;
  var posts = db.get('posts');

  posts.find({},{},function(err,posts){
util.inspect(posts);
  	res.render('index',{
  		"posts":posts
  	});
  });
});

module.exports = router;
