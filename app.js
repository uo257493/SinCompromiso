var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');
var mongo = require('mongodb');
var crypto = require('crypto');
var expressSession = require('express-session');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var https = require('https');
const path = require ('path')





var app = express();
app.use(express.static(__dirname + "/public"));
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));
app.set('port', 8081);




app.get('/', function (req, res) {
    res.send('Hola mundo');
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