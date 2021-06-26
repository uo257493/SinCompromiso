class MongoDao {

    constructor(app, mongo) {
        this.mongo = mongo;
        this.app = app;
    }

    addUser(userID, funcionCallback) {
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            }
            else {
                me.getMyself(userID, function (res) {
                    if(res == null){
                        var ti = {userId: userID};
                        var collection = db.collection('usuarios');
                        collection.insert(ti, function (err, result) {
                            if (err) {
                                funcionCallback(null);
                            } else {
                                funcionCallback(result.ops[0]._id);
                            }
                            db.close();
                        });
                    }
                    else
                        funcionCallback(null);
                })

            }
        });
    }

    createPreferences(preferences, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('preferencias');
                collection.insert(preferences, function (err, result) {
                    if (err) {
                        funcionCallback(null);
                    }
                    db.close();
                });
            }
        });
    }

    createMatchesLists(mongoId, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                var ti = {
                    mongoUserId: mongoId,
                    meGusta: [],
                    meMola: [],
                    paso: [],
                    bloqueos: [],
                    enlaces: [],
                    ultimoMeMola: 0
                }
                collection.insert(ti, function (err, result) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback("ok");
                    }
                    db.close();
                });
            }
        });
    }

    updatePreferences(mongoId, cambios, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('preferencias');
                collection.update({mongoUserId: mongoId}, {$set: cambios}, function (err, result) {
                    if (err) {
                        funcionCallback(null);
                    }
                    db.close();
                });
            }
        });
    }

    editPreferences(userID, preferencias, funcionCallback) {
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var ti = {userId: userID};
                var collection = db.collection('usuarios');
                collection.find({"userId": userID}).toArray(function (err, usuarios) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        collection = db.collection('preferencias');
                        var mongoUserId = usuarios[0]._id;
                        var prefTs = {
                            "edadMin": parseInt(preferencias.edadMin, 10),
                            "edadMax": parseInt(preferencias.edadMax, 10),
                            "distancia": parseInt(preferencias.distancia, 10),
                            "generoBusqueda": preferencias.generoBusqueda,
                            "mostrarDistancia": preferencias.mostrarDistancia,
                            "mongoUserId": mongoUserId,
                            "genero": preferencias.gender

                        }

                        var modificaciones = {
                            "edadMin": parseInt(preferencias.edadMin, 10),
                            "edadMax": parseInt(preferencias.edadMax, 10),
                            "distancia": parseInt(preferencias.distancia, 10),
                            "generoBusqueda": preferencias.generoBusqueda,
                            "mostrarDistancia": preferencias.mostrarDistancia
                        }
                        collection.find({"mongoUserId": mongoUserId}).toArray(function (err, preferencias) {
                            if (err) {
                                funcionCallback(null);
                            } else {
                                if (preferencias.length == 0) { //No tiene creada su lista de preferencias
                                    me.createPreferences(prefTs, me.createMatchesLists(mongoUserId, funcionCallback))
                                } else {
                                    me.updatePreferences(mongoUserId, modificaciones, funcionCallback("ok"))
                                }
                            }
                        });
                    }
                    db.close();
                });
            }
        });
    }

    leePreferencias(userID, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var ti = {userId: userID};
                var collection = db.collection('usuarios');
                collection.find({"userId": userID}).toArray(function (err, usuarios) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        collection = db.collection('preferencias');
                        var mongoUserId = usuarios[0]._id;

                        collection.find({"mongoUserId": mongoUserId}).toArray(function (err, preferencias) {
                            if (err) {
                                funcionCallback(null);
                            } else {

                                funcionCallback(preferencias);
                            }
                        });
                    }
                    db.close();
                });
            }
        });
    }

    getFullMatches(lista, funcionCallback) {

        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('usuarios');
                collection.find({"_id": {$in: lista}}).toArray(function (err, usuarios) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(usuarios)
                    }
                    db.close();
                });
            }
        });
    }

    getPods(lista, funcionCallback) {

        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('usuarios');
                collection.find({"_id": {$in: lista}}, {"userId": 1, "_id": 0}).toArray(function (err, usuarios) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(usuarios)
                    }
                    db.close();
                });
            }
        });
    }

    sistemaDeEnlacesListaP(userID, myAge, myGenderPref, myGender, funcionCallback) {
        var miCriterio;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var ti = {userId: userID};
                var collection = db.collection('usuarios');
                collection.find({"userId": userID}).toArray(function (err, usuarios) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        collection = db.collection('preferencias');
                        var mongoUserId = usuarios[0]._id;

                        if (myGenderPref == "t") {
                            miCriterio = {
                                "edadMin": {$lte: myAge},
                                "edadMax": {$gte: myAge},
                                "mongoUserId": {$ne: mongoUserId},
                                $or: [{"generoBusqueda": myGender}, {"generoBusqueda": "t"}]
                            }
                        } else {
                            miCriterio = {
                                "edadMin": {$lte: myAge},
                                "edadMax": {$gte: myAge},
                                "genero": myGenderPref,
                                "mongoUserId": {$ne: mongoUserId},
                                $or: [{"generoBusqueda": myGender}, {"generoBusqueda": "t"}]
                            }
                        }
                        collection.find(miCriterio, {"mongoUserId": 1, "_id": 0}).toArray(function (err, candidatos) {
                            if (err) {
                                funcionCallback(null);
                            } else {

                                funcionCallback(candidatos);
                            }
                        });
                    }
                    db.close();
                });
            }
        });
    }

    getMyLists(mongouserId, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                collection.find({"mongoUserId": mongouserId}).toArray(function (err, historico) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        if(historico.length == 0){
                            var ti = {
                                mongoUserId: "",
                                meGusta: [],
                                meMola: [],
                                paso: [],
                                bloqueos: [],
                                enlaces: [],
                                ultimoMeMola: 0
                            }
                            funcionCallback(ti);
                        }
                        else
                            funcionCallback(historico[0]);

                    }
                    db.close();
                });
            }
        });
    }

    getReceivedMeMola(mongouserId, funcionCallback) {
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                //Selecciona los ids Mongo de las personas que tienen en sus MeMola al usuario
                collection.find({"meMola": {$elemMatch: {"mongoUserId": me.createMongoId(mongouserId.toString())}}}, {
                    "mongoUserId": 1,
                    "meMola": 1,
                    "_id": 0
                }).toArray(function (err, historico) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        var mensajeMeMola = "";
                        if (historico.length > 0) {
                            var candidate = historico[0].mongoUserId;

                            for (var i = 0; i < historico[0].meMola.length; i++) {
                                if (historico[0].meMola[i].mongoUserId.toString() == mongouserId.toString())
                                    mensajeMeMola = historico[0].meMola[i].mensajeMeMola;
                            }
                            var collection = db.collection('usuarios');
                            collection.find({"_id": candidate}, {
                                "userId": 1,
                                "_id": 0
                            }).toArray(function (err, usuarios) {
                                if (err) {
                                    funcionCallback(null);
                                } else {
                                    funcionCallback(usuarios[0], mensajeMeMola)
                                }
                            });
                        } else {
                            funcionCallback(-1);
                        }

                    }
                    db.close();
                });
            }
        });
    }

    paso(yo, mongouserId, funcionCallback) {
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {

                me.checkSePuedeInteraccionarUsuario(mongouserId, yo, function (res) {
                    if(res){
                        var collection = db.collection('historicoEnlaces');
                        collection.update({"mongoUserId": yo}, {$push: {"paso": mongouserId}}, function (err, resultado) {
                            if (err) {
                                funcionCallback(null);
                            } else {

                                funcionCallback(true);

                            }
                            db.close();
                        });
                    }
                    else
                        funcionCallback(true);
                })

            }
        });
    }


    mueveAEnlaces(yo, mongouserId, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                collection.update({"mongoUserId": mongouserId}, {$push: {"enlaces": yo}}, function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {

                        funcionCallback(true);

                    }
                    db.close();
                });
            }
        });
    }

    meGusta(yo, mongouserId, funcionCallback) {
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                me.checkSePuedeInteraccionarUsuario(mongouserId, yo, function (res) {
                    if(res){
                        var collection = db.collection('historicoEnlaces');
                        collection.update({"mongoUserId": yo}, {$push: {"meGusta": mongouserId}}, function (err, resultado) {
                            if (err) {
                                funcionCallback(null);
                            } else {

                                funcionCallback(true);

                            }
                            db.close();
                        });

                    }
                    else
                        funcionCallback(true);
                })
           }
        });
    }


    meMola(yo, mongouserId, mensaje, funcionCallback) {
        var meMolaO = {
            "mongoUserId": mongouserId,
            "fecha": Date.now(),
            "mensajeMeMola": mensaje
        }
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                me.checkSePuedeInteraccionarUsuario(mongouserId, yo, function (res) {
                    if(res){
                        var collection = db.collection('historicoEnlaces');
                        collection.update({"mongoUserId": yo}, {$set: {"ultimoMeMola": Date.now()}, $push: {"meMola": meMolaO}}, function (err, resultado) {
                            if (err) {
                                funcionCallback(null);
                            } else {

                                funcionCallback(true);

                            }
                            db.close();
                        });

                    }
                    else
                        funcionCallback(true);
                })
            }
        });
    }


    gestionaGusto(yo, mongouserId, funcionCallback) {
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                collection.find({
                    "mongoUserId": mongouserId,
                    "meGusta": {$elemMatch: {$eq: yo}
                }}).toArray(function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {

                        if (resultado.length > 0) {
                            var collection = db.collection("historicoEnlaces");
                            collection.update({
                                "mongoUserId": mongouserId},
                                { $pull: {"meGusta": yo}}
                            , function (err, resultado) {
                                if (err) {
                                    funcionCallback(null);
                                } else {
                                    //Mover a enlaces
                                    me.mueveAEnlaces(mongouserId, yo, function (resultado) {
                                        me.mueveAEnlaces(yo, mongouserId, function (resultado) {
                                            funcionCallback(true)
                                        })
                                    })

                                }
                                db.close();
                            });
                        }

                    }
                });
            }
        });
    }

    getMyself(userID, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var ti = {userId: userID};
                var collection = db.collection('usuarios');
                collection.find({"userId": userID}).toArray(function (err, usuarios) {
                    if (err || usuarios.length ==0) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(usuarios[0]._id);
                    }
                })
            }
        })
    }

    checkExistsId(userID, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var ti = {userId: userID};
                var collection = db.collection('usuarios');
                collection.find({"_id": userID}).toArray(function (err, usuarios) {
                    if (err || usuarios.length ==0) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(true);
                    }
                })
            }
        })
    }

    mueveAPaso(mongoUserId, yo, funcionCallback){
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                collection.find({
                    "mongoUserId": mongoUserId,
                    "meMola": {$elemMatch: {"mongoUserId": yo}}
                }).toArray(function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {

                        if (resultado.length > 0) {
                            var collection = db.collection("historicoEnlaces");
                            collection.update({
                                "mongoUserId": mongoUserId},
                                { $pull: {"meMola": {"mongoUserId":yo}}
                            }, function (err, resultado) {
                                if (err) {
                                    funcionCallback(null);
                                } else {
                                    //Mover a enlaces
                                    me.paso(mongoUserId, yo, function (resultado) {
                                        funcionCallback(true)
                                    })

                                }
                                db.close();
                            });
                        }
                        else
                            funcionCallback(true);

                    }
                    db.close();
                });
            }
        });
    }

    gestionaMola(yo, mongoUserId, funcionCallback) {
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection("historicoEnlaces");
                collection.update({"mongoUserId": mongoUserId}, {
                    $pull: {"meMola": {"mongoUserId": {$eq: yo}}}
                }, function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {

                        me.mueveAEnlaces(mongoUserId, yo, function (resultado) {
                            me.mueveAEnlaces(yo, mongoUserId, function (resultado) {
                                funcionCallback(true)
                            })
                        })

                    }
                    db.close();
                });
            }

        }

    )}



    createMongoId(cadena){
        try{
            return this.mongo.ObjectID(cadena);
        }
        catch (e) {
            return "";
        }

    }



    leMolo(yo, mongouserId, funcionCallback) {
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                //Selecciona los ids Mongo de las personas que tienen en sus MeMola al usuario
                collection.find({"mongoUserId": mongouserId, "meMola": {$elemMatch: {"mongoUserId": me.createMongoId(yo.toString())}}}).toArray(function (err, historico) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                       funcionCallback(historico.length > 0);

                    }
                    db.close();
                });
            }
        });
    }

    leGusto(yo, mongouserId, funcionCallback) {
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                //Selecciona los ids Mongo de las personas que tienen en sus MeMola al usuario
                collection.find({"mongoUserId": mongouserId, "meGusta": {$elemMatch: {$eq: yo}}}).toArray(function (err, historico) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(historico.length > 0);

                    }
                    db.close();
                });
            }
        });
    }

    gestorMeGusta(yo, quien, funcionCallback){
        var me = this;
        quien = me.createMongoId(quien);
        me.leMoloOleGusto(yo, quien, function (resultado) {
            if(resultado == 0){
                me.meGusta(yo, quien, function (res2) {
                    funcionCallback(false);
                })
            }
            else{
                if(resultado == 1){
                    me.gestionaGusto(yo, quien, function (res3) {
                        funcionCallback(true);
                    })
                }
                else{
                    me.gestionaMola(yo, quien,function (res4) {
                        funcionCallback(true);
                    })
                }
            }
        })

    }

    leMoloOleGusto(yo, quien, funcionCallback){
        var me = this;
        this.leGusto(yo, quien, function (leGusto) {
            if(leGusto)
                funcionCallback(1); //Le gusto
            else{
                me.leMolo(yo, quien, function (leMolo) {
                    if(leMolo)
                        funcionCallback(2); //Le molo
                    else
                        funcionCallback(0); //Nada
                })
            }
        })
    }


    bloqueo(yo, mongouserId, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                collection.update({"mongoUserId": yo}, {$push: {"bloqueos": mongouserId}}, function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {

                        funcionCallback(true);

                    }
                    db.close();
                });
            }
        });
    }


    gestorBloqueo(yo, mongoUserId, funcionCallback) {
        mongoUserId = this.createMongoId(mongoUserId);
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
                if (err) {
                    funcionCallback(null);
                } else {
                    var collection = db.collection("historicoEnlaces");
                    collection.update({"mongoUserId": yo}, {
                        $pull: {"enlaces": mongoUserId}
                    }, function (err, resultado) {
                        if (err) {
                            funcionCallback(null);
                        } else {
                        me.pullFromEveryWhere(mongoUserId, yo , function () {
                            me.bloqueo(yo, mongoUserId, function (res) {
                                me.bloqueo(mongoUserId, yo, function (res) {
                                    funcionCallback(true);
                                })
                            })
                        })


                        }
                        db.close();
                    });
                }

            }

        )}


    gestorMeMola(yo, quien, funcionCallback){
        var me = this;

        quien = me.createMongoId(quien);
        me.leGusto(yo, quien, function (resultado) {
            if(!resultado){
                    funcionCallback(false);
            }
            else{
                me.gestionaGusto(yo,quien, function (res) {
                    funcionCallback(true);
                })
            }
        })

    }


    actualizaTiempoMeMola(yo, funcionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                collection.update({mongoUserId: yo}, {$set: {"ultimoMeMola": Date.now()}}, function (err, result) {
                    if (err) {
                        funcionCallback(null);
                    }
                    else
                        funcionCallback(true);
                    db.close();
                });
            }
        });
    }


    misEnlaces(yo, funcionCallback) {
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                //Selecciona los ids Mongo de las personas que tienen en sus MeMola al usuario
                collection.find({"mongoUserId": yo}, {"enlaces": 1, "_id": 0}).toArray(function (err, enlaces) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        if(enlaces == null || enlaces == undefined || enlaces.length == 0|| enlaces[0].enlaces == undefined || enlaces[0].enlaces == null)
                            funcionCallback(null)
                        else
                            funcionCallback(enlaces[0].enlaces);

                    }
                    db.close();
                });
            }
        });
    }

    checkSePuedeInteraccionarUsuario(usuario, yo, cb){
        var me = this;
        me.checkExistsId(usuario, function (res) {
            if(res == null)
                cb(false);
            else{
                me.getMyLists(yo, function (listasDelUsuario) {
                    listasDelUsuario.meGusta = listasDelUsuario.meGusta.select(function (t) {
                        return t.toString()
                    })

                    listasDelUsuario.paso = listasDelUsuario.paso.select(function (t) {
                        return t.toString()
                    })
                    listasDelUsuario.bloqueos = listasDelUsuario.bloqueos.select(function (t) {
                        return t.toString()
                    })
                    listasDelUsuario.enlaces = listasDelUsuario.enlaces.select(function (t) {
                        return t.toString()
                    })
                    var ra = listasDelUsuario.meGusta.contains(usuario.toString()) == false;
                    var re = listasDelUsuario.paso.contains(usuario.toString()) == false;
                    var ri = listasDelUsuario.bloqueos.contains(usuario.toString()) == false
                    var ro = listasDelUsuario.enlaces.contains(usuario.toString()) == false;
                    var ru = true;
                    for(var i = 0; i < listasDelUsuario.meMola.length; i++){
                        if(listasDelUsuario.meMola[i].mongoUserId.toString() == usuario.toString())
                            ru = false;
                    }
                    var rests = ra && re && ri && ro && ru;
                    cb(rests); //Devuelve true si no hay interaccion con el
                })
            }

        })
    }

    // Métodos de apoyo para los test
    eliminaRastroUsuarioTestUsers(yo){
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (!err) {

                try {
                    var collection = db.collection('usuarios');
                    collection.deleteMany({"_id": yo});
                }
                catch (e) {
                    //Not necesary
                }

            }
        });
    }


    eliminaRastroUsuarioTestHistorico(yo){
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (!err) {

                try {
                    var collection = db.collection('historicoEnlaces');
                    collection.deleteMany({"mongoUserId": yo});
                }
                catch (e) {
                    //Not necesary
                }

            }
        });
    }

    eliminaRastroUsuarioTestPreferencias(yo){
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (!err) {

                try {
                    var collection = db.collection('preferencias');
                    collection.deleteMany({"mongoUserId": yo});
                }
                catch (e) {
                    //Not necesary
                }

            }
        });
    }

    async eliminaTodoDelUser(user){
        var me = this;
        this.getMyself(user, async function (yo) {
            me.pullFromEveryWhere(yo, user, async function () {
                await me.eliminaRastroUsuarioTestHistorico(yo);
                await me.eliminaRastroUsuarioTestPreferencias(yo);
                await me.eliminaRastroUsuarioTestUsers(yo);

            })
        })
    }


    pullFromEnlaces(yo, userToPull, funcionCallback){
       var mongoUserId = userToPull;
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            }
            else {
                var collection = db.collection("historicoEnlaces");
                collection.update({"mongoUserId": yo}, {
                    $pull: {"enlaces": mongoUserId}
                }, function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(true);
                    }
                    db.close();
                });
            }

        })
    }

    pullFromMG(yo, userToPull, funcionCallback){
        var mongoUserId = userToPull;
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection("historicoEnlaces");
                collection.update({"mongoUserId": yo}, {
                    $pull: {"meGusta": mongoUserId}
                }, function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(true);
                    }
                    db.close();
                });
            }

        })
    }

    pullFromPaso(yo, userToPull, funcionCallback){
        var mongoUserId = userToPull;
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection("historicoEnlaces");
                collection.update({"mongoUserId": yo}, {
                    $pull: {"paso": mongoUserId}
                }, function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(true);
                    }
                    db.close();
                });
            }

        })
    }


    pullFromBloqueo(yo, userToPull, funcionCallback){
        var mongoUserId = userToPull;
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection("historicoEnlaces");
                collection.update({"mongoUserId": yo}, {
                    $pull: {"bloqueos": mongoUserId}
                }, function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(true);
                    }
                    db.close();
                });
            }

        })
    }

    pullFromMeMola(yo, userToPull, funcionCallback){
        var mongoUserId = userToPull;
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection("historicoEnlaces");
                collection.update({"mongoUserId": yo}, {
                    $pull: {"meMola": {"mongoUserId": mongoUserId}}
                }, function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(true);
                    }
                    db.close();
                });
            }

        })
    }


    pullFromEveryWhere(yo, otro, funcionCallback){
        var me = this;

        me.pullFromBloqueo(yo,otro, function (res) {
            me.pullFromEnlaces(yo, otro, function (res) {
                me.pullFromMeMola(yo, otro, function (res) {
                    me.pullFromMG(yo, otro, function (res) {
                        me.pullFromPaso(yo, otro, function () {
                            funcionCallback(true);

                        })
                    })
                })
            })
        })
    }

    reiniciaTiempoMeMola(user, funcionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                collection.update({"mongoUserId": user}, {$set: {"ultimoMeMola": 0}}, function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {

                        funcionCallback(true);

                    }
                    db.close();
                });
            }
        });
    }

    managePullsTest(yo, otro, cb){
        var me = this;
        me.pullFromEveryWhere(yo, otro, function (res) {
            me.pullFromEveryWhere(otro, yo, function (res) {
                me.reiniciaTiempoMeMola(otro, function (res) {
                    me.reiniciaTiempoMeMola(yo, function (res) {
                        cb(true);
                    })
                })
            })
        })
    }


}
module.exports = MongoDao;