module.exports = function(app, swig, gestorBD, session){
    app.post('/app/desconectarse', async function (req, res) {
        console.log(await session.getUser());
        session.logout();
        res.redirect("/");
    });
    app.post('/app/verPerfil', function (req, res) {
        res.send("Adeu");
    });

    app.get('/registro/sinCompromiso', function (req, res) {
        res.send(swig.renderFile('views/panels/registroSC.html'));
    });


    app.get('/app/perfil', function (req, res) {
        var estaRegistrado = !false; //dao.estaRegistrado();
        var respuesta = null;
        if(!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        }
        else{
            var usuario = new Object();
            usuario.nombre = "Luis";
            usuario.edad = 32;
            usuario.imagen = "https://upload.wikimedia.org/wikipedia/commons/7/71/Luis_Su%C3%A1rez_Atl%C3%A9tico_Madrid.jpg";
            respuesta = swig.renderFile('views/panels/perfil.html',{
                usuario: usuario
            });
        }

        res.send(respuesta);


    });


    app.get('/app/personaliza', function (req, res) {
        var estaRegistrado = !false; //dao.estaRegistrado();
        var respuesta = null;
        if(!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        }
        else{
            var perfil = new Object();
            perfil.nombre = "Luis";
            perfil.imagenes = ["https://upload.wikimedia.org/wikipedia/commons/7/71/Luis_Su%C3%A1rez_Atl%C3%A9tico_Madrid.jpg", "","","",""];
            perfil.biografia = "Hola que tal jajajajaj"
            respuesta = swig.renderFile('views/panels/personalizaPerfilSC.html',{
                perfil: perfil
            });
            res.send(respuesta);
        }

     });




}