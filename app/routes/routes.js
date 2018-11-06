var authController = require('../controllers/authcontroller.js');
var pageController = require('../controllers/pagecontroller.js');
module.exports = function(app,passport){

app.get('/signup', authController.signup);

app.get('/signin', authController.signin);

app.get('/logout',authController.logout);

app.post('/signup', 
    passport.authenticate('local-signup'),
    function(req, res) {
        res.json({msg: 'Successfully registered!',
                  userid: req.user.userid});
    });

app.post('/signin',
passport.authenticate('local-signin'),
    function(req, res) {
        res.json({msg: 'Successfully logged in!',
                  userid: req.user.userid});
    });


app.get('/dashboard', isLoggedIn, pageController.dashboard);
app.get('/userhome', isLoggedIn, pageController.userhome);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.json({msg: 'Cannot access -- Not logged in'});
}
}






