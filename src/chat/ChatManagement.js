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
        var partnerID = req.query.idConversa;
        var estaRegistrado = !false; //dao.estaRegistrado();
        var respuesta = null;
        if (!estaRegistrado) {
            res.redirect("/registro/sinCompromiso");
            return;
        } else {
            console.log(partnerID);
            respuesta = swig.renderFile('views/panels/ChatSC.html', {
                conversaciones: null
            });
        }
    });
}