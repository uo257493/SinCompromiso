module.exports = function(app, swig, gestorBD, session){
app.get('/app/enlaces', function (req, res) {
    var estaRegistrado = !false; //dao.estaRegistrado();
    var respuesta = null;
    if(!estaRegistrado) {
        res.redirect("/registro/sinCompromiso");
        return;
    }
    else{
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
        respuesta = swig.renderFile('views/panels/verEnlacesSC.html',{
            enlace: enlace
        });
    }

    res.send(respuesta);


});


}