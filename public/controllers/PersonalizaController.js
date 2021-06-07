var indiceOrigen;
var imagesModificadas;
var queModificamos;
$(document).ready(function () {
    $(window).on("load", function(event) {
        //Indicamos la opcion en que estamos
        document.getElementById('abrePerfil').classList.add("botonColorized");
        document.getElementById('abreSistemaEnlaces').classList.remove("botonColorized");
        document.getElementById("abreChat").classList.remove("botonColorized");
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        imagesModificadas = [false, false, false, false, false];
    });
    $("img").click(async function(){
        indiceOrigen = $(this).attr('id').replace('#', '');
       await $('#imgupload').trigger('click');
       checkNude(indiceOrigen);
    });
    $("#abreEditarPerfil").click(async () => {

        console.log("Abriendo editar perfil");
        location.href = "/app/personaliza";

    });

    $("#imgupload").change(function(evt) {
        var files = evt.target.files;
        var file = files[0];

        queModificamos = parseInt(indiceOrigen.replace("img", "").replace("P",""), 10);

        imagesModificadas[queModificamos] = true;

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
        var modal = document.getElementById("modalAviso");
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        var modal = document.getElementById("modalAviso");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    $("[name='fotoP']").on("load" ,function(){
        if(indiceOrigen != undefined)
            checkNude(indiceOrigen);
    });
    $("#guardar").click(function(){
        var bio = document.getElementById("scbiografiaop").value;
        var name = document.getElementById("scnameop").value;


        var img0 = document.getElementById("img0P").srcset.split(" ")[0];
        var img1 = document.getElementById("img1P").srcset.split(" ")[0];
        var img2 = document.getElementById("img2P").srcset.split(" ")[0];
        var img3 = document.getElementById("img3P").srcset.split(" ")[0];
        var img4 = document.getElementById("img4P").srcset.split(" ")[0];
        var prev = [img0, img1, img2, img3, img4];


        var images = [];
        var nameImgs = [];
        for(var i=0; i< prev.length; i++){
            if(imagesModificadas[i]){
                var myImData =prev[i].split(',')[0];
                var myIm = prev[i].replace(myImData+",",'');
                var imageName = "img"+i+"."+myImData.replace("data:image/", '').replace(';base64','')
                var fullImage = new Object();
                fullImage.content = myIm;
                fullImage.name = imageName;
                images.push(fullImage);
                nameImgs.push(imageName);
                checkNude("img"+i+"P");
                if(document.getElementById("img"+i+"P").srcset == "../../media/addPic.png 2x")
                    return;
            }

        }


        if( name.length>15 || name.trim().length <3) {
            showModal("El nombre debe contener entre 3 y 15 caracteres");
            return;
        }
        if(bio.length > 500) {
            showModal("El tamaño maximo de la biografia es de 500 caracteres")
            return ;
        }
        else{
            $.ajax({
                url: "/app/personalizar",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({"name": name, "bio": bio, "images": nameImgs}),

                success: function (response) {
                    $.each(images, function (i, image) {
                        $.ajax({
                            url: "/app/updateImagen",
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            data: JSON.stringify({"image": image}),

                            success: function (response) {
                                console.log("Subida foto");
                            },
                            error: function (request, status, errorThrown) {
                                alert(errorThrown);
                            }
                        });
                        location.href = response;
                    })

                    location.href = response;
                },
                error: function (request, status, errorThrown) {
                    alert(errorThrown);
                 }
            });
        }

    });

});

function ResizeImage() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imgupload').files;
        var file = filesToUploads[0];
        if(!file.type.includes("image")){
            document.getElementById(indiceOrigen).srcset = "../../media/addPic.png 2x"
            showModal("Tipo de formato invalido");
            return;
        }
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
                checkNude(indiceOrigen);
            }
            reader.readAsDataURL(file);

        }

    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}

async function checkNude(node) {
    await nude.load(node);
    // Scan it
    await nude.scan(function(result){
        console.log(result);
        if(result) {

            imagesModificadas[queModificamos] = false;
            document.getElementById(node).srcset = "../../media/addPic.png 2x"
            showModal("No se permiten desnudos");
        }
    });
}

function showModal(msg) {
    document.getElementById("modalAviso").style.display = "block";
    document.getElementById("modalMsg").innerHTML= msg;
}