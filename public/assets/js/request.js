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
        $.cookie("session", data.username, {path: "/"});
        $.cookie("session", data.username, {path: "/pages"});
        $("#id01").hide();
        checkSessionStatus();
    })
    .fail(function () {
        console.log("Error");
        showError(err.responseJSON.error);
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
        showError(err.responseJSON.error);
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
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
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
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
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
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
    });
}

/*Get book function
*/
function getBook(isbn) {
    var method = "api/book/" + isbn;
    var url = apiServer + method;
    return $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
    });
}

/*Get book function
*/
function getBestsellerBook() {
    var method = "api/book/bestseller"
    var url = apiServer + method;
    return $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
    });
}

/*Get book function
*/
function getFavouriteBook() {
    var method = "api/book/favourite"
    var url = apiServer + method;
    return $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
    });
}

/*Add to cart function
    -Parameters:
        -isbn : the book isbn
        -price : the book price
*/
function addToCart(isbn, price) {
    var method = "api/cart/"
    var url = apiServer + method;
    var cartItem = {
        "username" : $.cookie("session"),
        "isbn" : isbn.toString(),
        "quantity" : "1",
        "price" : price.toString()
    }
    return $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(cartItem),
        dataType: 'json',
        crossDomain: true
    })
    .done(function (data) {
        console.log(data);
    })
    .fail(function (err) {
        showError(err.responseJSON.error);
    });
}

/*Get cart items function
*/
function getAllCartItems(user) {
    var method = "api/cart/" + user
    var url = apiServer + method;
    return $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
    });
}

/*Delete cart item function
*/
function deleteAllCartItem(user, book) {
    var method = "api/cart/" + user + "?isbn=" + book
    var url = apiServer + method;
    return $.ajax({
        type: "DELETE",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
    });
}

/*Update cart item function
    -Parameters:
        -isbn : the book isbn
        -quantity : the quantity of books
        -price : the book price
*/
function updateCartItem(isbn, quantity, price) {
    var method = "api/cart/"
    var url = apiServer + method;
    var cartItem = {
        "username" : $.cookie("session"),
        "isbn" : isbn.toString(),
        "quantity" : quantity.toString(),
        "price" : price.toString()
    }
    return $.ajax({
        type: "PUT",
        url: url,
        data: JSON.stringify(cartItem),
        dataType: 'json',
        crossDomain: true
    })
    .done(function (data) {
        console.log(data);
    })
    .fail(function (err) {
        alert(err)
        showError(err.responseJSON.error);
    });
}

/*Get authors function
*/
function getAllAuthors(query, page, pageSize) {
    var method = query + "page="+ page + "&pageSize="  + pageSize;
    var url = apiServer + method;
    return $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
    });
}

/*Get author function
*/
function getAuthor(id) {
    var method = "api/author/" + id;
    var url = apiServer + method;
    return $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
    });
}

/*Get events function
*/
function getAllEvents(query, page, pageSize) {
    var method = query + "page="+ page + "&pageSize="  + pageSize;
    var url = apiServer + method;
    return $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        crossDomain: true
    })
    .fail(function (err) {
        console.log(err.responseJSON.error);
        showError(err.responseJSON.error);
    });
}