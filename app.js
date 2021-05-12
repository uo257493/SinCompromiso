var express = require('express');
var sesManagement = require("./src/solidLogin/SessionManagement");
var proManagement = require("./src/profile/ProfileManagement");
var bodyParser = require('body-parser');
var swig = require('swig');
var mongo = require('mongodb');
var crypto = require('crypto');
var expressSession = require('express-session');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var https = require('https');
const path = require ('path')
var solidSession = require('./src/solidLogin/Session');
const auth = require("solid-auth-client");



var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));
app.set('port', 8081);

var currentSession = null;


gestorBD = null;
sesManagement(app, swig, solidSession);
proManagement(app, swig, gestorBD, solidSession);
app.get('/', async function (req, res) {
    var logged = await auth.currentSession();
    if(!logged) {
        console.log('Hello stranger!');
    }
    else
        console.log('Hello '+ (await auth.currentSession()).webId);

    if(!logged)
        res.redirect("/login");
    else
        res.redirect("/app")
})

app.listen(app.get('port'), function() {
    console.log("Servidor activo en el puerto 8081");
});

// https.createServer({
//     key: fs.readFileSync('certificates/alice.key'),
//     cert: fs.readFileSync('certificates/alice.crt')
// }, app).listen(app.get('port'), function() {
//     console.log("Servidor activo en el puerto 8081");
// });