var numIm;
var imActual = 0;
var conmutador;
var hayAlgo;

$(window).on("load", function(event) {
    //Indicamos la opcion en que estamos


    document.getElementById('abreSistemaEnlaces').classList.add("botonColorized");
    document.getElementById('abrePerfil').classList.remove("botonColorized");
    document.getElementById("abreChat").classList.remove("botonColorized");
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    hayAlgo = document.getElementById('hayAlgo').textContent;
    if(hayAlgo == "true") {
        imActual = 0;
        //Obtener el numero de imagenes
        numIm = document.getElementById('cantidadFotosSE').textContent;
        if (numIm == 0) {
            document.getElementById('fotoDisplayE').src = "../../media/noPic.png";
            //Desactivar izquierda
            document.getElementById('enlacePicAnterior').disabled = true;
            document.getElementById('enlacePicSiguiente').disabled = true; //Desactivar dcha
            return;

        }
        conmutador = 1;//Esta contraido
        var img0 = document.getElementById("enlaceIm0E").textContent;

        document.getElementById('fotoDisplayE').src = img0;


        //Desactivar izquierda
        document.getElementById('enlacePicAnterior').disabled = true;
        if (numIm == 1)
            document.getElementById('enlacePicSiguiente').disabled = true; //Desactivar dcha
    }

});
$(window).ready(function () {

    $("#seeMoreB").click(function(){
        if(conmutador==undefined)
            conmutador = 1;
        if(conmutador==1) {
            conmutador = 0;
            document.getElementById('verBioSSE').style.display='block';
            document.getElementById('denunciarPerfilSSE').style.display='block';
            document.getElementById('bloquearPerfilSSE').style.display='block';
            document.getElementById('seeMoreAi').classList.remove("fa-chevron-down");
            document.getElementById('seeMoreAi').classList.add("fa-chevron-up");
        }
        else{
            conmutador = 1;
            document.getElementById('verBioSSE').style.display='none';
            document.getElementById('denunciarPerfilSSE').style.display='none';
            document.getElementById('bloquearPerfilSSE').style.display='none';
            document.getElementById('seeMoreAi').classList.remove("fa-chevron-up");
            document.getElementById('seeMoreAi').classList.add("fa-chevron-down");

            var elementosDenuncia = document.getElementsByName("cuadroDenunciaSSE");
            var i;
            for(i = 0; i< elementosDenuncia.length; i++)
                elementosDenuncia[i].style.display='none';
        }

    });

    $("#enlacePicAnterior").click(function(){
        document.getElementById('enlacePicSiguiente').disabled = false;
        if(imActual == 1) //Si estamos en la 1 y pasamos a la 0 lo deshabilitamos
            document.getElementById('enlacePicAnterior').disabled = true;
        imActual--;
        var imgTD = document.getElementById("enlaceIm"+imActual+"E").textContent;
        document.getElementById('fotoDisplayE').src = imgTD;

    });
    $("#enlacePicSiguiente").click(function(){
        document.getElementById('enlacePicAnterior').disabled = false;
        if(imActual == numIm-2) //Si estamos en la x -1 y pasamos a la ultima imagen lo deshabilitamos
            document.getElementById('enlacePicSiguiente').disabled = true;
        imActual++;
        var imgTD = document.getElementById("enlaceIm"+imActual+"E").textContent;
        document.getElementById('fotoDisplayE').src = imgTD;

    });

    $("#enviarDenunciaSSE").click(function () {
        var motivo = document.getElementById("motivoDenunciaSSE").value;
        var denunciado = document.getElementById("idDelPosE").textContent;

        $.ajax({
            url: "/app/denuncia",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({"motivo": motivo, "denunciado": denunciado}),

            success:  function (response) {

            },
            error: function (request, status, errorThrown) {
                alert(errorThrown);
            }
        });

    });

    var conmutadorDenuncias;
    $("#denunciarPerfilSSE").click(function(){
        if(conmutadorDenuncias == undefined)
            conmutadorDenuncias = 1;
        var elementosAOcultar = document.getElementsByName("cuadroDenunciaSSE");

        if(conmutadorDenuncias ==1){
            conmutadorDenuncias = 0;
            var i = 0;
            for(i = 0; i< elementosAOcultar.length; i++)
                 elementosAOcultar[i].style.display='block';
        }
        else {
            conmutadorDenuncias = 1;
            for(i = 0; i< elementosAOcultar.length; i++)
                elementosAOcultar[i].style.display='none';
        }

    });

    $("#meMolaB").click(function(){

        var elementosAMostrar = document.getElementsByName("cuadroMeMola");

        var i;
       for(i = 0; i< elementosAMostrar.length; i++)
                elementosAMostrar[i].style.display='block';

       var botonesADeshabilitar = document.getElementsByTagName("button");

        for(i = 0; i< botonesADeshabilitar.length; i++)
            botonesADeshabilitar[i].disabled  = true;
        document.getElementById("enviarMensajeMeMola").disabled = false;
    });

    $("#enviarMensajeMeMola").click(function(){
        var textoMensaje = document.getElementById("mensajeMeMola").value;
        console.log(textoMensaje);
        //Hacer tramites de envio
        location.href = "/app/enlaces";
    });
   });

setInterval(function (){
    manejarSSEnlaces();
},10000);

function manejarSSEnlaces(){
    //Leer si hay alguno, ya la peticion redirigira
    //Si no meter la mask
    if(document.getElementById('hayAlgo').textContent=="false" ) {
        $.ajax({
            url: "/app/visitaSSE",
            type: "POST",
            success: function (respuesta) {
                console.log("Visitamos el SSE")
            },
            error: function (error) {
                console.log(error)
            }
        });
    }
}