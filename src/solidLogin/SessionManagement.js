module.exports = function(app, swig, sesion){
    app.get('/login', function (req, res) {

        respuesta = swig.renderFile('public/login.html');

         res.send(respuesta);
    });

    app.get('/app', function (req, res) {

        respuesta = swig.renderFile("public/SinCompromiso.html");
        res.send(respuesta);
        //res.redirect("/app/perfil");
    });

    app.post('/sesion', function (req, res) {
        var parsed = req.body;
        console.log(parsed);
        res.send(req.body);
    })
}