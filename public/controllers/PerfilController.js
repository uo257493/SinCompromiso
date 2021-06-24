$(document).ready(function () {
    window.addEventListener("load", function(event) {
        //Indicamos la opcion en que estamos
        document.getElementById('abrePerfil').classList.add("botonColorized");
        document.getElementById('abreSistemaEnlaces').classList.remove("botonColorized");
        document.getElementById("abreChat").classList.remove("botonColorized");
        ////////////////////////////////////////////////////////////////////////////////////////////////////

    });
    $("#abrePreferencias").click(async () => {


        location.href = "/app/preferencias";

    });
    $("#abreEditarPerfil").click(async () => {


        location.href = "/app/personaliza";

    });
});