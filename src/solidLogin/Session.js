/**
 * API for handling SOLID pods
 */
const auth = require("solid-auth-client");
const query = require("./ldflex-queries");
const Person = require("./model/Person")


/**
 * Presents a popup and logs the user in
 */
export async function login(){
    await auth.popupLogin({ popupUri: "./solid/popupLogin.html" });
}

/**
 * Returns the current session
 * @return {function} currentSession
 */
async function getSession() {
    return await auth.currentSession();
}

/**
 * Returns the authenticated user
 * @return {Person} user
 */
async function getUser(){
    var webID = (await auth.currentSession()).webId;
    var name = await query.getName();
    var inbox = await query.getInbox();
    return new Person(webID, name, inbox);
}

/**
 * Close user session
 */
async function logout() {
    auth.logout().then(alert("Disconnected"));
}


/**
 * Tracks the session and executes the callback functions depending on the session status
 * @param {function} success
 * @param {function} failure
 */
async function track(success, failure){
    auth.trackSession(session => {
        if (!session){
            failure()
        }else
            success()
    })
}
