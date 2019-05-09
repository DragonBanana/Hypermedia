//Base address of the REST API server
var apiServer = "https://2hjxe5dk40.execute-api.eu-west-1.amazonaws.com/Prod/"

/*Login function
    -Parameters:
        -username: the username
        -password: the password
    -Description:
        -No checking on username and password are done.
        -Username and password are injected in the request through string concatenation.
*/
function login(username, password) {
    var url = apiServer + "?username=" + username + "&password=" + password;
    $.post(url)
    .done(function (data) {
        alert(data);
    })
    .fail(function (err) {
        alert(err);
    })
}