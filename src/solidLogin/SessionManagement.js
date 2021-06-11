const {
    getSessionFromStorage,
    getSessionIdFromStorageAll,
    Session
} = require("@inrupt/solid-client-authn-node");

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
        console.log(req );
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
        console.log(await session.info);
        req.session.sessionId = await session.info.sessionId;

        await session.login({
            redirectUrl: "http://localhost:8081/redirect",
            oidcIssuer,
            clientName: clientApplicationName,
            handleRedirect: (data) => {
                res.redirect(data)
            },
        });
    });

    var mySession;
    app.get("/redirect", async (req, res) => {
        const session = await getSessionFromStorage(req.session.sessionId);
        var fc = new FC(session)
        podDao.setFC(fc);
        console.log(req.url)
        await session.handleIncomingRedirect('http://localhost:8081'+ req.url);
        // 5. `session` now contains an authenticated Session instance.
        if (session.info.isLoggedIn) {
            console.log(`<p>Logged in with the WebID ${session.info.webId}.</p>`)
            podDao.setUserID(await session.info.webId);
            console.log(podDao);
            res.redirect("/app/perfil");
        }
        // mySession = new SessionInSolid(req.url, req.session.sessionId);
        // console.log("Creada mi sesion");
        // res.redirect(await mySession.sessionRedirection());

    });
    app.post('/logout', async function (req, res) {

        const sessionN = await getSessionFromStorage(req.session.sessionId)
        console.log(req.session.sessionId);
        await sessionN.logout();
        res.clearCookie("key1");
        res.send("/signin");
    });

    app.post('/sesion', function (req, res) {
        var parsed = req.body;
        console.log(parsed);
        res.send(req.body);
    })
}