var exports = module.exports = {}


exports.signup = function(req,res){
	res.json({msg: 'Successful get from signup'}); 
}

exports.signin = function(req,res){
	res.json({msg: 'Successful get from signin'}); 
}

exports.logout = function(req,res){
  req.session.destroy(function(err) {
    var returnString = 'Successful logout';
    res.json({msg: returnString}); 
  });
}