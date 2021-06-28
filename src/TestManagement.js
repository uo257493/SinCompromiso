const {
    getSessionFromStorage,
    getSessionIdFromStorageAll,
    Session
} = require("@inrupt/solid-client-authn-node");
const linq = require("linq");
var linqjs = require('linqjs');

module.exports = function(app, swig, mongoDao, PODDao, FC){


    app.get('/app/testIS', async function (req, res) {
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);

        if(pdao.getUserId() != "fulgentes.solidcommunity.net" && pdao.getUserId() != "fulgentes.inrupt.net" && pdao.getUserId() != "fulgentes.solidweb.org" ) {
            res.redirect("/app/perfil")
            return;
        }
        else if(pdao.getUserId()== "rosita.solidweb.org"){
            mongoDao.getMyself(await pdao.getUserId(), async function (yo) {
                mongoDao.reiniciaTiempoMeMola(yo, function (retr) {
                    res.redirect("/app/perfil")
                })
            })
        }
        else{
            mongoDao.getMyself(await pdao.getUserId(), async function (yo) {
                mongoDao.pullIntegracion(yo, async function (resttr) {
                    await pdao.utilPruebasEliminador();
                    await mongoDao.eliminaTodoDelUser(pdao.getUserId());
                    res.redirect("/app/perfil")
                } )
            })

        }

    });

 app.get('/app/test', async function (req, res) {
     const session = await getSessionFromStorage(req.session.sessionId)
     var fc = new FC(session)
     var pdao = new PODDao();
     pdao.setFC(fc);
     pdao.setUserID(await session.info.webId);

     if(pdao.getUserId() != "fulgentes.solidcommunity.net" ) {
         res.redirect("/app/perfil")
         return;
     }
     else{
         mongoDao.getMyself(await pdao.getUserId(), async function (yo) {
         mongoDao.managePullsTest(yo, mongoDao.createMongoId("60d67e6809df6a0015937ede"), async function (resttr) {
             await pdao.utilPruebasEliminador();
             await mongoDao.eliminaTodoDelUser(pdao.getUserId());
             res.send(swig.renderFile('views/panels/test.html'));
         } )
     })

     }

 });


    app.post('/app/testSeCreaAlgo', async function (req, res) {

        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        if(pdao.getUserId() != "fulgentes.solidcommunity.net" ) {
            res.redirect("/app/perfil")
            return;
        }
        var isReg = await pdao.isRegistered();
        res.send(isReg);

    });

    app.post('/app/testExisteSolidFile', async function (req, res) {
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        var receptor = req.body.receptor;
        pdao.setUserID(await session.info.webId);
        if(pdao.getUserId() != "fulgentes.solidcommunity.net" ) {
            res.redirect("/app/perfil")
            return;
        }
        var existe = await pdao.canRead("https://" + pdao.getUserId() +"/sincompromisochats/"+ receptor+".json")

        res.send(existe);

    });


    app.post('/app/comparaEnlaces', async function (req, res) {
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        if(pdao.getUserId() != "fulgentes.solidcommunity.net" ) {
            res.redirect("/app/perfil")
            return;
        }
        mongoDao.getMyself(await pdao.getUserId(), function (yo) {
            mongoDao.getMyLists(yo, function (listasMias) {
                mongoDao.getPods(listasMias.enlaces, async function (losPods) {
                    losPods = losPods.select(function (t) {
                        return t.userId
                    })
                    var listEnPod = await pdao.leeEnlaces();
                    var resTR = listEnPod.enlaces.except(losPods);
                    res.send(resTR.length == 0);
                })
            })
        })

    });

    app.post('/app/lecturaChat', async function (req, res) {
        const session = await getSessionFromStorage(req.session.sessionId)
        var misMensajes = req.body.misMensajes
        var fc = new FC(session)
        var userId = "rosita.solidweb.org"
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        if(pdao.getUserId() != "fulgentes.solidcommunity.net" ) {
            res.redirect("/app/perfil")
            return;
        }
        var conversa = await pdao.getFullChat(userId)
        conversa = conversa.select(function (t) {
            t.timestamp= t.timestamp * -1;
            return t;
        })
        conversa = linq.from(conversa).orderBy(function (m) {
            return m.timestamp;
        }).toArray();
        conversa = conversa.select(function (t) {
            return t.contenido
        })

        var sol = ["Hola que tal", "Muy buenas", "Encantado de conocerte soy pablo"];
        sol = sol.concat(misMensajes);
        var rtr = (sol.except(conversa).length == 0);
        res.send(rtr);

    });

    app.post('/app/testSeActualiza', async function (req, res) {
        var name = req.body.name;
        var bio = req.body.bio;
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        if(pdao.getUserId() != "fulgentes.solidcommunity.net" ) {
            res.redirect("/app/perfil")
            return;
        }
        var perfil = await pdao.getDatosPerfil();
        sol = (name == perfil.name && bio == perfil.bio);
        res.send(sol);

    });

    app.post('/app/testSeActualizaPreferencias', async function (req, res) {
        var misP= req.body.preferencias;
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        if(pdao.getUserId() != "fulgentes.solidcommunity.net" ) {
            res.redirect("/app/perfil")
            return;
        }
        mongoDao.leePreferencias(pdao.getUserId(), function (preferencias) {
            if(preferencias.length == 0)
                res.send(false)
            else{
                preferencias = preferencias[0];
                var responseTS = (preferencias.edadMin == misP.edadMin && preferencias.edadMax == misP.edadMax
                    && misP.distancia == preferencias.distancia && misP.generoBusqueda == preferencias.generoBusqueda
                    && misP.mostrarDistancia == preferencias.mostrarDistancia);
                res.send(responseTS);
            }

        })

    });

    app.post('/app/testSSE', async function (req, res) {
        var usuario=mongoDao.createMongoId(req.body.usuario);
        var accion = parseInt(req.body.accion);
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        if(pdao.getUserId() != "fulgentes.solidcommunity.net" ) {
            res.redirect("/app/perfil")
            return;
        }
        mongoDao.getMyself(await pdao.getUserId(), function (yo) {
            mongoDao.managePullsTest(yo, usuario, function (resp) {
                if(accion == 0){
                    mongoDao.meGusta( usuario, yo, function (resp) {
                        mongoDao.getMyLists(usuario, function (listasDelUsuario) {
                            mongoDao.getMyLists(yo, function (listasMias) {
                                listasMias.meGusta = listasMias.meGusta.select(function (t) {
                                    return t.toString();
                                })
                                listasMias.paso = listasMias.paso.select(function (t) {
                                    return t.toString();
                                })
                                listasMias.bloqueos = listasMias.bloqueos.select(function (t) {
                                    return t.toString();
                                })
                                listasMias.enlaces = listasMias.enlaces.select(function (t) {
                                    return t.toString();
                                })
                                listasDelUsuario.meGusta = listasDelUsuario.meGusta.select(function (t) {
                                    return t.toString();
                                })
                                listasDelUsuario.paso = listasDelUsuario.paso.select(function (t) {
                                    return t.toString();
                                })
                                listasDelUsuario.bloqueos = listasDelUsuario.bloqueos.select(function (t) {
                                    return t.toString();
                                })
                                listasDelUsuario.enlaces = listasDelUsuario.enlaces.select(function (t) {
                                    return t.toString();
                                })
                                yo = yo.toString();
                                usuario = usuario.toString();
                                var ra = listasDelUsuario.meGusta.contains(yo) == true;
                                var re = listasDelUsuario.paso.contains(yo) == false;
                                var ri = listasDelUsuario.bloqueos.contains(yo) == false
                                var ro = listasDelUsuario.enlaces.contains(yo) == false;
                                var ru = true;
                                for(var i = 0; i < listasDelUsuario.meMola.length; i++){
                                    if(listasDelUsuario.meMola[i].mongoUserId.toString() == yo.toString())
                                        ru = false;
                                }
                                var pa = listasMias.meGusta.contains(usuario) == false;
                                var pe = listasMias.paso.contains(usuario) == false;
                                var pi = listasMias.bloqueos.contains(usuario) == false
                                var po = listasMias.enlaces.contains(usuario) == false;
                                var pu = true;
                                for(var i = 0; i < listasMias.meMola.length; i++){
                                    if(listasMias.meMola[i].mongoUserId.toString() == usuario.toString())
                                        pu = false;
                                }
                                res.send(ra && re && ri && ro && ru && pa && pe && pi && po && pu);
                            })
                        })
                    })
                }
                else if (accion == 1){
                    mongoDao.meMola(usuario, yo, "", function (resp) {
                        mongoDao.getMyLists(usuario, function (listasDelUsuario) {
                            mongoDao.getMyLists(yo, function (listasMias) {
                                var ra = listasDelUsuario.meGusta.contains(yo) == false;
                                var re = listasDelUsuario.paso.contains(yo) == false;
                                var ri = listasDelUsuario.bloqueos.contains(yo) == false
                                var ro = listasDelUsuario.enlaces.contains(yo) == false;
                                var ru = false;
                                for(var i = 0; i < listasDelUsuario.meMola.length; i++){
                                    if(listasDelUsuario.meMola[i].mongoUserId.toString() == yo.toString())
                                        ru = true;
                                }
                                var pa = listasMias.meGusta.contains(usuario) == false;
                                var pe = listasMias.paso.contains(usuario) == false;
                                var pi = listasMias.bloqueos.contains(usuario) == false
                                var po = listasMias.enlaces.contains(usuario) == false;
                                var pu = true;
                                for(var i = 0; i < listasMias.meMola.length; i++){
                                    if(listasMias.meMola[i].mongoUserId.toString() == usuario.toString())
                                        pu = false;
                                }
                                res.send(ra && re && ri && ro && ru && pa && pe && pi && po && pu);
                            })
                        })
                    })
                }else {

                        mongoDao.getMyLists(usuario, function (listasDelUsuario) {
                            mongoDao.getMyLists(yo, function (listasMias) {
                                var ra = listasDelUsuario.meGusta.contains(yo) == false;
                                var re = listasDelUsuario.paso.contains(yo) == false;
                                var ri = listasDelUsuario.bloqueos.contains(yo) == false
                                var ro = listasDelUsuario.enlaces.contains(yo) == false;
                                var ru = true;
                                for(var i = 0; i < listasDelUsuario.meMola.length; i++){
                                    if(listasDelUsuario.meMola[i].mongoUserId.toString() == yo.toString())
                                        ru = false;
                                }
                                var pa = listasMias.meGusta.contains(usuario) == false;
                                var pe = listasMias.paso.contains(usuario) == false;
                                var pi = listasMias.bloqueos.contains(usuario) == false
                                var po = listasMias.enlaces.contains(usuario) == false;
                                var pu = true;
                                for(var i = 0; i < listasMias.meMola.length; i++){
                                    if(listasMias.meMola[i].mongoUserId.toString() == usuario.toString())
                                        pu = false;
                                }
                                res.send(ra && re && ri && ro && ru && pa && pe && pi && po && pu);
                            })
                        })
                }

            })
        })

    });

    app.post('/app/testListas', async function (req, res) {
        var usuario=mongoDao.createMongoId(req.body.usuario);
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        if(pdao.getUserId() != "fulgentes.solidcommunity.net" ) {
            res.redirect("/app/perfil")
            return;
        }
        mongoDao.getMyself(await pdao.getUserId(), function (yo) {
            mongoDao.getMyLists(usuario, function (listasDelUsuario) {
                mongoDao.getMyLists(yo, function (listasMias) {
                    var rst= 5;
                    var count = 0;
                    yo = yo.toString();
                    listasDelUsuario.meGusta = listasDelUsuario.meGusta.select(function (t) {
                        return t.toString();
                    })
                    listasDelUsuario.paso = listasDelUsuario.paso.select(function (t) {
                        return t.toString();
                    })
                    listasDelUsuario.bloqueos = listasDelUsuario.bloqueos.select(function (t) {
                        return t.toString();
                    })
                    listasDelUsuario.enlaces = listasDelUsuario.enlaces.select(function (t) {
                        return t.toString();
                    })
                    if(listasDelUsuario.meGusta.contains(yo)){
                        rst = 0;
                        count++;
                    }

                    if( listasDelUsuario.paso.contains(yo)){
                        rst = 2;
                        count ++;
                    }

                    if(listasDelUsuario.bloqueos.contains(yo)){
                        rst = 3;
                        count++;
                    }
                    if( listasDelUsuario.enlaces.contains(yo)){
                        rst = 4;
                        count++;
                    }
                    for(var i = 0; i < listasDelUsuario.meMola.length; i++){
                        if(listasDelUsuario.meMola[i].mongoUserId.toString() == yo.toString()){
                            rst = 1;
                            count++;
                        }
                    }
                    var count2 = 0;
                    var rst2 = 5;
                    listasMias.meGusta = listasMias.meGusta.select(function (t) {
                        return t.toString();
                    })
                    listasMias.paso = listasMias.paso.select(function (t) {
                        return t.toString();
                    })
                    listasMias.bloqueos = listasMias.bloqueos.select(function (t) {
                        return t.toString();
                    })
                    listasMias.enlaces = listasMias.enlaces.select(function (t) {
                        return t.toString();
                    })
                    usuario = usuario.toString();
                    if(listasMias.meGusta.contains(usuario)){
                        rst2 = 0;
                        count2++;
                    }
                    if(listasMias.paso.contains(usuario)){
                        rst2 = 2;
                        count2++;
                    }
                    if(listasMias.bloqueos.contains(usuario)){
                        rst2 = 3;
                        count2++;
                    }
                    if(listasMias.enlaces.contains(usuario)){
                        rst2 = 4;
                        count2 ++;
                    }
                    for(var i = 0; i < listasMias.meMola.length; i++){
                        if(listasMias.meMola[i].mongoUserId.toString() == usuario.toString() && listasMias.meMola[i].mensajeMeMola.length <=300){
                            rst2 = 1;
                            count2 ++;
                        }
                    }
                    if(count > 1){
                        rst = -1;
                    }
                    if(count2 > 1){
                        rst2 = -1;
                    }

                    var tr = new Object();
                    tr.enMiPod = rst2;
                    tr.enSuPod = rst;
                    res.send(tr);
                })
            })
        })

    });
}