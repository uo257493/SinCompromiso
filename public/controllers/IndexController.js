$(document).ready(async function () {
// Button listeners


        $("#loginSComm").click(async () => {
            location.href = "/login/community"
        })

    $("#loginSW").click(async () => {
        location.href = "/login/web"
    })
    $("#loginIn").click(async () => {
        location.href = "/login/inrupt"
    })
})
