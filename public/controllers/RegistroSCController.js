var indiceOrigen;


$(document).ready(function () {

    $("#registrar").click(function(){
        var bio = document.getElementById("scbiografiaor").value;
        var name = document.getElementById("scnameor").value;
        var birth = document.getElementById("scfcnacor").value;
        var gender = document.getElementById("scgeneroor").value;


        var img0 = document.getElementById("img0R").srcset.split(" ")[0];
        var img1 = document.getElementById("img1R").srcset.split(" ")[0];
        var img2 = document.getElementById("img2R").srcset.split(" ")[0];
        var img3 = document.getElementById("img3R").srcset.split(" ")[0];
        var img4 = document.getElementById("img4R").srcset.split(" ")[0];
        var prev = [img0, img1, img2, img3, img4];


        var images = [];
        var nameImgs = [];
        for(var i=0; i< prev.length; i++){
            if(prev[i].trim() != "" && prev[i].trim() != "../../media/addPic.png"){
                var myImData =prev[i].split(',')[0];
                var myIm = prev[i].replace(myImData+",",'');
                var imageName = "img"+images.length+"."+myImData.replace("data:image/", '').replace(';base64','')
                var fullImage = new Object();
                fullImage.content = myIm;
                fullImage.name = imageName;
                images.push(fullImage);
                nameImgs.push(imageName);
            }

        }


        if(getAge(birth) <18 ||  birth.trim() == "") {
            showModal("La fecha de nacimiento es obligatoria y debes ser mayor de edad")
            return ;
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
                    url: "/app/registrarse",
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    data: JSON.stringify({"name": name, "gender":gender, "birth": birth, "bio": bio, "images": nameImgs}),

                    success: function (response) {
                            $.each(images, function (i, image) {
                                $.ajax({
                                    url: "/app/subeImagen",
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    data: JSON.stringify({"image": image}),

                                    success: function (response) {

                                    },
                                    error: function (request, status, errorThrown) {

                                    }
                                });
                            })

                        location.href = response;
                    },
                    error: function (request, status, errorThrown) {

                    }
                });
        }

    });

    $("[name='fotoR']").click(function(){
        indiceOrigen = $(this).attr('id').replace('#', '');
        $('#imgupload').trigger('click');
    });

    $("[name='fotoR']").on("load" ,function(){
        if(indiceOrigen != undefined && indiceOrigen != null)
                checkNude(indiceOrigen);
    });

    $("#imgupload").change(async function(evt) {


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
        var modal = document.getElementById("modalAviso");
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        var modal = document.getElementById("modalAviso");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

});

function getAge(dateString) {
    var today = new Date();
    //var birthDate = new Date(dateString.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$3/$2/$1"));
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


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

async function checkNude(node) {
   await nude.load(node);
    // Scan it
    var result = await nude.scan(function(result){

        if(result) {
            document.getElementById(node).srcset = "../../media/addPic.png 2x"

            showModal("No se permiten desnudos");
        }
    } );
}

function showModal(msg) {
    document.getElementById("modalAviso").style.display = "block";
    document.getElementById("modalMsg").innerHTML= msg;
}