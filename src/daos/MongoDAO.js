class MongoDao {

    constructor(app, mongo) {
        this.mongo = mongo;
        this.app = app;
    }

    addUser(userID, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
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
                    enlaces: []
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
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
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
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
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
        });
    }


    meMola(yo, mongouserId, mensaje, funcionCallback) {
        var meMolaO = {
            "mongoUserId": mongouserId,
            "fecha": Date.now(),
            "mensajeMeMola": mensaje
        }
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                collection.update({"mongoUserId": yo}, {$push: {"meMola": meMolaO}}, function (err, resultado) {
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


    gestionaGusto(yo, mongouserId, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                collection.find({
                    "mongoUserId": mongoUserId,
                    "meGusta": {$elemMatch: yo}
                }).toArray(function (err, resultado) {
                    if (err) {
                        funcionCallback(null);
                    } else {

                        if (resultado.length > 0) {
                            var collection = db.collection("historicoEnlaces");
                            collection.update({
                                "mongoUserId": mongoUserId,
                                $pull: {"meGusta": yo}
                            }, function (err, resultado) {
                                if (err) {
                                    funcionCallback(null);
                                } else {
                                    //Mover a enlaces
                                    this.mueveAEnlaces(yo, mongouserId, function (resultado) {
                                        funcionCallback(true)
                                    })

                                }
                                db.close();
                            });
                        }

                    }
                    db.close();
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
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(usuarios[0]._id);
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


    createMongoId(cadena){
        return this.mongo.ObjectID(cadena);
    }
}
module.exports = MongoDao;