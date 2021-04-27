// Button listeners

$(document).ready(function() {
    $("#abrePerfil").click(() => {
        document.getElementById('abrePerfil').classList.add("botonColorized");
        document.getElementById('abreSistemaEnlaces').classList.remove("botonColorized");
        document.getElementById("abreChat").classList.remove("botonColorized");
    });


    $("#abreSistemaEnlaces").click(function () {

        document.getElementById('abreSistemaEnlaces').classList.add("botonColorized");
        document.getElementById('abrePerfil').classList.remove("botonColorized");
        document.getElementById("abreChat").classList.remove("botonColorized");
    });

    $("#abreChat").click(function () {

        document.getElementById('abreChat').classList.add("botonColorized");
        document.getElementById('abrePerfil').classList.remove("botonColorized");
        document.getElementById("abreSistemaEnlaces").classList.remove("botonColorized");
    });

});