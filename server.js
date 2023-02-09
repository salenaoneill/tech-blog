//dependencies
require('dotenv').config();

const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.DB_SESSION_SECRET,
    //expires after one day
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
}

//use express session for session handling
app.use(session(sess));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//set handelbars as template engine
app.engine('handelbars', hbs.engine);
app.set('view engine', 'handlebars');

//routes path
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
})