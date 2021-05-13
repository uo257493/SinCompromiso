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

    $("#imgupload").change(function(evt) {
        var files = evt.target.files;
        var file = files[0];

        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById(indiceOrigen).srcset = e.target.result + " 50x";
                ResizeImage();
            };
            reader.readAsDataURL(file);
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

function ResizeImage() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imgupload').files;
        var file = filesToUploads[0];
        if (file) {

            var reader = new FileReader();
            // Set the image once loaded into file reader
            reader.onload = function(e) {

                var img = document.createElement("img");
                img.src = e.target.result;

                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var MAX_WIDTH = 400;
                var MAX_HEIGHT = 400;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width != MAX_WIDTH) { //Si no cumple redimensiona
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height != MAX_HEIGHT) { //Si no cumple redimensiona
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                console.log(width + " " + height)
                dataurl = canvas.toDataURL(file.type);
                // if(width > height && width <= 400) { // Si es menor a 200 px calculamos ajuste
                //     var ajuste = 1 /(200 / width)
                //     document.getElementById(indiceOrigen).srcset = dataurl +" "+ ajuste +"x";
                // }
                // else if(width <= height && height <= 400) { // Si es menor a 200 px calculamos ajuste
                //     var ajuste = 1 /(200 / height)
                //     document.getElementById(indiceOrigen).srcset = dataurl +" "+ ajuste +"x";
                // } //El ajuste es = 100 / ((maxDimDelHTML / maxDimDeImagen)*100)
                // else //Reducelo a la mitad
                    document.getElementById(indiceOrigen).srcset = dataurl + " 2x";
            }
            reader.readAsDataURL(file);

        }

    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}