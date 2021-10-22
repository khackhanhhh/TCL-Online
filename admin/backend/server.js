const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');

require('dotenv').config();

/////////////////////// APP CONFIGURATION

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET_KEY,
    cookie: { maxAge: 86400000  },
  })
);


/////////////////////// DATABASE CONNECTION

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify : false,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

/////////////////////// ROUTES

const usersRoute = require('./routes/users');
const gamesRoute = require('./routes/games');
const roundsRoute = require('./routes/rounds');

app.use('/api/users',usersRoute);
app.use('/api/games', gamesRoute);
app.use('/api/rounds', roundsRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
