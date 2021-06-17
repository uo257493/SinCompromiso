const auth = require('solid-auth-client')
const linq = require("linq");
var linqjs = require('linqjs');
var cryptox = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'bh58lkif';


module.exports = function(app, swig, mongoDao, podDao){

app.put('/app/subeMensaje', async function (req, res) {
    var contenido = req.body.contenido;
    var receptor = req.body.receptor;

    await podDao.subeMensaje(contenido, receptor);
    res.end();
})

app.get('/app/chat', async function (req, res) {

    var estaRegistrado = await podDao.isRegistered()
    var respuesta = null;
    if(!estaRegistrado) {
        res.redirect("/registro/sinCompromiso");
        return;
    }
    else{
        var enlaces = (await podDao.leeEnlaces()).enlaces;
        var conversaciones = new Object();
        conversaciones.pendientes = [];
        conversaciones.abiertas = [];
        for(var i = 0; i< enlaces.length; i++){
           var temC = await podDao.getFullChat(enlaces[i]);
           var usuario = await podDao.leeOtroPod(enlaces[i]);
           var sorted = linq.from(temC).orderBy(function (m) {
               return m.timestamp;
           }).toArray();

           var miniatura = new Object();
           miniatura.nombre = usuario.name;
           miniatura.userID = usuario.userId;
           if(usuario.cantidadImagenes >0)
                miniatura.imagenPrincipal = usuario.imagenes[0];
           else
               miniatura.imagenPrincipal = "../media/noPic.png"

            if(sorted.length == 0){
                conversaciones.pendientes.push(miniatura);
            }
            else{
                miniatura.edad = getAge(usuario.birth)
                miniatura.ultimoMensaje = sorted[sorted.length-1].contenido;
                if(miniatura.ultimoMensaje.length > 28) //Lo cortamos a los 28 caracteres
                    miniatura.ultimoMensaje = miniatura.ultimoMensaje.slice(0, 25) + "...";
                if(sorted[sorted.length-1].sender == usuario.userId)
                    miniatura.ultimoMensajeSender = "el"
                else
                    miniatura.ultimoMensajeSender = "yo"

                conversaciones.abiertas.push(miniatura);
            }

        }

        respuesta = swig.renderFile('views/panels/ChatSC.html',{
            conversaciones: conversaciones
        });
    }

    res.send(respuesta);
});


    app.get('/app/conversacion/:idConversacion', async function (req, res) {
        var partnerID = req.params.idConversacion;
        var estaRegistrado = await podDao.isRegistered()
        var respuesta = null;
        var usuario = await podDao.leeOtroPod(partnerID);
        var temC = await podDao.getFullChat(partnerID);
        var sorted = linq.from(temC).orderBy(function (m) {
            return m.timestamp;
        }).toArray();
        sorted = sorted.select(function (t) {
            if(t.sender == partnerID)
                t.sender = "el"
            else
                t.sender = "yo";
            return t;
        })
        var conversacion = new Object();

        var enlace = new Object();
        enlace.nombre = usuario.name;
        enlace.edad = getAge(usuario.birth);
        if(usuario.cantidadImagenes >0)
            enlace.imagenPrincipal = usuario.imagenes[0];
        else
            enlace.imagenPrincipal = "/media/noPic.png"
        enlace.userID = partnerID;
        conversacion.mensajes = sorted;
        if (!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        } else {
            respuesta = swig.renderFile('views/panels/Conversacion.html', {
                conversacion : conversacion,
                enlace:enlace
            });
            res.send(respuesta);
        }
    });

    app.get('/app/perfil/:idUsuario', async function (req, res) {
        var partnerID = req.params.idUsuario;
        var estaRegistrado = await podDao.isRegistered()
        if (!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        }



        else {
            var tienenEnlace = await podDao.tienenEnlace(partnerID);

            var respuesta = null;
            var conversacion = new Object();
            if (tienenEnlace) {
                var user  = await podDao.leeOtroPod(partnerID);
                var enlace = new Object();
                enlace.nombre = user.name;
                enlace.edad = getAge(user.birth);
                var suLoc = podDao.getLocationOtroPerfil(partnerID);
                var miLocation = await podDao.getLocationOtroPerfil(podDao.getUserId());
                var milat;
                var milong;
                if (miLocation != "") {
                    milat = parseFloat(decrypt(miLocation.a))
                    milong = parseFloat(decrypt(miLocation.b))
                }

                var suLocation = await podDao.getLocationOtroPerfil(partnerID);
                var sulat;
                var sulong;
                if (suLocation != "") {
                    sulat = parseFloat(decrypt(suLocation.a))
                    sulong = parseFloat(decrypt(suLocation.b))
                }

                if(suLocation != "" && miLocation != "")
                    enlace.distancia = getKilometros(milat, milong, sulat, sulong);
                else
                    enlace.distancia = "X";

                enlace.biografia= user.bio;
                enlace.imagenes = user.imagenes;
                enlace.cantidadImagenes = user.cantidadImagenes;
                enlace.esMeMola = false;//Actualmente el mensaje de me mola existe hasta el momento del enlace
                respuesta = swig.renderFile('views/panels/verPerfilSC.html', {
                    enlace: enlace
                });
                res.send(respuesta);
            }
            else
                res.redirect("app/chat")
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

    function getKilometros(lat1,lon1,lat2,lon2)
    {
        rad = function(x) {return x*Math.PI/180;}
        var R = 6378.137; //Radio de la tierra en km
        var dLat = rad( lat2 - lat1 );
        var dLong = rad( lon2 - lon1 );
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d.toFixed(3); //Retorna tres decimales
    }


    function decrypt(text){
        if(text == undefined)
            return "";
        var decipher = cryptox.createDecipher(algorithm,password)
        var dec = decipher.update(text+"",'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
}