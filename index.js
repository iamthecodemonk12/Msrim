const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./db/models');
const routes = require('./routes/userroutes');

const app = express();
app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', 'view');

//
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//ALL ROUTES
app.use(routes);
app.listen(app.get('port'),function(e) {
    if (e) {
        console.log(e);
    }
    try {
        // console.log("server started at localhost: " + app.get('port') + "/");
        sequelize.authenticate();
    } catch (error) {
        console.log(error);
    }
});