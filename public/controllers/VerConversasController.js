
$(document).ready(function () {
    window.addEventListener("load",  function() {
        //Indicamos la opcion en que estamos

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