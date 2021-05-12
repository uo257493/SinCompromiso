$(document).ready(async function () {
// Button listeners

        $("#login").click(async () => {
            await solid.auth.popupLogin({ popupUri:"./solid/popupLogin.html"});

            // await $.ajax({
            //     type: "POST",
            //     url: "sesion",
            //     data: {"solidSession" : solid},
            //     dataType: "json",
            //
            //     success: function (response) {
            //         console.log(response);
            //     },
            //     error: function (request, status, errorThrown) {
            //         alert(errorThrown);
            //     }
            // });
            location.href = "/app";

        })
})
