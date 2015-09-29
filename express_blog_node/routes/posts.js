 var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var st = require('string');
var db = require('monk')('localhost/nodeblog');



router.get('/show/:id', function(req, res, next) {
	
	var posts = db.get('posts');
	console.log('Number of posts : '+posts.length);
	posts.findById(req.params.id,{},function(err,post){
		//util.inspect(posts);
		
		
		res.render('show',{
		
		"post":post
	});

	});
 

});

router.get('/add', function(req, res, next) {
	var categories = db.get('categories');
	categories.find({},{},function(err,categories){
		
		 res.render('addpost',{
  		"title":"Add Post",
  		"categories":categories
  	});
	});
 

});
 
 router.post('/add',function(req,res,next){
	
 	var title = req.body.title;
 	var category = req.body.category;
 	var body = req.body.body;
 	var author = req.body.author;
 	var date = new Date();

 	if (req.body.mainimage) {
 		profileImageOriginalName = req.body.mainimage.originalname;
    	profileImageName = req.body.mainimage.name;
	    profileImageMime = req.body.mainimage.mimetype;
	    profileImagePath = req.body.mainimage.path;
	    profileImageExt = req.body.mainimage.extension;
	    profileImageSize = req.body.mainimage.size;
 	} else{
 		profileImageName = 'noimage.png';
 	}

 	req.checkBody('title', 'Title field is required').notEmpty();
  	req.checkBody('body', 'Body field is required').notEmpty();
  	

  	var errors = req.validationErrors();
  if (errors) {
    res.render('addpost', {
      "errors": errors,
      "title": title,
      "body": body
      
    });
  } else {
    //no errors - create user model
   var posts = db.get('posts');
   posts.insert({
   	"title": title,
      "body": body,
      "category":st(category).trim().s,
      "author":author,
      "date":date,
      "mainimage":profileImageName
   },function(err,post){
   	if (err) {
   		res.send('Error saving post');
   	} else{
   		req.flash('success','Post sumbmitted');
   		res.location('/');
   		res.redirect('/');
   	}
   });

 }
});

router.get('/add', function(req, res, next) {
	var categories = db.get('categories');
	categories.find({},{},function(err,categories){
		
		 res.render('addpost',{
  		"title":"Add Post",
  		"categories":categories
  	});
	});
 

});
 
 router.post('/addcomment',function(req,res,next){
	
 	var name = req.body.name;
 	var email = req.body.email;
 	var body = req.body.body;
 	var postid = req.body.postid;
 	var commentdate = new Date();

 	

 	req.checkBody('name', 'Title field is required').notEmpty();
  	req.checkBody('body', 'Body field is required').notEmpty();
  	req.checkBody('email', 'Email field is required').notEmpty().isEmail();

  	var errors = req.validationErrors();
  if (errors) {
  	var posts = db.get('posts');
  	posts.findById(postid,function(err,post){
			res.render('show',{
			"post":post,
			"errors":err
	});

	});
    
  } else {
    //no errors - create user model
   var comment = {"name":name,"email":email,"body":body,"commentdate":commentdate};
   var posts = db.get('posts');

   posts.update({
   	"_id":postid
   },{$push:{"comments":comment}},function(err,doc){
   	if (err) {
		throw err;
   	} else{
   		req.flash('success','Comment added');
   		res.location('/posts/show/'+postid);
   		res.redirect('/posts/show/'+postid);
   	};
   });
  	

 }
});

module.exports = router;