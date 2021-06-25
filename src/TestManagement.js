const {
    getSessionFromStorage,
    getSessionIdFromStorageAll,
    Session
} = require("@inrupt/solid-client-authn-node");

module.exports = function(app, swig, mongoDao, PODDao, FC){

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
        await pdao.utilPruebasEliminador();
       await mongoDao.eliminaTodoDelUser(pdao.getUserId());
         res.send(swig.renderFile('views/panels/test.html'));
     }

 });


    app.post('/app/testSeCreaAlgo', async function (req, res) {
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
        var isReg = await pdao.isRegistered();
        res.send(isReg);

    });

    app.post('/app/testSeActualiza', async function (req, res) {
        var name = req.body.name;
        var bio = req.body.bio;
        const session = await getSessionFromStorage(req.session.sessionId)
        var fc = new FC(session)
        var pdao = new PODDao();
        pdao.setFC(fc);
        pdao.setUserID(await session.info.webId);
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

}