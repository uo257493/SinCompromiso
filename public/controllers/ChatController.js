$(document).ready(function () {
    window.addEventListener("load", function (event) {
        //Indicamos la opcion en que estamos
        document.getElementById('abreChat').classList.add("botonColorized");
        document.getElementById('abrePerfil').classList.remove("botonColorized");
        document.getElementById("abreSistemaEnlaces").classList.remove("botonColorized");
        document.getElementById("containerG").style = "width:100%; margin-right:5px !important; margin-left:5px !important;"
        ////////////////////////////////////////////////////////////////////////////////////////////////////

    });
    $("[name='conversaAb']").click(function(){
        var indiceOrigen = $(this).attr('id').replace('#', '');
        console.log(indiceOrigen);

        location.href = "/app/conversacion/"//+indiceOrigen;
        // $.ajax({
        //         type: "GET",
        //         url: "/app/conversacion",
        //         headers:{},
        //         data: {"idConversa" : indiceOrigen},
        //         dataType: "json",
        //
        //         success: function (response) {
        //             console.log(response);
        //         },
        //         error: function (request, status, errorThrown) {
        //             alert(errorThrown);
        //         }
        //     });
    });
});