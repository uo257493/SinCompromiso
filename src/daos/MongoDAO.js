class MongoDao {

    constructor(app, mongo) {
        this.mongo = mongo;
        this.app = app;
    }
   addUser(userID, funcionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var ti = {userId : userID };
                var collection = db.collection('usuarios');
                collection.insert(ti, function(err, result) {
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

    createPreferences(preferences, funcionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('preferencias');
                collection.insert(preferences, function(err, result) {
                    if (err) {
                        funcionCallback(null);
                    }
                    db.close();
                });
            }
        });
    }

    createMatchesLists(mongoId, funcionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('historicoEnlaces');
                var ti  = {
                    mongoUserId: mongoId,
                    meGusta :[],
                    meMola: [],
                    paso:[],
                    bloqueos: []
                }
                collection.insert(ti, function(err, result) {
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

    updatePreferences(mongoId, cambios, funcionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('preferencias');
                collection.update({mongoUserId: mongoId},{$set: cambios}, function(err, result) {
                    if (err) {
                        funcionCallback(null);
                    }
                    db.close();
                });
            }
        });
    }

    editPreferences(userID, preferencias, funcionCallback){
        var me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var ti = {userId : userID };
                var collection = db.collection('usuarios');
                collection.find({"userId": userID}).toArray(function(err, usuarios) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        collection = db.collection('preferencias');
                        var mongoUserId = usuarios[0]._id;
                        var prefTs = {
                            "edadMin" : preferencias.edadMin,
                            "edadMax" : preferencias.edadMax,
                            "distancia": preferencias.distancia,
                            "generoBusqueda": preferencias.generoBusqueda,
                            "mostrarDistancia": preferencias.mostrarDistancia,
                            "mongoUserId": mongoUserId,
                            "genero": preferencias.gender

                    }

                        var modificaciones = {"edadMin" : preferencias.edadMin,
                            "edadMax" : preferencias.edadMax,
                            "distancia": preferencias.distancia,
                            "generoBusqueda": preferencias.generoBusqueda,
                            "mostrarDistancia": preferencias.mostrarDistancia
                        }
                        collection.find({"mongoUserId": mongoUserId}).toArray(function(err, preferencias) {
                            if (err) {
                                funcionCallback(null);
                            } else {
                                if(preferencias.length == 0){ //No tiene creada su lista de preferencias
                                   me.createPreferences(prefTs, me.createMatchesLists(mongoUserId, funcionCallback))
                                }
                                else{
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

    leePreferencias(userID, funcionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var ti = {userId : userID };
                var collection = db.collection('usuarios');
                collection.find({"userId": userID}).toArray(function(err, usuarios) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        collection = db.collection('preferencias');
                        var mongoUserId = usuarios[0]._id;

                        collection.find({"mongoUserId": mongoUserId}).toArray(function(err, preferencias) {
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



}

module.exports = MongoDao;