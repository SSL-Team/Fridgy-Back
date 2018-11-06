var exports = module.exports = {}

exports.dashboard = function(req,res){
	res.json({msg: 'Successful get dashboard'}); 
}

exports.userhome = function(req,res){
	res.json({msg: 'Successful get user home'}); 
}