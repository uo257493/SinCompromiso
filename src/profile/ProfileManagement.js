const {
    getSessionFromStorage,
    getSessionIdFromStorageAll,
    Session
} = require("@inrupt/solid-client-authn-node");
module.exports = function(app, swig, mongoDao, podDao, session, FC){

    app.post('/app/verPerfil', function (req, res) {
        res.send("Adeu");
    });

    app.post('/app/registrarse', async function (req, res) {


            console.log("*************************************************************")
            console.log(req.body);
            console.log("*************************************************************")

        var name = req.body.name;
        var birth = req.body.birth;
        var gender = req.body.gender;
        var bio = req.body.bio;

        mongoDao.addUser(podDao.getUserId(), async function(id) {
            if (id == null) {
                res.status(500);
                res.json({
                    error : "se ha producido un error"
                })
            } else {
                await podDao.createMySCProfile(name, birth, gender, bio);
                res.status(200);

                res.send("/app/perfil");
            }

        });
    });
    app.get('/registro/sinCompromiso', async function (req, res) {
        if(await podDao.isRegistered())
            res.redirect("/app/perfil")
        else
            res.send(swig.renderFile('views/panels/registroSC.html'));
    });


    app.get('/app/perfil', async function (req, res) {
        var estaRegistrado;
        estaRegistrado = await podDao.isRegistered();
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
            perfil.imagenes = ["../../media/suarez.jpg", "","","",""];
            perfil.biografia = "Hola que tal jajajajaj"
            respuesta = swig.renderFile('views/panels/personalizaPerfilSC.html',{
                perfil: perfil
            });
            res.send(respuesta);
        }

     });

 app.get('/app/preferencias', function (req, res) {
        var estaRegistrado = !false; //dao.estaRegistrado();
        var respuesta = null;
        if(!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        }
        else{
            var perfil = new Object();
            perfil.nombre = "Luis";
            perfil.imagenes = ["../../media/suarez.jpg", "","","",""];
            perfil.biografia = "Hola que tal jajajajaj"
            respuesta = swig.renderFile('views/panels/personalizaPreferenciasSC.html',{
            });
            res.send(respuesta);
        }

     });




}