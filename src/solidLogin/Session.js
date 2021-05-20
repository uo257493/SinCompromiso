/**
 * API for handling SOLID pods
 */
const auth = require("solid-auth-client");
const query = require("./ldflex-queries");
const Person = require("./model/Person");


/**
 * Presents a popup and logs the user in
 */
async function login(){
    console.log("Hola");
    await auth.popupLogin({ popupUri: "https://solidcommunity.net/common/popup.html" });
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
    console.log(await auth.currentSession());
    // var name = await query.getName();
    // var inbox = await query.getInbox();
    // return new Person(webID, name, inbox);
}

/**
 * Close user session
 */
async function logout() {
    auth.logout().then(console.log("Disconnected"));
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


module.exports = {
    login,
    logout,
    getSession,
    track,
    getUser
}