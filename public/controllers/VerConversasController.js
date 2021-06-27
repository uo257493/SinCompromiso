var ultimaRecarga;
$(window).on("load", function(event) {
    //Indicamos la opcion en que estamos
    ultimaRecarga = Date.now();
    document.getElementById('abreChat').classList.add("botonColorized");
    document.getElementById('abrePerfil').classList.remove("botonColorized");
    document.getElementById("abreSistemaEnlaces").classList.remove("botonColorized");
    document.getElementById("containerG").style = "width:99.5%; margin-right:5px !important; margin-left:5px !important; padding-left:0px !important; padding-right:0px !important; height:75%;";
    document.getElementsByClassName("navbar navbar-light")[0].style = "background-color: #f40b51; margin-bottom: 0px !important; height:25%";
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    scrollToBottom();

});
$(document).ready(function () {

    $("[name='cuadroOtroP']").click(function(){
        var indiceOrigen = $(this).attr('id').replace('#', '');


        location.href = "/app/perfil/"+indiceOrigen;
    });


    $("#enviaElMsgC").click(function(){
        var mensaje = document.getElementById("cuadroMensajeC").value;
        if(mensaje.trim() == "")
            return;
        document.getElementById("cuadroMensajeC").value = "";

        $.ajax({
            url: "/app/subeMensaje",
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({"contenido": mensaje, "receptor":document.getElementsByName("cuadroOtroP")[0].id}),

            success:  function (response) {
                var newMsg = '<div class="container" style="margin-right: 0px !important; padding-left:0px !important">\n' +
                    '                <div class="sender">\n' +
                    '                        <p class="senderP" style="word-break: break-word">'+ mensaje+'</p>\n' +
                    '                </div>\n' +
                    '    </div>'
                $( "#contenedorDeMensajes" ).append(newMsg);
                scrollToBottom();
            },
            error: function (request, status, errorThrown) {

            }
        });
    });
   });

setInterval(async function (){
   await manejarSSChat();
},5000);

async function manejarSSChat(){
    var tiempoUltimo  = ultimaRecarga;
    ultimaRecarga = Date.now();
    $.ajax({
        url: "/app/recargaMensajes",
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({"momento": tiempoUltimo, "compa":document.getElementsByName("cuadroOtroP")[0].id}),

        success:  function (response) {
            if(response == null)
                return;
            for(var i = 0; i< response.length; i++){
                var newMsg = '<div class="container" style="margin-left: 0px !important; padding-right:0px !important">\n' +
                    '                <div class="receiver">\n' +
                    '                        <p class="receiverP" style="word-break: break-word">'+ response[i].contenido+'</p>\n' +
                    '                </div>\n' +
                    '    </div>'
                $( "#contenedorDeMensajes" ).append(newMsg);
            }

        },
        error: function (request, status, errorThrown) {

        }
    });
}

function scrollToBottom() {
    var elemntoAScrollar = document.getElementById("contenedorDeMensajes");
    elemntoAScrollar.scrollTop = elemntoAScrollar.scrollHeight;
}