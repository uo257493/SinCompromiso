var numIm;
var imActual
var conmutador;
$(window).on("load", function(event) {
    //Indicamos la opcion en que estamos

    document.getElementById('abreChat').classList.add("botonColorized");
    document.getElementById('abrePerfil').classList.remove("botonColorized");
    document.getElementById("abreSistemaEnlaces").classList.remove("botonColorized");
    ////////////////////////////////////////////////////////////////////////////////////////////////////

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


});
$(window).ready(function () {

    $("#seeMoreB").click(function(){
        if(conmutador==undefined)
            conmutador = 1;
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