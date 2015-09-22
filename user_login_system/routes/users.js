var express = require('express');
var util = require('util')

var router = express.Router();

var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/register', function(req, res, next) {
  res.render('register',{'title':'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login',{'title':'Login'});
});


router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
   
   
  /*console.log(name);
  console.log(email);
  console.log(username);
  console.log(password);
  console.log(password2);
*/

		//check for image field
			if (req.body.profileImage) {
				console.log('Uploading File .....');
				var piOriginalName = req.body.profileImage.originalname;
				var piName = req.body.profileImage.name;
				var mimetype = req.body.profileImage.mimetype;
				var path = req.body.profileImage.path;
				var extension = req.body.profileImage.extension;
				var piName = req.body.profileImage.size;
				
			} else{
				//set default image
				var piName = 'noimage.png';
			}	

//validation for user input
	req.checkBody('name','Name required').notEmpty();
	req.checkBody('email','Email required').notEmpty();
	req.checkBody('email','Invalid Email').isEmail();
	req.checkBody('username','UserName required').notEmpty();
	req.checkBody('password','Password required').notEmpty();
	req.checkBody('password2','Password does not match').equals(req.body.password);

	//Check for errors
	var errors = req.validationErrors();
	if (errors) {
		//console.log('Errors fOUND ---->>> \n'+util.inspect(errors));
		res.render('register',{
			errors:errors,
			name:name,
			email:email,
			username:username,
			password:password,
			password2:password2
		});
	} else{
		var newUser =  new User({

			name:name,
			email:email,
			username:username,
			password:password,
			password2:password2,
			profileImage:piName
		});

		User.createUser(newUser,function(err,user){
			if (err) throw err;
			console.log(user);
		});

		req.flash('success','Successfully loging');
		res.location('/');
		res.redirect('/');
	}


});//end of post method


module.exports = router;
