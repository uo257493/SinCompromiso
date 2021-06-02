$(document).ready(function () {

    $("#registrar").click(async function(){
        var bio = document.getElementById("scbiografiaor").value;
        var name = document.getElementById("scnameor").value;
        var birth = document.getElementById("scfcnacor").value;
        var gender = document.getElementById("scgeneroor").value;

        if(getAge(birth) <18 ||  birth.trim() == "") {
            alert("La fecha de nacimiento es obligatoria y debes ser mayor de edad")
            return ;
        }
        if( name.length>15 || name.trim().length <3) {
            alert("El nombre debe contener entre 3 y 15 caracteres");
            return;
        }
        if(bio.length > 500) {
            alert("El tamaño maximo de la biografia es de 500 caracteres")
            return ;
        }
        else{
            $.ajax({
                    url: "/app/registrarse",
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    data: JSON.stringify({"name": name, "gender":gender, "birth": birth, "bio": bio}),

                    success: function (response) {
                        location.href = response;
                    },
                    error: function (request, status, errorThrown) {
                        alert(errorThrown);
                    }
                });
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