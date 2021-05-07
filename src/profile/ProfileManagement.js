module.exports = function(app, swig, gestorBD, session){
    app.post('/app/desconectarse', async function (req, res) {
        console.log(await session.getUser());
        session.logout();
        res.redirect("/");
    });
    app.post('/app/verPerfil', function (req, res) {
        res.send("Adeu");
    });
    app.post('/app/login', function (req, res) {
        var estaRegistrado = false; //dao.estaRegistrado();
        var respuesta = null;
        if(!estaRegistrado) {
            respuesta = swig.renderFile('views/panels/registroSC.html', {
                usuarioActivo: req.session
            });
        }
        else{
            respuesta = swig.renderFile('views/panels/perfilSSSC.html', {
                usuarioActivo: req.session
            });
        }

        res.send(respuesta);


    });
}