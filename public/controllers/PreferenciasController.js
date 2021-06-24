$(window).on("load", function(event) {
    //Indicamos la opcion en que estamos
    document.getElementById('abrePerfil').classList.add("botonColorized");
    document.getElementById('abreSistemaEnlaces').classList.remove("botonColorized");
    document.getElementById("abreChat").classList.remove("botonColorized");
    document.getElementsByClassName("slider-text-max")[1].innerHTML = "65+"; //Modificamos la etiqueta de edad a 65+
    document.getElementsByClassName("slider-text-max")[0].innerHTML = "150 km"; //Modificamos la etiqueta de distancia a 150km
    document.getElementsByClassName("slider-text-min")[0].innerHTML = "1 km"; //Modificamos la etiqueta de distancia a 150km
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    document.getElementById("scgeneroop").value = document.getElementById("chuletaGen").textContent
    document.getElementById("mostrarDistanciasPB").checked = ("true" ==document.getElementById("chuletaBoton").textContent);
});
$(document).ready(function () {

    $("#guardarPreferencias").click(function(){
        var distancia = document.getElementById("sliderDistancia").value
        var edades = document.getElementById("sliderEdad").value
        var edadMin = edades.split(", ")[0]
        var edadMax = edades.split(", ")[1]
        var generoBusqueda = document.getElementById("scgeneroop").value;
        var mostrarDistancia = document.getElementById("mostrarDistanciasPB").checked;

        var misPreferencias = new Object();
        misPreferencias.distancia = distancia;
        if(edadMax == "65")
            misPreferencias.edadMax = "8000";
        else
            misPreferencias.edadMax = edadMax;
        misPreferencias.generoBusqueda = generoBusqueda;
        misPreferencias.edadMin = edadMin;
        misPreferencias.mostrarDistancia = mostrarDistancia;



        $.ajax({
            url: "/app/preferencias",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({"preferencias": misPreferencias}),

            success:  function (response) {
              location.href = "/app/perfil";
            },
            error: function (request, status, errorThrown) {

            }
        });


    });


});