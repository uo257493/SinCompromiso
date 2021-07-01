$(window).on("load", function(event) {
    //Indicamos la opcion en que estamos
    document.getElementById("abreChat").classList.remove("botonColorized");
    document.getElementById('abreChat').classList.add("botonColorized");
    document.getElementById('abrePerfil').classList.remove("botonColorized");
    document.getElementById("abreSistemaEnlaces").classList.remove("botonColorized");
    document.getElementById("containerG").style = "width:100%; margin-right:5px !important; margin-left:5px !important;"
    ////////////////////////////////////////////////////////////////////////////////////////////////////

});
$(document).ready(function () {



    //Funcion en delegacion de eventos, nos permite disparar eventos en los elementos creados dinamicamente
    $(document).on('click', "[name='conversaAb']", function () {
        var indiceOrigen = $(this).attr('id').replace('#', '');


        location.href = "/app/conversacion/"+indiceOrigen;})

});


setInterval(async function (){
    await manejarSSChatPrev();
},7000);


function manejarSSChatPrev() {
    $.ajax({
        url: "/app/recargaMensajesPrev",
        method: "PUT",
        success:  function (response) {
            if(response == null)
                return;
            toAppendPendientes = ""
            for(var i = 0; i< response.pendientes.length; i++){
                var pendiente = response.pendientes[i];
                toAppendPendientes += '<img alt="Imagen principal del enlace" name="conversaAb" id="' +pendiente.userID+'" class="roundedImages2" srcset="'+pendiente.imagenPrincipal +' 2.5x" style="margin-right: 10px"/>\n';
            }
            toAppendPendientes += '<p style="border-bottom: 10px"></p>'
            document.getElementById( "conversasNoAbiertasSC" ).innerHTML = toAppendPendientes;
            var toAppendAbiertas = "";
            for(var i = 0; i< response.abiertas.length; i++){
                var abierta = response.abiertas[i];
                toAppendAbiertas+= ' <div name="conversaAb" id="'+abierta.userID+'" style="border-bottom: 2px solid lightgrey; display:grid; grid-template-columns: 180px 300px 300px; margin-top: 10px; height: 180px">\n' +
                    '        <img  alt="Imagen principal del enlace" class="roundedImages" srcset="'+abierta.imagenPrincipal +' 2.5x" style="margin-left:20px; margin-right: 20px"/>\n' +
                    '        <h3 style="text-align: center;padding-top: 15%"><b>'+abierta.nombre +','+ abierta.edad +' </b></h3>'
                if (abierta.ultimoMensajeSender == "yo"){
                    toAppendAbiertas += '<h3 style="text-align: left; padding-top: 15%">▶ '+abierta.ultimoMensaje+'</h3>'
                } else {
                    toAppendAbiertas+= '<h3 style="text-align: left; padding-top: 15%">'+abierta.ultimoMensaje +'</h3>'
                }

                toAppendAbiertas += ' </div>';
            }


            document.getElementById("conversasAbiertasSC").innerHTML = toAppendAbiertas;
        },
        error: function (request, status, errorThrown) {

        }
    });
}