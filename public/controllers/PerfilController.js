$(document).ready(function () {
    window.addEventListener("load", function(event) {
        //Indicamos la opcion en que estamos
        document.getElementById('abrePerfil').classList.add("botonColorized");
        document.getElementById('abreSistemaEnlaces').classList.remove("botonColorized");
        document.getElementById("abreChat").classList.remove("botonColorized");
        ////////////////////////////////////////////////////////////////////////////////////////////////////

    });
    $("#abrePreferencias").click(async () => {

        console.log("Abriendo preferencias");
        location.href = "/app/preferencias";

    });
    $("#abreEditarPerfil").click(async () => {

        console.log("Abriendo editar perfil");
        location.href = "/app/personaliza";

    });
});