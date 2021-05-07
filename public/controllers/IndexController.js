$(document).ready(function () {
// Button listeners
    $(document).ready(function () {
// Button listeners

        $("#login").click(async () => {
            await solid.auth.popupLogin({ popupUri:"./solid/popupLogin.html"});
            location.href = "/app";

        })
    })
})
