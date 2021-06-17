var ultimaRecarga;
$(document).ready(function () {
    window.addEventListener("load",  function() {
        //Indicamos la opcion en que estamos
    ultimaRecarga = Date.now();
        document.getElementById('abreChat').classList.add("botonColorized");
        document.getElementById('abrePerfil').classList.remove("botonColorized");
        document.getElementById("abreSistemaEnlaces").classList.remove("botonColorized");
        document.getElementById("containerG").style = "width:99.5%; margin-right:5px !important; margin-left:5px !important; padding-left:0px !important; padding-right:0px !important; height:75%;";
        document.getElementsByClassName("navbar navbar-light")[0].style = "background-color: #f40b51; margin-bottom: 0px !important; height:25%";
        ////////////////////////////////////////////////////////////////////////////////////////////////////


    });
    $("[name='cuadroOtroP']").click(function(){
        var indiceOrigen = $(this).attr('id').replace('#', '');
        console.log(indiceOrigen);

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
            },
            error: function (request, status, errorThrown) {
                alert(errorThrown);
            }
        });
    });
   });

setInterval(function (){
    manejarSSEnlaces();
},10000);

function manejarSSEnlaces(){
    //Leer si hay alguno, ya la peticion redirigira
    //Si no meter la mask
    // if(hayAlgo=="false") {
    //     $.ajax({
    //         url: "/app/visitaSSE",
    //         type: "POST",
    //         success: function (respuesta) {
    //             console.log("Visitamos el SSE")
    //         },
    //         error: function (error) {
    //             console.log(error)
    //         }
    //     });
    // }
}