const auth = require('solid-auth-client')
const linq = require("linq");


module.exports = function(app, swig, mongoDao, podDao){

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
        console.log(partnerID);
        var estaRegistrado = !false; //dao.estaRegistrado();
        var respuesta = null;
        var conversacion = new Object();

        var enlace = new Object();
        enlace.nombre = "Martina";
        enlace.edad = 25;
        enlace.imagenPrincipal = "../../media/output.png";
        enlace.userID = partnerID;
       var mensajeA = new Object();
        mensajeA.sender = "yo";
        mensajeA.contenido = "Hola (Hola)\n" +
            "No sé si te acuerdas de mí (De mí)\n" +
            "Hace tiempo no te veo por ahí (Por ahí)\n" +
            "Soy yo (Soy yo)\n" +
            "El que siempre le hablaba de ti (-ba de ti)\n" +
            "A tu mejor amiga pa' que me tire la buena (Buena)\n" +
            "Hola (Hola)\n" +
            "No sé si te acuerdas de mí (De mí) (Uh yeh)\n" +
            "Hace tiempo no te veo por ahí (Por ahí) (Uh yeh)\n" +
            "Soy yo (Soy yo)\n" +
            "El que siempre le hablaba de ti (-ba de ti)\n" +
            "A tu mejor amiga pa' que me tire la buena (Buena) (Uh yeh)\n" +
            "sadasdasd\n" +
            "Dime si tú me da' (Uh)lmslkkclsfc\n" +
            "Una oportunida' (Uh uh)";
       var mensajeB = new Object();
        mensajeB.sender = "manolo";
        mensajeB.contenido = "Hiljhsauihdkjashdklashdlashdflkasfhcscfsdcdshkvdskjvhdsjkvldskhvkjdsjhvkjdsahvkjhasdlkvjh chascnlkasjchashckasjcksajckljasb"
        conversacion.mensajes = [mensajeA, mensajeB, mensajeA, mensajeA, mensajeB, mensajeA];
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
        var tienenEnlace = true;
        console.log(partnerID);
        var estaRegistrado = !false; //dao.estaRegistrado();
        var respuesta = null;
        var conversacion = new Object();

        if (!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        }
        else {
            if (tienenEnlace) {
                var enlace = new Object();
                enlace.nombre = "Luis";
                enlace.edad = 32;
                enlace.distancia = 50;
                enlace.biografia= "One, Two, Three, ah!..." +
                    "Un niño divertido, graciosín y extrovertido" +
                    "y a todos suelo enfadar, Shinnosuke nunca para" +
                    "y no te dejará en paz." +
                    "Cuando hay que conquistar, soy todo un profesional, " +
                    "Soy un niño muy ligón, con la fuerza de un ciclón. " +
                    "Come on, baby. Come on Baby. El pimiento sabe muy mal " +
                    "mira que trompa, que pedazo de trompa " +
                    "trompa, trompa"
                enlace.imagenes = ["../../media/suarez.jpg","../../media/output.png","../../media/addPic.png"];
                enlace.cantidadImagenes = 3;
                enlace.esMeMola = false;
                respuesta = swig.renderFile('views/panels/verPerfilSC.html', {
                    enlace: enlace
                });
                res.send(respuesta);
            }
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