//Base address of the REST API server
var apiServer = "https://i2lfy3dum9.execute-api.eu-west-1.amazonaws.com/Prod/"

/*Login function
    -Parameters:
        -username: the username
        -password: the password
    -Description:
        -No checking on username and password is done.
        -Username and password are injected in the request through string concatenation.
*/
function login(username, password) {
    var method = "api/login/"
    var url = apiServer + method + "?username=" + username + "&password=" + password;
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
         },
    })
    .done(function (data) {
        let response = JSON.parse(data);
        document.cookie = "session=" + response.username + "; max-age=3600; path=/;";
    })
    .fail(function (err) {
        console.log("err data: " + err);
    });
}

/*Register function
    -Parameters:
        -username: the username
        -password: the password
        -name: the name
        -surname: the surname
    -Description:
        -No checking on data is done.
        -Data are injected in the request through string concatenation.
*/
function register(username, password, name, surname) {
    var method = "api/register/"
    var url = apiServer + method;
    var user = {
        "username" : username,
        "password" : password,
        "name" : name,
        "surname" : surname
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(user),
        dataType: 'json',
        crossDomain: true
    })
    .done(function (data) {
        console.log(data);
    })
    .fail(function (err) {
        console.log("err data: " + err);
    });
}