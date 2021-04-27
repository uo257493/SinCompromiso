const session = require("./src/solidLogin/Session");

// Button listeners
$("#login").click(async () => {
    session.doLogin();
})

export function getSesion() {
    return session;
}