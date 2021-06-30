const {
    getSessionFromStorage,
    getSessionIdFromStorageAll,
    Session
} = require("@inrupt/solid-client-authn-node");
//var dirMiApp = "https://sincompromiso.herokuapp.com";
var dirMiApp = "http://localhost:8081";
const clientApplicationName = "Sin compromiso";
module.exports = function(app, swig, podDao, FC){
    app.get('/signIn', function (req, res) {

        respuesta = swig.renderFile('public/login.html');

         res.send(respuesta);
    });


    app.get('/app', function (req, res) {

        respuesta = swig.renderFile("public/SinCompromiso.html");
        //res.send(respuesta);
        res.redirect("/app/perfil");
    });



    app.post('/sesion', function (req, res) {
        var parsed = req.body;
        res.send(req.body);
    })



    app.get("/login/:provider", async (req, res, next) => {
        var oidcIssuer = "";
        var provider = req.params.provider;
        if(provider === "community")
            oidcIssuer= "https://solidcommunity.net"
        else if(provider === "web")
            oidcIssuer = "https://solidweb.org"
        else
            oidcIssuer = "https://inrupt.net"
        const session = await new Session();
        // await session.logout();
        req.session.sessionId = await session.info.sessionId;

        await session.login({
            redirectUrl: dirMiApp+"/redirect",
            oidcIssuer,
            clientName: clientApplicationName,
            handleRedirect: (data) => {
                res.redirect(data)
            },
        });
    });


    app.get("/redirect", async function(req, res) {
        const session = await getSessionFromStorage(req.session.sessionId);
        var fc = new FC(session)
        podDao.setFC(fc);

        await session.handleIncomingRedirect(dirMiApp+ req.url);
        // 5. `session` now contains an authenticated Session instance.
        if (session.info.isLoggedIn) {
            podDao.setUserID(await session.info.webId);
            res.redirect("/app/perfil");
        }


    });
    app.post('/logout', async function (req, res) {

            const sessionN = await getSessionFromStorage(req.session.sessionId)
            await sessionN.logout();
            res.send("/signin");
    });

}