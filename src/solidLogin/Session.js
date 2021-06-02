const {
    getSessionFromStorage,
    getSessionIdFromStorageAll,
    Session
} = require("@inrupt/solid-client-authn-node");
class SessionInSolid {

    constructor(url, sessionId) {
        this.url = url;
        this.sessionId = sessionId;
    }
   async sessionRedirection(){
       const session = await getSessionFromStorage(this.sessionId);
       await session.handleIncomingRedirect('http://localhost:8081'+ this.url);
       // 5. `session` now contains an authenticated Session instance.
       if (await this.isLoggedIn()) {
           console.log(`<p>Logged in with the WebID ${session.info.webId}.</p>`)
           return "/app/perfil";
       }
       else
           return "/login";
   }

    async isLoggedIn(){
        const session = await getSessionFromStorage(this.sessionId);
        console.log(session.info.webId)
        return session.info.isLoggedIn;
    }

    async logout(){
        const session = await getSessionFromStorage(this.sessionId);
        await session.logout();
    }

}

module.exports = SessionInSolid;