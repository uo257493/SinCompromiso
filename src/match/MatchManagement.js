var nodemailer = require('nodemailer');
var linq = require('linqjs');
var cryptox = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'bh58lkif';

module.exports = function(app, swig, mongoDao, podDao){



    function decrypt(text){
        if(text == undefined)
            return "";
        var decipher = cryptox.createDecipher(algorithm,password)
        var dec = decipher.update(text+"",'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }


    app.get('/app/enlaces', async function (req, res) {

    var estaRegistrado = await podDao.isRegistered()
    var respuesta = null;
    if(!estaRegistrado) {
        res.redirect("/registro/sinCompromiso");
        return;
    }
    else{
        var dataGot = await podDao.getDatosPerfil();
        var preferenciasLeidas;
        mongoDao.leePreferencias(podDao.getUserId(), function (prefLeidas) {
            preferenciasLeidas = prefLeidas[0];
            if(prefLeidas.length == 0){
                respuesta = swig.renderFile('views/panels/verEnlacesSC.html', {
                    hayAlgo: false,
                    enlace: null
                });
                res.send(respuesta)
                return;
            }
            mongoDao.sistemaDeEnlacesListaP(podDao.getUserId(), getAge(dataGot.birth),preferenciasLeidas.generoBusqueda
                , preferenciasLeidas.genero, function (lista1) {
                var limitador;
                if(lista1.length>=300) // si hay muchos resultados vale con 300
                    limitador = lista1.subarray(0,300);
                else
                    limitador = lista1
                mongoDao.getMyLists(preferenciasLeidas.mongoUserId, function (historico) {
                    var arrSol = [];
                    var meMola = [];
                    for(var i = 0 ; i < historico.meMola.length; i++)
                        meMola.push(historico.meMola[i].mongoUserId);
                    arrSol = historico.meGusta.concat(historico.paso.concat(historico.bloqueos.concat(meMola)))
                    var contInterList = limitador.except(arrSol);
                    var newList = contInterList.select(function(t){ return t.mongoUserId });
                    mongoDao.getPods(newList, async function (lista2) {

                        if(newList.length ==0){
                            respuesta = swig.renderFile('views/panels/verEnlacesSC.html', {
                                hayAlgo: hayAlgo,
                                enlace: enlace
                            });
                            res.send(respuesta)
                            return ;
                        }
                        var distCandi = "X"
                        var listaFinal = [];
                        var miLocation = await podDao.getLocationOtroPerfil(dataGot.userId);
                        var milat;
                        var milong;
                        if(miLocation != "") {
                            milat = parseFloat(decrypt(miLocation.a))
                            milong = parseFloat(decrypt(miLocation.b))
                        }
                        for(var i = 0; i < lista2.length; i++){
                            var distancia = await podDao.getLocationOtroPerfil(lista2[i].userId);
                            var latitudOtro;
                            var longitudOtro
                            if(distancia!= "" ) {
                                latitudOtro = parseFloat(decrypt(distancia.a));
                                longitudOtro = parseFloat(decrypt(distancia.b));
                            }
                            var diferenciaDist;
                            if(distancia == "" || miLocation == ""){
                                diferenciaDist = 8000;
                            }
                            else
                                diferenciaDist= getKilometros(milat, milong, latitudOtro, longitudOtro);

                            if(parseFloat(preferenciasLeidas.distancia) >= diferenciaDist){
                                listaFinal.push(lista2[i].userId);
                                if(listaFinal.length == 1) //Nos quedamos con la del perfil que mostraremos
                                    distCandi = diferenciaDist;
                            }

                        }

                        var perfilAMostrar = null;
                        if(arrSol.length <= 7 && listaFinal.length >0)
                            perfilAMostrar = listaFinal[0];
                        else{
                            if(listaFinal.length >0){ //Si no eres nuevo y te puedo dar alguno sorteamos una cantidad que si esta entre el % de candidatos de da uno
                                var cantidadAceptable = (listaFinal.length/(limitador.length))*100;
                                var aleat = Math.random() * (101 - 1) + 1;
                                if(aleat <= cantidadAceptable)
                                    perfilAMostrar = listaFinal[0];
                            }
                        }

                        //Leemos el perfil que debemos mostrar
                        var hayAlgo = (perfilAMostrar!=null);
                        if(hayAlgo){

                            var otroPod = await podDao.leeOtroPod(perfilAMostrar);
                            var enlace = new Object();
                            mongoDao.leePreferencias(otroPod.userId, async function (preferencias) {



                                var enSi = preferencias[0];

                                enlace.nombre = otroPod.name;
                                enlace.userId = enSi.mongoUserId.toString();
                                enlace.edad = getAge(otroPod.birth);
                                if(enSi.mostrarDistancia)
                                    enlace.distancia = distCandi;
                                else
                                    enlace.distancia = "X";
                                enlace.biografia= otroPod.bio;
                                enlace.imagenes = otroPod.imagenes;
                                enlace.cantidadImagenes = otroPod.cantidadImagenes;
                                enlace.esMeMola = false;
                                respuesta = swig.renderFile('views/panels/verEnlacesSC.html', {
                                    hayAlgo: hayAlgo,
                                    enlace: enlace
                                });
                                res.send(respuesta)
                            })
                        }
                        else {
                            respuesta = swig.renderFile('views/panels/verEnlacesSC.html', {
                                hayAlgo: hayAlgo,
                                enlace: enlace
                            });
                            res.send(respuesta)
                        }
                    })

                    })


                })
        })


    }


});

    app.post('/app/visitaSSE', function (req, res) {
        var redirigir = true;
        if(redirigir)
            res.redirect('/app/enlaces');
        else
            res.send("");

    });

    app.post('/app/denuncia', function (req, res) {

        var denunciado = req.body.denunciado;
        var motivo = req.body.motivo;

        var mensa= "Se denuncia a: "+ denunciado +" por el siguiente motivo: " + motivo;
        var mailOptions = {
            from: 'denucias.sincompromiso@gmail.com',
            to: 'admn.sincompromiso@gmail.com',
            subject: 'Denuncia de perfil',
            text: mensa
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

    function getKilometros(lat1,lon1,lat2,lon2)
    {
        rad = function(x) {return x*Math.PI/180;}
        var R = 6378.137; //Radio de la tierra en km
        var dLat = rad( lat2 - lat1 );
        var dLong = rad( lon2 - lon1 );
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d.toFixed(3); //Retorna tres decimales
    }

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$3/$2/$1"));
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'denucias.sincompromiso@gmail.com',
            pass: '200421SCD3nunc1a5'
        }
    });
}