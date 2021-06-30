$(document).ready(function () {


    window.addEventListener("DOMContentLoaded", function(event) {

        location.href = "/app/perfil";
    });
    $("#abrePerfil").click(async () => {
        location.href = "/app/perfil";
    });
    $("#dameManual").click(async () => {
        window.open("/media/Manualusuario.pdf")
    });


    $("#abreSistemaEnlaces").click(function () {

        location.href = "/app/enlaces";
    });

    $("#abreChat").click(function () {
        location.href="/app/chat";
    });
    $("#spanModalPEnlace2").click(function() {
        var modal = document.getElementById("modalAvisoEnlace2");
        modal.style.display = "none";
    });
    $("#hazmeLogout").click(async () => {
       $.ajax({
            type: "POST",
            url: "/logout",
            success: function (response) {
                location.href = response;
            },
            error: function (request, status, errorThrown) {

            }
        });
    });

    setInterval(obtenPos,90000) //Localiza pasado minuto y medio

    setInterval(creaTodosLosEnlacesNecesarios(), 60000); //Mira a ver si hay que crear enlaces cada minutos

    function creaTodosLosEnlacesNecesarios() {
        $.ajax({
            type: "POST",
            url: "/app/chequeaEnlaces",

            success: function (response) {
                if(response){
                    document.getElementById("abreChat").classList.add("matchMade");
                    showModalEnlaceBis("Tienes un nuevo enlace!!!");
                }
            },
            error: function (request, status, errorThrown) {

            }
        });
    }

    function obtenPos() {
        navigator.geolocation.getCurrentPosition(function(res){
            var ts = {"latitude": res.coords.latitude,
            "longitude": res.coords.longitude}
            $.ajax({
                type: "POST",
                url: "/app/localiza",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(ts),
                success: function (response) {

                },
                error: function (request, status, errorThrown) {

                }
            });});
    }
});


function showModalEnlaceBis(msg) {
    document.getElementById("modalAvisoEnlace2").style.display = "block";
    document.getElementById("modalMsgEnlace2").innerHTML= msg;
}