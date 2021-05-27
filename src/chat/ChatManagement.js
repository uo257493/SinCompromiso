const auth = require('solid-auth-client')


module.exports = function(app, swig, gestorBD, session){

app.get('/app/chat', async function (req, res) {
    auth.trackSession(session => {
        if (!session)
            console.log('The user is not logged in')
        else
            console.log(`The user is ${session.webId}`)
    })
    var estaRegistrado = !false; //dao.estaRegistrado();
    var respuesta = null;
    if(!estaRegistrado) {
        res.redirect("/registro/sinCompromiso");
        return;
    }
    else{
        var conversaciones = new Object();
        var enlaceNA1 = new Object();
        enlaceNA1.nombre = "Maria";
        enlaceNA1.userID = "10";
        enlaceNA1.imagenPrincipal = "../../media/output.png"
        var enlaceNA2 = new Object();
        enlaceNA2.nombre = "Martina";
        enlaceNA2.userID = "12";
        enlaceNA2.imagenPrincipal = "../../media/suarez.jpg"
        conversaciones.pendientes = [enlaceNA1, enlaceNA2];
        var enlace3 = new Object();
        enlace3.userID = "45";
        enlace3.nombre = "Manolo";
        enlace3.edad = 45;
        enlace3.ultimoMensaje = "Hola bb";
        enlace3.ultimoMensajeSender = "yo";
        enlace3.imagenPrincipal = "../../media/suarez.jpg";

        var enlace4 = new Object();
        enlace4.userID = "25";
        enlace4.nombre = "Jennifer Goland";
        enlace4.edad = 20;
        enlace4.ultimoMensaje = "saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadddddddddddddddqdeqwdrwrewfrewfewfeffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddddddddddddddddddddddaaaaaaaaaaaaaassssssssssssssss";
        if(enlace4.ultimoMensaje.length > 28) //Lo cortamos a los 28 caracteres
            enlace4.ultimoMensaje = enlace4.ultimoMensaje.slice(0, 25) + "...";

        enlace4.ultimoMensajeSender = "el";
        enlace4.imagenPrincipal = "../../media/output.png";

        conversaciones.abiertas = [enlace3, enlace4];
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
}