const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const passport = require('./middlewares/auth');
const models = require('./models');
const routes = require('./routes/routes');
const dotenv = require('dotenv').load();
const cors = require('cors');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use(expressSession(({
  secret: '$$$BigMoney$$$',
  resave: false,
  saveUninitialized: true,
})));

app.use(passport.initialize());
app.use(passport.session());

// Load up all of the routes
app.use('/api', routes);


// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
models.sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`);
    });
  });
