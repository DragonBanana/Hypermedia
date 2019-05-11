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
    return $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .done(function (data) {
        console.log(data);
        $.cookie("session", data.username)
        $("#id01").hide();
        checkSessionStatus();
    })
    .fail(function () {
        console.log("Error");
        alert("Login failed, username or password are wrong");
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
    return $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(user),
        dataType: 'json',
        crossDomain: true
    })
    .done(function (data) {
        console.log(data);
        $("#id02").hide();
    })
    .fail(function (err) {
        alert("Registration failed")
    });
}

/*Get genres function
*/
function getAllBookGenres() {
    var method = "api/genre/"
    var url = apiServer + method;
    return $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        alert("Registration failed")
    });
}

/*Get themes function
*/
function getAllBookThemes() {
    var method = "api/theme/"
    var url = apiServer + method;
    return $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        alert("Registration failed")
    });
}


/*Get books function
*/
function getAllBooks(query, page, pageSize) {
    var method = query + "page="+ page + "&pageSize="  + pageSize;
    var url = apiServer + method;
    return $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        alert("Registration failed")
    });
}