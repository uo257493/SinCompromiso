var express = require('express');
var sesManagement = require("./src/solidLogin/SessionManagement");
var proManagement = require("./src/profile/ProfileManagement");
var bodyParser = require('body-parser');
var swig = require('swig');
var mongo = require('mongodb');
var crypto = require('crypto');
var expressSession = require('express-session');
var enlManagement = require("./src/match/MatchManagement");
var chatManagement = require("./src/chat/ChatManagement");
const FC   = require('solid-file-client')
var PODDao = require('./src/daos/PODDao')
var MongoDAO = require('./src/daos/MongoDAO')
var testManagement = require('./src/TestManagement')



const {
    getSessionFromStorage,
    getSessionIdFromStorageAll,
    Session
} = require("@inrupt/solid-client-authn-node");

const session = new Session();
var fc   = new FC(session);
var myPODDao = new PODDao();



var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));

app.set('port', 8081);
var conexiondb = 'mongodb://miSCAdminZZL0L:hjt3iqZXEKbwVMEJ@cluster0-shard-00-00.hputh.mongodb.net:27017,cluster0-shard-00-01.hputh.mongodb.net:27017,cluster0-shard-00-02.hputh.mongodb.net:27017/SinCompromiso?ssl=true&replicaSet=atlas-13f55z-shard-0&authSource=admin&retryWrites=true&w=majority'
app.set('db',conexiondb);
app.set('crypto',crypto);
app.set('clave','abcdefg');
var myMongoDao = new MongoDAO(app, mongo)

var routerUsuarioSession = express.Router();



routerUsuarioSession.use(function(req, res, next) {

    if ( req.session.sessionId ) {
        next();
    } else {
        res.redirect("/signin");
    }
});

app.use("/app/*",routerUsuarioSession);
app.use("/registro/*",routerUsuarioSession);
app.use("/logout",routerUsuarioSession);
app.get('/', async function (req, res) {

        res.redirect("/signin");
})

app.listen(app.get('port'), function() {
    console.log("Servidor activo en el puerto 8081");
});




sesManagement(app, swig, myPODDao, FC);
proManagement(app, swig, myMongoDao, myPODDao, session, FC);
enlManagement(app, swig, myMongoDao, PODDao, FC);
chatManagement(app, swig, myMongoDao, PODDao, FC);
testManagement(app, swig, myMongoDao, PODDao, FC);
