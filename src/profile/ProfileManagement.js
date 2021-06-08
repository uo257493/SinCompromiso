const {
    getSessionFromStorage,
    getSessionIdFromStorageAll,
    Session
} = require("@inrupt/solid-client-authn-node");
var htmlToImage = require('html-to-image');
module.exports = function(app, swig, mongoDao, podDao, session, FC){

    app.post('/app/verPerfil', function (req, res) {
        res.send("Adeu");
    });

    app.post('/app/registrarse', async function (req, res) {

        var name = req.body.name;
        var birth = req.body.birth;
        var gender = req.body.gender;
        var bio = req.body.bio;
        var images = req.body.images;


        mongoDao.addUser(podDao.getUserId(), async function(id) {
            if (id == null) {
                res.status(500);
                res.json({
                    error : "se ha producido un error"
                })
            } else {
                await podDao.createMySCProfile(name, birth, gender, bio, images);
                res.status(200);

                res.send("/app/perfil");
            }

        });
    });

    app.post('/app/personalizar', async function (req, res) {

        var name = req.body.name;
        var bio = req.body.bio;
        var images = req.body.images;

        var supportList = [];
        var dataGot = await podDao.getDatosPerfil();
        for(var i = 0; i < images.length; i++){
            var indexOfImagen = parseInt(images[i].replace("img","").split(".")[0],10);
            if(dataGot.imagenes[indexOfImagen]!=""){
                await podDao.deletePic(dataGot.imagenes[indexOfImagen])
                dataGot.imagenes[indexOfImagen] = images[i];
            }
            else{
                var supportObject = new Object();
                supportObject.index = i;
                supportObject.name = "img"+dataGot.cantidadImagenes+"."+images[i].split(".")[1];
                supportList.push(supportObject);
                dataGot.imagenes[dataGot.cantidadImagenes] = supportObject.name;
                dataGot.cantidadImagenes++;
            }

        }
                await podDao.editPerfil(name, bio, dataGot.imagenes);
                res.status(200);

                res.send(supportList);


    });

    app.post('/app/subeImagen', async function (req, res) {

        var image = req.body.image;

            var thI = Buffer.from(image.content, 'base64');
            await podDao.uploadImage(thI, image.name);
            res.end();


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
       //await podDao.eliminaTodasCarpetas();
        var respuesta = null;
        if(!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        }
        else{
            var dataGot = await podDao.getDatosPerfil();

            var usuario = new Object();
            usuario.nombre = dataGot.name;
            usuario.edad = getAge(dataGot.birth);
            if(dataGot.cantidadImagenes >0)
                usuario.imagen = dataGot.imagenes[0];
            else
                usuario.imagen = "../../media/noPic.png";

            respuesta = swig.renderFile('views/panels/perfil.html',{
                usuario: usuario
            });
        }

        res.send(respuesta);


    });


    app.get('/app/personaliza', async function (req, res) {
        var estaRegistrado = await podDao.isRegistered();
        var respuesta = null;
        if(!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        }
        else{
            var perfil = await podDao.getDatosPerfil();
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

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$3/$2/$1"));
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


}