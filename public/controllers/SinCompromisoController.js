$(document).ready(function () {


    window.addEventListener("DOMContentLoaded", function(event) {

        location.href = "/app/perfil";
    });
    $("#abrePerfil").click(async () => {
        location.href = "/app/perfil";
    });


    $("#abreSistemaEnlaces").click(function () {

        location.href = "/app/enlaces";
    });

    $("#abreChat").click(function () {
        location.href="/app/chat";
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