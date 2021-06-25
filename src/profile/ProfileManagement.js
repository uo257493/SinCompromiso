const {
    getSessionFromStorage,
    getSessionIdFromStorageAll,
    Session
} = require("@inrupt/solid-client-authn-node");
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'bh58lkif';
var PODDao = require('../daos/PODDao');
function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text+"",'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text+"",'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}




module.exports = function(app, swig, mongoDao, podDao, session, FC){

    app.post('/app/registrarse', async function (req, res) {

        var name = req.body.name;
        var birth = req.body.birth;
        var gender = req.body.gender;
        var bio = req.body.bio;
        var images = req.body.images;
        if(name.length > 15 || name.length <3 || name.trim().length < 2){
            res.send(500);
            return ;
        }
        if(gender != "f" && gender != "m"){
            res.send(500);
            return ;
        }
        if(bio.length > 500){
            res.send(500);
            return ;
        }
        if(isNaN(getAge(birth)) || getAge(birth) < 18){
            res.send(500);
            return ;
        }
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);

        mongoDao.addUser(pdao.getUserId(), async function(id) {
            if (id == null) {
                res.status(500);
                res.json({
                    error : "se ha producido un error"
                })
            } else {
                await pdao.createMySCProfile(name, birth, gender, bio, images);
                res.status(200);

                res.send("/app/perfil");
            }

        });
    });


    app.post('/app/preferencias', async function (req, res) {

        var preferencias = req.body.preferencias;
        if(isNaN(preferencias.edadMin) || preferencias.edadMin < 18){
            res.send(500);
            return;
        }
        if(isNaN(preferencias.edadMax)){
            res.send(500);
            return;
        }
        if( preferencias.edadMax < preferencias.edadMin){
            res.send(500);
            return;
        }
        if(isNaN(preferencias.distancia) || preferencias.distancia < 1 || preferencias.distancia > 150){
            res.send(500);
            return;
        }
        if(preferencias.generoBusqueda != "t" && preferencias.generoBusqueda != "m" && preferencias.generoBusqueda != "f"){
            res.send(500);
            return;
        }
        if (preferencias.mostrarDistancia != true && preferencias.mostrarDistancia != false){
            res.send(500);
            return;
        }
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        var userA = await pdao.getDatosPerfil();
        preferencias.gender = userA.gender;

        mongoDao.editPreferences(pdao.getUserId(), preferencias, function(resultado) {
            if (resultado == null) {
                res.status(500);
                res.json({
                    error : "se ha producido un error"
                })
            } else {
                res.status(200);

                res.send("/app/perfil");
            }

        });
    });

    app.post('/app/personalizar', async function (req, res) {

        var name = req.body.name;
        var bio = req.body.bio;
        var images = req.body.images;
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        if(name.length > 15 || name.length <3 || name.trim().length < 2){
            res.send(500);
            return ;
        }
        if(bio.length > 500){
            res.send(500);
            return ;
        }
        var supportList = [];
        var dataGot = await pdao.getDatosPerfil();
        for(var i = 0; i < images.length; i++){
            var indexOfImagen = parseInt(images[i].replace("img","").split(".")[0],10);
            if(dataGot.imagenes[indexOfImagen]!=""){
                await pdao.deletePic(dataGot.imagenes[indexOfImagen])
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
                await pdao.editPerfil(name, bio, dataGot.imagenes);
                res.status(200);

                res.send(supportList);


    });

    app.post('/app/subeImagen', async function (req, res) {

        var image = req.body.image;
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        var thI = Buffer.from(image.content, 'base64');
        await pdao.uploadImage(thI, image.name);
        res.end();


    });

    app.post('/app/localiza',  async function (req, res) {

        var lat = encrypt(req.body.latitude);
        var long = encrypt(req.body.longitude+"");
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);


            await pdao.geoLocaliza(lat, long);
            res.end();


    });

     app.get('/registro/sinCompromiso', async function (req, res) {
         const session = await getSessionFromStorage(req.session.sessionId)
         var fc = new FC(session)
         var pdao = new PODDao();
         pdao.setFC(fc);
         pdao.setUserID(await session.info.webId);
        if(await pdao.isRegistered())
            res.redirect("/app/perfil")
        else
            res.send(swig.renderFile('views/panels/registroSC.html'));
    });


    app.get('/app/perfil', async function (req, res) {
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        var estaRegistrado;
        estaRegistrado = await pdao.isRegistered();
       //await podDao.eliminaTodasCarpetas();
        var respuesta = null;
        if(!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        }
        else{
            var dataGot = await pdao.getDatosPerfil();

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
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        var estaRegistrado = await pdao.isRegistered();
        var respuesta = null;
        if(!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        }
        else{
            var perfil = await pdao.getDatosPerfil();
            respuesta = swig.renderFile('views/panels/personalizaPerfilSC.html',{
                perfil: perfil
            });
            res.send(respuesta);
        }

     });

 app.get('/app/preferencias', async function (req, res) {
     const session = await getSessionFromStorage(req.session.sessionId)
     var fc = new FC(session)
     var pdao = new PODDao();
     pdao.setFC(fc);
     pdao.setUserID(await session.info.webId);
        var estaRegistrado = await pdao.isRegistered();
        var respuesta = null;
        if(!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        }
        else{
            mongoDao.leePreferencias(pdao.getUserId(), function (pref) {
                var ret;
                if(pref == null || pref.length == 0){
                    ret = {"distancia": 20,
                        "edadMin": 18,
                        "edadMax": 65,
                        "generoBusqueda": "m",
                        "mostrarDistancia": true
                    }
                }
                else{
                    if(pref[0].edadMax == 8000)
                        pref[0].edadMax = 65;
                    ret = pref[0];
                }
                respuesta = swig.renderFile('views/panels/personalizaPreferenciasSC.html',{
                    preferencias: ret
                });
                res.send(respuesta);
            })

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