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


    app.get('/app/conversacion', async function (req, res) {
        var partnerID = req.params.idConversa;
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
        mensajeB.contenido = "Hola "
        conversacion.mensajes = [mensajeA, mensajeB, mensajeA];
        if (!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        } else {
            respuesta = swig.renderFile('views/panels/Conversacion.html', {
                conversacion : conversacion
            });
            res.send(respuesta);
        }
    });
}