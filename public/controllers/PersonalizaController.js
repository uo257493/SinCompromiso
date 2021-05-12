var indiceOrigen;
$(document).ready(function () {
    window.addEventListener("load", function(event) {
        //Indicamos la opcion en que estamos
        document.getElementById('abrePerfil').classList.add("botonColorized");
        document.getElementById('abreSistemaEnlaces').classList.remove("botonColorized");
        document.getElementById("abreChat").classList.remove("botonColorized");
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log("{{perfil.nombre}}");

    });
    $("img").click(function(){
        indiceOrigen = $(this).attr('id').replace('#', '');
        $('#imgupload').trigger('click');
    });
    $("#abreEditarPerfil").click(async () => {

        console.log("Abriendo editar perfil");
        location.href = "/app/personaliza";

    });

    $("#imgupload").change(function(e) {

        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

            var file = e.originalEvent.srcElement.files[i];
            var tipo = file.type;
            if(tipo.toLowerCase().includes("image")) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    document.getElementById(indiceOrigen).src = reader.result;
                }
                reader.readAsDataURL(file);
            }
            else{
                // Get the modal
                var modal = document.getElementById("modalAviso");

                modal.style.display = "block";
            }
        }
    });

    $("#spanModalP").click(function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        var modal = document.getElementById("modalAviso");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});