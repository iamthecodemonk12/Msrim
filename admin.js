const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
// const cookieParser = require('cookie-parser');
var session = require("express-session");
const SessionStore = require("express-session-sequelize")(session.Store);
const { sequelize, admin_user_table,subscribers_table, user_msg ,sermons_table,events_table,church_blog,books } = require('./db/models');
const routes = require('./routes/adminroutes');

const app = express();
app.set('port', 9000);
app.set('view engine', 'ejs');
app.set('views', 'view');

const sequelizeSessionStore = new SessionStore({
    db: sequelize,
});
//
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
console.log(process.env.session_name)
    // app.use(cookieParser());
app.use(session({
    name: process.env.session_name,
    secret: 'keep it secret, keep it safe.',
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}));
//ALL ROUTES
app.get('/', async function(req, res) {
    console.log(req.session);
    try {
        if (!req.session.email) {
            return res.render('pages/samples/login.ejs', {
                error: " ",
                errorDesc: " ",
                name: ""
            });
            // return res.redirect('/login');
        } else {
            console.log("my session name" + process.env.session_name);
            console.log(req.session);
            const getAdminData = await admin_user_table.findOne({ where: { email: req.session.email } });
            res.render('pages/index', {
                name: "Welcome" + "\t" + getAdminData.name + "\t" + getAdminData.surname,
                workers:await admin_user_table.findAll(),
                books:await books.findAll(),
                msg:await user_msg.findAll(),
                sermons:await sermons_table.findAll(),
                days:["Jan","Feb","Mar","Apr","May","June","july","Aug","Sep","Oct","Nov","Dec"]
            });
        }
    } catch (error) {
        console.log(error);
    }
});
app.use(routes);
app.get('*', function(req, res) {
    res.render('pages/samples/error-404');
});
app.listen(app.get('port'),function(e) {
    if (e) {
        console.log(e);
    }
    try {
        console.log("server started at http:localhost://" + app.get('port') + "/");
        sequelize.authenticate();
    } catch (error) {
        console.log(error);
    }
});