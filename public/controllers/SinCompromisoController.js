$(document).ready(function () {
    window.addEventListener("DOMContentLoaded", function(event) {


    });
    $("#abrePerfil").click(async () => {
        location.href = "/app/perfil";
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

    $("#hazmeLogout").click(async () => {
       $.ajax({
            type: "POST",
            url: "desconectarse",
            success: function (response) {
            },
            error: function (request, status, errorThrown) {
                alert(errorThrown);
            }
        });
        //console.log(await (await fetch('./views/registroSC.html')).text());
    });
});