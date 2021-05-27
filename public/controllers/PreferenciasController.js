$(document).ready(function () {
    window.onload = function(event) {
        //Indicamos la opcion en que estamos
        document.getElementById('abrePerfil').classList.add("botonColorized");
        document.getElementById('abreSistemaEnlaces').classList.remove("botonColorized");
        document.getElementById("abreChat").classList.remove("botonColorized");
        document.getElementsByClassName("slider-text-max")[1].innerHTML = "65+"; //Modificamos la etiqueta de edad a 65+
        document.getElementsByClassName("slider-text-max")[0].innerHTML = "150 km"; //Modificamos la etiqueta de distancia a 150km
        document.getElementsByClassName("slider-text-min")[0].innerHTML = "1 km"; //Modificamos la etiqueta de distancia a 150km
        ////////////////////////////////////////////////////////////////////////////////////////////////////

    };
    $("#guardarPreferencias").click(function(){
        console.log("Holalllll");
    });
});