var express = require('express');
const cookieSession = require("cookie-session");
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
var solidSession = "";
var enlManagement = require("./src/match/MatchManagement");
var chatManagement = require("./src/chat/ChatManagement");
var SessionInSolid = require("./src/solidLogin/Session.js")
const FC   = require('solid-file-client')
var PODDao = require('./src/daos/PODDao')
var MongoDAO = require('./src/daos/MongoDAO')


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

// app.use(
//     cookieSession({
//         name: "session",
//         // These keys are required by cookie-session to sign the cookies.
//         keys: [
//             "key1",
//             "key2"
//         ],
//         maxAge: 24 * 60 * 60 * 0, // 24 hours
//     })
// );
app.set('port', 8081);
var conexiondb = 'mongodb://miSCAdminZZL0L:hjt3iqZXEKbwVMEJ@cluster0-shard-00-00.hputh.mongodb.net:27017,cluster0-shard-00-01.hputh.mongodb.net:27017,cluster0-shard-00-02.hputh.mongodb.net:27017/SinCompromiso?ssl=true&replicaSet=atlas-13f55z-shard-0&authSource=admin&retryWrites=true&w=majority'
app.set('db',conexiondb);
app.set('crypto',crypto);
app.set('clave','abcdefg');
var myMongoDao = new MongoDAO(app, mongo)
gestorBD = null;

app.get('/', async function (req, res) {
    var logged = false; //await auth.currentSession();

    if(!logged)
        res.redirect("/signin");
    else
        res.redirect("/app/perfil")
})

app.listen(app.get('port'), function() {
    console.log("Servidor activo en el puerto 8081");
});


function setSesId(idSesion) {
    solidSession = idSesion;
}

async function getSession() {
    session = await getSessionFromStorage(solidSession);
    return session.info.isLoggedIn;

}

sesManagement(app, swig, myPODDao, FC);
proManagement(app, swig, myMongoDao, myPODDao, session, FC);
enlManagement(app, swig, myMongoDao, PODDao, FC);
chatManagement(app, swig, myMongoDao, PODDao, FC);
// https.createServer({
//     key: fs.readFileSync('certificates/alice.key'),
//     cert: fs.readFileSync('certificates/alice.crt')
// }, app).listen(app.get('port'), function() {
//     console.log("Servidor activo en el puerto 8081");
// });