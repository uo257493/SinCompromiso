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
             document.getElementById('seeMoreB').innerHTML = "VER MENOS";
        }
        else{
            conmutador = 1;
            document.getElementById('verBioSSE').style.display='none';
            document.getElementById('denunciarPerfilSSE').style.display='none';
            document.getElementById('bloquearPerfilSSE').style.display='none';
            document.getElementById('seeMoreB').innerHTML = "VER MAS";

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

            }
        });
        document.getElementById("motivoDenunciaSSE").value = "";
        document.getElementById("seeMoreB").click();
        showModalEnlaceBis("Se ha denunciado al usuario");
    });
    $("#spanModalPEnlace").click(function() {
        var modal = document.getElementById("modalAvisoEnlace");
        modal.style.display = "none";
        location.href = "/app/enlaces"
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

      $("#pasoB").click(function(){
        var paso =  document.getElementById("idDelPosE").textContent;
        $.ajax({
            url: "/app/paso",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({"paso": paso}),

            success: function (response) {
                if(response)
                    location.href = "/app/enlaces"
            },
            error: function (request, status, errorThrown) {

            }
        });
    });

    $("#bloquearPerfilSSE").click(function(){
        var bloqueo =  document.getElementById("idDelPosE").textContent;
        $.ajax({
            url: "/app/bloqueo",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({"bloqueo": bloqueo}),

            success: function (response) {
                if(response)
                    location.href = "/app/enlaces"
            },
            error: function (request, status, errorThrown) {

            }
        });
    });
    $("#meGustaB").click(function(){
        var like =  document.getElementById("idDelPosE").textContent;
        $.ajax({
            url: "/app/meGusta",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({"like": like}),

            success: function (response) {
                if(response){
                    document.getElementById("abreChat").classList.add("matchMade");
                    showModalEnlace("Tienes un nuevo enlace!!!")
                }
                else
                    location.href = "/app/enlaces"
            },
            error: function (request, status, errorThrown) {

            }
        });
    });


    $("#enviarMensajeMeMola").click(function(){
        var meMola =  document.getElementById("idDelPosE").textContent;
        var mensaje = document.getElementById("mensajeMeMola").value;
        $.ajax({
            url: "/app/meMola",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({"meMola": meMola, "mensaje": mensaje}),

            success: function (response) {
                if(response){
                    document.getElementById("abreChat").classList.add("matchMade");
                }
                    location.href = "/app/enlaces"
            },
            error: function (request, status, errorThrown) {

            }
        });
    });
   });

setInterval(function (){
    manejarSSEnlaces();
},45000);

function manejarSSEnlaces(){
    if(hayAlgo != "true")
        document.getElementById("abreSistemaEnlaces").click();
}

function showModalEnlace(msg) {
    document.getElementById("modalAvisoEnlace").style.display = "block";
    document.getElementById("modalMsgEnlace").innerHTML= msg;
}

function showModalEnlaceBis(msg) {
    document.getElementById("modalAvisoEnlace2").style.display = "block";
    document.getElementById("modalMsgEnlace2").innerHTML= msg;
}