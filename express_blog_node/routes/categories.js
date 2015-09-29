var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');


router.get('/show/:category', function(req, res, next) {
	console.log('show by category '+req.params.category+'---');
	var db = req.db;
	var posts = db.get('posts');
	posts.find({category:req.params.category},{},function(err,posts){
		//util.inspect(posts);
		console.log('Number of posts : '+posts.length);
		
		res.render('index',{
		"title":req.params.category,
		"posts":posts
	});

	});

	
 });


/* Home page for blog posts */
router.get('/add', function(req, res, next) {
	res.render('addcategory',{
		"title":"Add Category"
	});
 });

router.post('/add',function(req,res,next){
	util.inspect(req);
 	var title = req.body.title;
 	req.checkBody('title', 'Title field is required').notEmpty();
  		
  	var errors = req.validationErrors();
  if (errors) {
    res.render('addcategory', {
      "errors": errors,
      "title": title
      });
  } else {
    //no errors - create user model
   var categories = db.get('categories');
   categories.insert({
   	"title": title
      
   },function(err,category){
   	if (err) {
   		res.send('Error saving Category');
   	} else{
   		req.flash('success','Category sumbmitted');
   		res.location('/');
   		res.redirect('/');
   	}
   });

 }
});
module.exports = router;