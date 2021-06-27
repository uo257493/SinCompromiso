$(window).on("load", function(event) {
    ejecucionPur(function (ree) {
        ejecucionPup(function (ree) {
            ejecucionPupp(function (ree) {
                ejecucionPUE(function (ree) {
                    ejecucionPUC(function (ree) {
                        PUR(purNombre, purBio, purfecha, purGenero, "PUX1", 500, true, function (ree) {
                            PUEM2("60d67e6809df6a0015937ede", 2, "PUX2", 4, 4, function (ree) {

                            })
                        })
                    });
                });
            });
        });
    });





});

function  ejecucionPUC(cb){
    PUC1(function (ree) {
        PUC2(function (ree) {
            PUCC("PUC3", "rosita.solidweb.org", "Hola caracola",["Hola caracola"],function (ree) {
                PUCC("PUC4", "rosita.solidweb.org", textmas500,["Hola caracola", textmas500.slice(0,499)],function (ree) {
                        cb(true);
                } )
            } )
        })
    })
}
var purNombre = "Pilar"
var purBio = "Esta es mi biografía"
var purfecha = "1998-03-15"
var purGenero = "f"

function ejecucionPur(cb){
    PUR("",purBio, purfecha, purGenero, "PUR1", 500, false, function (ree) {
        PUR("Pe",purBio, purfecha, purGenero, "PUR2", 500, false, function (ree) {
            PUR("Maria Jose Del Rosal Martinez",purBio, purfecha, purGenero, "PUR3", 500, false, function (ree) {
                PUR(purNombre, textmas500, purfecha, purGenero, "PUR4", 500, false, function (ree) {
                    PUR(purNombre, purBio, "", purGenero, "PUR5", 500, false, function (ree) {
                        PUR(purNombre, purBio, "2005-03-15", purGenero, "PUR6", 500, false, function (ree) {
                            PUR(purNombre, purBio, "Guadalajara", purGenero, "PUR7", 500, false, function (ree) {
                                PUR(purNombre, purBio, purfecha, "", "PUR8", 500, false, function (ree) {
                                    PUR(purNombre, purBio, purfecha, "palabra", "PUR9", 500, false, function (ree) {
                                        PUR(purNombre, purBio, purfecha, purGenero, "PUR10", "/app/perfil", true, function (ree) {
                                                cb(true);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });

        });
    });

}

//Accion 0-MG 1-MM 2-Nada
//Criterios 0-MG 1-MM 2-PASO 3-BLOCK 4-ENLACE 5-NADA
function ejecucionPUE(cb) {
    PUEP("60d67e6809df6a0015937ede", 1, "PUE1",2, 2, function () {
        PUEP("60d67e6809df6a0015937ede", 2, "PUE2",2, 5, function () {
            PUEG("60d67e6809df6a0015937ede", 1, "PUE3",4, 4, function () {
                PUEG("60d67e6809df6a0015937ede", 0, "PUE4", 4,4, function () {
                    PUEG("60d67e6809df6a0015937ede", 2, "PUE5", 0,5, function(){
                        PUEM("60d67e6809df6a0015937ede", 2, textmas500,"PUE6", 1,5, function(){
                            PUEB("60d67e6809df6a0015937ede", 0, "PUE7", 3,3, function(){

                                PUEM2("60d67e6809df6a0015937ede", 2, "PUE8", 3, 3, function(){

                                    PUEG("CONSTANTINI", 0, "PUE9", 5,5, function() {
                                        PUEM("60d67e6809df6a0015937ede", 0, "Hola","PUE10", 4,4, function(){
                                                cb(true);
                                        } )
                                    })
                                 })

                            })
                        })
                    })
                })
            })
        })
    })
}

var pupNombre = "Petra"
var pupBio = "Esta es mi biografia amor"
function ejecucionPup(cb){
    PUP("",pupBio, "PUP1", 500, false, function (ree) {
        PUP("Pe",pupBio, "PUP2", 500, false, function (ree) {
            PUP("Maria Jose Del Rosal Martinez",pupBio,"PUP3", 500, false, function (ree) {
                PUP(pupNombre, textmas500, "PUP4", 500, false, function (ree) {
                    PUP(pupNombre, pupBio, "PUP5", "success", true, function (ree) {
                        cb(true);
                });
            });

        });
    });

})
}

var puppdis = 3;
var puppEmin = 25;
var puppEmax = 30;
var puppgen = "m";
var puppmdist = true;


function ejecucionPupp(cb){
    PUPP(puppdis, puppEmax, 15, puppgen, puppmdist,"PUPP1", 500, false, function (ree) {
    PUPP(puppdis, puppEmax, 35, puppgen, puppmdist, "PUPP2", 500, false, function (ree) {
        PUPP(-1, puppEmax, puppEmin, puppgen, puppmdist, "PUPP3", 500, false, function (ree) {
            PUPP(300, puppEmax, puppEmin, puppgen, puppmdist, "PUPP4", 500, false, function (ree) {
                PUPP(puppdis, puppEmax, puppEmin, "Guadalajara", puppmdist, "PUPP5", 500, false, function (ree) {
                    PUPP("lolo", puppEmax, puppEmin, puppgen, puppmdist, "PUPP6", 500, false, function (ree) {
                        PUPP(puppdis, puppEmax, puppEmin, puppgen, 35, "PUPP7", 500, false, function (ree) {
                            PUPP(puppdis, puppEmax, "", puppgen, puppmdist, "PUPP8", 500, false, function (ree) {
                                PUPP(puppdis, "xx", puppEmin, puppgen, puppmdist, "PUPP9", 500, false, function (ree) {
                                    PUPP(puppdis, puppEmax, puppEmin, puppgen, puppmdist, "PUPP10", "/app/perfil", true, function (ree) {
                                            cb(true);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

    });
});}

function PUR(nombre, bio, fecha, genero, nombreTest, criterio1, criterio2, cb) {
    $.ajax({
        url: "/app/registrarse",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({"name": nombre, "gender":genero, "birth": fecha, "bio": bio, "images": []}),

        success: function (response) {
            $.ajax({
                url: "/app/testSeCreaAlgo",
                method: "POST",
                success: function (response2) {
                    $( "#mensajesDelTest" ).append('<p>Se ha ejecutado el test '+ nombreTest +' y se ha obtenido la respuesta '+ response +
                        ' Se ha comprobado la creación del archivo y ha dado  '+ response2+ '</p>')

                    if(response == criterio1 && response2 == criterio2){
                        $( "#mensajesDelTest" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                        document.getElementById(nombreTest).style.background = "green";
                        cb(true);
                    }
                    else{
                        $( "#mensajesDelTest" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                        document.getElementById(nombreTest).style.background = "red";
                        cb(true)
                    }

                },
                error: function (request, status, errorThrown) {

                }
            });


        },
        error: function (request, status, errorThrown) {
            var response = request.status;
            $.ajax({
                url: "/app/testSeCreaAlgo",
                method: "POST",
                success: function (response2) {
                    $( "#mensajesDelTest" ).append('<p>Se ha ejecutado el test '+ nombreTest +' y se ha obtenido la respuesta '+ response +
                            ' Se ha comprobado la creación del archivo y ha dado  '+ response2+ '</p>')

                    if(response == criterio1 && response2 == criterio2){
                        $( "#mensajesDelTest" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                        document.getElementById(nombreTest).style.background = "green";
                        cb(true)
                    }
                    else{
                        $( "#mensajesDelTest" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                        document.getElementById(nombreTest).style.background = "red";
                        cb(true)
                    }

                },
                error: function (request, status, errorThrown) {

                }
            });
        }
    });
}

function PUP(nombre, bio, nombreTest, criterio1, criterio2, cb) {
    $.ajax({
        url: "/app/personalizar",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({"name": nombre, "bio": bio, "images": []}),

        success: function (response, status) {
            $.ajax({
                url: "/app/testSeActualiza",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({"name": nombre, "bio": bio, "images": []}),
                success: function (response2) {
                    $( "#mensajesDelTest2" ).append('<p>Se ha ejecutado el test '+ nombreTest +' y se ha obtenido la respuesta '+ status +
                        ' Se ha comprobado la actualización del archivo y ha dado  '+ response2+ '</p>')

                    if(status == criterio1 && response2 == criterio2){
                        $( "#mensajesDelTest2" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                        document.getElementById(nombreTest).style.background = "green";
                        cb(true);
                    }
                    else{
                        $( "#mensajesDelTest2" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                        document.getElementById(nombreTest).style.background = "red";
                        cb(true)
                    }

                },
                error: function (request, status, errorThrown) {

                }
            });


        },
        error: function (request, status, errorThrown) {
            var response = request.status;
            $.ajax({
                url: "/app/testSeActualiza",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({"name": nombre, "bio": bio, "images": []}),
                success: function (response2) {
                    $( "#mensajesDelTest2" ).append('<p>Se ha ejecutado el test '+ nombreTest +' y se ha obtenido la respuesta '+ response +
                        ' Se ha comprobado la actualización del archivo y ha dado  '+ response2+ '</p>')

                    if(response == criterio1 && response2 == criterio2){
                        $( "#mensajesDelTest2" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                        document.getElementById(nombreTest).style.background = "green";
                        cb(true)
                    }
                    else{
                        $( "#mensajesDelTest2" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                        document.getElementById(nombreTest).style.background = "red";
                        cb(true)
                    }

                },
                error: function (request, status, errorThrown) {

                }
            });
        }
    });
}

function PUPP(distancia, edadMax, edadMin, generoBusqueda, mostrarDistancia, nombreTest, criterio1, criterio2, cb) {
    var misPreferencias = new Object();
    misPreferencias.distancia = distancia;
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

        success: function (response, status) {
            $.ajax({
                url: "/app/testSeActualizaPreferencias",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({"preferencias": misPreferencias}),
                success: function (response2) {
                    $( "#mensajesDelTest3" ).append('<p>Se ha ejecutado el test '+ nombreTest +' y se ha obtenido la respuesta '+ response +
                        ' Se ha comprobado la actualización del archivo y ha dado  '+ response2+ '</p>')

                    if(response == criterio1 && response2 == criterio2){
                        $( "#mensajesDelTest3" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                        document.getElementById(nombreTest).style.background = "green";
                        cb(true);
                    }
                    else{
                        $( "#mensajesDelTest3" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                        document.getElementById(nombreTest).style.background = "red";
                        cb(true)
                    }

                },
                error: function (request, status, errorThrown) {

                }
            });


        },
        error: function (request, status, errorThrown) {
            var response = request.status;
            $.ajax({
                url: "/app/testSeActualizaPreferencias",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({"preferencias": misPreferencias}),
                success: function (response2) {
                    $( "#mensajesDelTest3" ).append('<p>Se ha ejecutado el test '+ nombreTest +' y se ha obtenido la respuesta '+ response +
                        ' Se ha comprobado la actualización del archivo y ha dado  '+ response2+ '</p>')

                    if(response == criterio1 && response2 == criterio2){
                        $( "#mensajesDelTest3" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                        document.getElementById(nombreTest).style.background = "green";
                        cb(true)
                    }
                    else{
                        $( "#mensajesDelTest3" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                        document.getElementById(nombreTest).style.background = "red";
                        cb(true)
                    }

                },
                error: function (request, status, errorThrown) {

                }
            });
        }
    });
}

function PUEP(usuario, accion, nombreTest, criterio1, criterio2, cb) {

    $.ajax({
        url: "/app/testSSE",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({"usuario": usuario, "accion": accion}),

        success: function (response, status) {
            $.ajax({
                url: "/app/paso",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({"paso": usuario}),

                success: function (response2) {
                    $.ajax({
                        url: "/app/testListas",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({"usuario": usuario}),

                        success: function (response3) {
                            $( "#mensajesDelTest4" ).append('<p>Se ha ejecutado el test '+ nombreTest +' durante la recarga la correcion se situa en: '+ response +
                                ' Se ha comprobado las tablas de los usuarios y se situan en  '+ response3.enMiPod + ' y '+ response3.enSuPod+ '</p>')
                            if(response3.enMiPod == criterio1 && response3.enSuPod == criterio2){
                                $( "#mensajesDelTest4" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                                document.getElementById(nombreTest).style.background = "green";
                                cb(true)
                            }
                            else{
                                $( "#mensajesDelTest4" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                                document.getElementById(nombreTest).style.background = "red";
                                cb(true)
                            }
                        },
                        error: function (request, status, errorThrown) {

                        }
                    });
                },
                error: function (request, status, errorThrown) {

                }
            });


        },
        error: function (request, status, errorThrown) {
        }
    });
}

function PUEM(usuario, accion, mensaje, nombreTest, criterio1, criterio2, cb) {

    $.ajax({
        url: "/app/testSSE",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({"usuario": usuario, "accion": accion}),

        success: function (response, status) {
            $.ajax({
                url: "/app/meMola",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({"meMola": usuario, "mensaje": mensaje}),

                success: function (response2) {
                    $.ajax({
                        url: "/app/testListas",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({"usuario": usuario}),

                        success: function (response3) {
                            $( "#mensajesDelTest4" ).append('<p>Se ha ejecutado el test '+ nombreTest +' durante la recarga la correcion se situa en: '+ response +
                                ' Se ha comprobado las tablas de los usuarios y se situan en  '+ response3.enMiPod + ' y '+ response3.enSuPod+ '</p>')
                            if(response3.enMiPod == criterio1 && response3.enSuPod == criterio2){
                                $( "#mensajesDelTest4" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                                document.getElementById(nombreTest).style.background = "green";
                                cb(true)
                            }
                            else{
                                $( "#mensajesDelTest4" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                                document.getElementById(nombreTest).style.background = "red";
                                cb(true)
                            }
                        },
                        error: function (request, status, errorThrown) {

                        }
                    });
                },
                error: function (request, status, errorThrown) {

                }
            });


        },
        error: function (request, status, errorThrown) {
        }
    });
}
function PUEM2(usuario, accion, nombreTest, criterio1, criterio2, cb) {
    $.ajax({
        url: "/app/meMola",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({"meMola": usuario, "mensaje": ""}),

        success: function (response2) {
            $.ajax({
                url: "/app/testListas",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({"usuario": usuario}),

                success: function (response3) {
                    $( "#mensajesDelTest4" ).append('<p>Se ha ejecutado el test '+ nombreTest +' durante la recarga de este test no hay correcion '+
                        ' Se ha comprobado las tablas de los usuarios y se situan en  '+ response3.enMiPod + ' y '+ response3.enSuPod+ '</p>')
                    if(response3.enMiPod == criterio1 && response3.enSuPod == criterio2){
                        $( "#mensajesDelTest4" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                        document.getElementById(nombreTest).style.background = "green";
                        cb(true)
                    }
                    else{
                        $( "#mensajesDelTest4" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                        document.getElementById(nombreTest).style.background = "red";
                        cb(true)
                    }
                },
                error: function (request, status, errorThrown) {

                }
            });
        },
        error: function (request, status, errorThrown) {

        }
    });


}
function PUEG(usuario, accion, nombreTest, criterio1, criterio2, cb) {

    $.ajax({
        url: "/app/testSSE",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({"usuario": usuario, "accion": accion}),

        success: function (response, status) {
            $.ajax({
                url: "/app/meGusta",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({"like": usuario}),

                success: function (response2) {
                    $.ajax({
                        url: "/app/testListas",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({"usuario": usuario}),

                        success: function (response3) {
                            $( "#mensajesDelTest4" ).append('<p>Se ha ejecutado el test '+ nombreTest +' durante la recarga la correcion se situa en: '+ response +
                                ' Se ha comprobado las tablas de los usuarios y se situan en  '+ response3.enMiPod + ' y '+ response3.enSuPod+ '</p>')
                            if(response3.enMiPod == criterio1 && response3.enSuPod == criterio2){
                                $( "#mensajesDelTest4" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                                document.getElementById(nombreTest).style.background = "green";
                                cb(true)
                            }
                            else{
                                $( "#mensajesDelTest4" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                                document.getElementById(nombreTest).style.background = "red";
                                cb(true)
                            }
                        },
                        error: function (request, status, errorThrown) {

                        }
                    });
                },
                error: function (request, status, errorThrown) {

                }
            });


        },
        error: function (request, status, errorThrown) {
        }
    });
}

function PUEB(usuario, accion, nombreTest, criterio1, criterio2, cb) {

    $.ajax({
        url: "/app/testSSE",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({"usuario": usuario, "accion": accion}),

        success: function (response, status) {
            $.ajax({
                url: "/app/bloqueo",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({"bloqueo": usuario}),

                success: function (response2) {
                    $.ajax({
                        url: "/app/testListas",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({"usuario": usuario}),

                        success: function (response3) {
                            $( "#mensajesDelTest4" ).append('<p>Se ha ejecutado el test '+ nombreTest +' durante la recarga la correcion se situa en: '+ response +
                                ' Se ha comprobado las tablas de los usuarios y se situan en  '+ response3.enMiPod + ' y '+ response3.enSuPod+ '</p>')
                            if(response3.enMiPod == criterio1 && response3.enSuPod == criterio2){
                                $( "#mensajesDelTest4" ).append("<p>Prueba  "+ nombreTest +" SUPERADA</p>")
                                document.getElementById(nombreTest).style.background = "green";
                                cb(true)
                            }
                            else{
                                $( "#mensajesDelTest4" ).append("<p>Prueba  "+ nombreTest +" FALLIDA</p>")
                                document.getElementById(nombreTest).style.background = "red";
                                cb(true)
                            }
                        },
                        error: function (request, status, errorThrown) {

                        }
                    });
                },
                error: function (request, status, errorThrown) {

                }
            });


        },
        error: function (request, status, errorThrown) {
        }
    });
}

function PUC1(cb) {
    $.ajax({
        url: "/app/comparaEnlaces",
        method: "POST",


        success: function (response) {
            $( "#mensajesDelTest5" ).append('<p>Se ha ejecutado el test PUC1 el numero de enlaces es completo: '+ response + '</p>')
            if(response){
                $( "#mensajesDelTest5" ).append("<p>Prueba  PUC1 SUPERADA</p>")
                document.getElementById("PUC1").style.background = "green";
                cb(true)
            }
            else{
                $( "#mensajesDelTest5" ).append("<p>Prueba  PUC1 FALLIDA</p>")
                document.getElementById("PUC1").style.background = "red";
                cb(true)
            }

        },
        error: function (request, status, errorThrown) {

        }
    });
}

function PUC2(cb) {
    $.ajax({
        url: "/app/lecturaChat",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({"misMensajes": []}),

        success: function (response) {
            $( "#mensajesDelTest5" ).append('<p>Se ha ejecutado el test PUC2 Se comprueba concordancia de mensajes  '+ response+ '</p>')
            if(response){
                $( "#mensajesDelTest5" ).append("<p>Prueba  PUC2 SUPERADA</p>")
                document.getElementById("PUC2").style.background = "green";
                cb(true)
            }
            else{
                $( "#mensajesDelTest5" ).append("<p>Prueba  PUC2 FALLIDA</p>")
                document.getElementById("PUC2").style.background = "red";
                cb(true)
            }

        },
        error: function (request, status, errorThrown) {

        }
    });
}


function PUCC(testName, otroUser, mensaje, mensajes ,cb) {
    $.ajax({
        url: "/app/subeMensaje",
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({"contenido": mensaje, "receptor":otroUser}),

        success:  function (responseA) {$.ajax({
            url: "/app/lecturaChat",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({"misMensajes": mensajes}),

            success: function (response) {
                $( "#mensajesDelTest5" ).append('<p>Se ha ejecutado el test '+testName+' Se comprueba concordancia de mensajes  '+ response+ '</p>')
                if(response){
                    $( "#mensajesDelTest5" ).append("<p>Prueba  "+testName+" SUPERADA</p>")
                    document.getElementById(testName).style.background = "green";
                    cb(true)
                }
                else{
                    $( "#mensajesDelTest5" ).append("<p>Prueba  "+testName+" FALLIDA</p>")
                    document.getElementById(testName).style.background = "red";
                    cb(true)
                }

            },
            error: function (request, status, errorThrown) {

            }
        });},
        error: function (request, status, errorThrown) {

        }
    });

}

var textmas500 = "Tonto el que no entienda\n" +
    "Cuenta una leyenda\n" +
    "Que una hembra gitana\n" +
    "Conjuró a la luna hasta el amanecer\n" +
    "Llorando pedía\n" +
    "Al llegar el día\n" +
    "Desposar un calé\n" +
    "\"Tendrás a tu hombre, piel morena\"\n" +
    "Desde el cielo habló la luna llena\n" +
    "\"Pero a cambio quiero\n" +
    "El hijo primero\n" +
    "Que le engendres a él\n" +
    "Que quien su hijo inmola\n" +
    "Para no estar sola\n" +
    "Poco le iba a querer\"\n" +
    "Luna quieres ser madre\n" +
    "Y no encuentras querer\n" +
    "Que te haga mujer\n" +
    "Dime, luna de plata\n" +
    "¿Qué pretendes hacer con un niño de piel?\n" +
    "Ah-ah-ah-ah, ah-ah-ah-ah\n" +
    "Hijo de la luna\n" +
    "De padre canela nació un niño\n" +
    "Blanco como el lomo de un armiño\n" +
    "Con los ojos grises en vez de aceituna\n" +
    "Niño albino de luna\n" +
    "\"Maldita su estampa, este hijo es de un payo\n" +
    "Y yo no me lo cayo\"\n" +
    "Luna quieres ser madre\n" +
    "Y no encuentras querer que te haga mujer\n" +
    "Dime, luna de plata\n" +
    "¿Qué pretendes hacer con un niño de piel?\n" +
    "Ah-ah-ah-ah, ah-ah-ah-ah\n" +
    "Hijo de la luna\n" +
    "Gitano al creerse deshonrado\n" +
    "Se fue a su mujer, cuchillo en mano\n" +
    "\"¿De quién es el hijo? Me has engañao' fijo\"\n" +
    "Y de muerte la hirió\n" +
    "Luego se hizo al monte con el niño en brazos\n" +
    "Y allí le abandonó\n" +
    "Luna quieres ser madre\n" +
    "Y no encuentras querer que te haga mujer\n" +
    "Dime, luna de plata\n" +
    "¿Qué pretendes hacer con un niño de piel?\n" +
    "Ah-ah-ah-ah, ah-ah-ah-ah\n" +
    "Hijo de la luna\n" +
    "Y las noches que haya luna llena\n" +
    "Será porque el niño esté de buenas\n" +
    "Y si el niño llora\n" +
    "Menguará la luna para hacerle una cuna\n" +
    "Y si el niño llora\n" +
    "Menguará la luna para hacerle una cuna"