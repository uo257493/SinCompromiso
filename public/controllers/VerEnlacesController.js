var numIm;
var imActual
var conmutador;
var hayAlgo;
$(document).ready(function () {
    window.addEventListener("load",  function() {
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
    $("#seeMoreB").click(function(){
        if(conmutador==1) {
            conmutador = 0;
            document.getElementById('verBioSSE').style.display='block';
            document.getElementById('seeMoreAi').classList.remove("fa-chevron-down");
            document.getElementById('seeMoreAi').classList.add("fa-chevron-up");
        }
        else{
            conmutador = 1;
            document.getElementById('verBioSSE').style.display='none';
            document.getElementById('seeMoreAi').classList.remove("fa-chevron-up");
            document.getElementById('seeMoreAi').classList.add("fa-chevron-down");
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
   });

setInterval(function (){
    manejarSSEnlaces();
},10000);

function manejarSSEnlaces(){
    //Leer si hay alguno, ya la peticion redirigira
    //Si no meter la mask
    if(hayAlgo=="false") {
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