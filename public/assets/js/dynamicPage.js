function gen_book_html(isbn, title, authorId, author, price, theme, genre, description) {
    let html = '<div class="row book-element"> \
                    <div class="col-xl-3 col-lg-4 col-md-5 col-sm-6 text-center"> \
                        <img class="book-element-image" src="../assets/img/'+ isbn + '.jpg" onClick="gen_single_book(' + isbn + ')"> \
                    </div> \
                    <div class="col-xl-9 col-lg-8 col-md-7 col-sm-6"> \
                        <div class="title"><a class="text-uppercase" onclick="gen_single_book('+ isbn + ')"> ' + title + '<a></div> \
                        <div class="author"><a onclick="gen_single_author(\''+ authorId + '\')">' + author + '</a></div> \
                        <div class="price"><a>' + price + '€</a></div> \
                        <div class="tags"> \
                            <a class="font-weight-bold">Tag: </a> \
                            <a class="text-lowercase theme_element" href="#">' + theme + '</a>, \
                            <a class="text-lowercase genre_element" href="#">' + genre + '</a></div> \
                        <div class="description"><a class="font-weight-bold">Description: </a>' + description.substring(0, 250) + '...</div> \
                        <div class="buttons">'
    if ($.cookie("session")) {
        html = html + '<button class="nav-link btn btn-rounded add-to-cart" onclick="addToCart(' + isbn + ',' + price + ')">Add to cart</button>';
    }
    html = html + '<button class="nav-link btn btn-rounded more-details" onclick="gen_single_book(' + isbn + ')"> More details </button> \
                    <button class="nav-link btn btn-rounded more-details" onclick="gen_single_author(\''+ authorId + '\')"> Author </button> \
                    <button class="nav-link btn btn-rounded more-details" onclick="gen_review()"> Reviews </button></div> \
                </div> \
                </div> \
                <hr hr style="height:3px;border:none;color:#DDDDDD;background-color:#DDDDDD;">'
    return html;
}

function gen_single_book_html(isbn, title, authorId, author, price, theme, genre, description) {
    let html = '<div class="row"> \
                    <div class="col-sm-12 col-lg-6 image-div" style="padding-top: 30px; text-align:center"> \
                        <img src="../assets/img/' + isbn + '.jpg" class="single-image"> \
                    </div> \
                    <div class="col-sm-12 col-lg-5 main-info" style="padding-top: 30px"> \
                        <p> \
                            <a class="font-weight-bold main-key-info" style="color:darkorange">Title </a><br> \
                            ' + title + '<br><br> \
                            <a class="font-weight-bold main-key-info" style="color:darkorange">Author </a><br> \
                            ' + author + '<br><br> \
                            <a class="font-weight-bold main-key-info" style="color:darkorange">Price </a><br> \
                            ' + price + '€<br><br> \
                            <a class="font-weight-bold main-key-info" style="color:darkorange">Description </a><br> \
                            ' + description + '\
                            <div class="row buttons" style="padding-top: 15px">'
                            if ($.cookie("session")) {
                                html = html + '<button class="nav-link btn btn-rounded add-to-cart" onclick="addToCart(\''+isbn+'\', \''+price+'\')" style="margin-left: 15px"> Add to cart </button>'
                            }
                            html = html + '<button class="nav-link btn btn-rounded more-details" onclick="findSimilar(\''+isbn+'\')" style="margin-left: 15px"> Find similar </button> \
                                <button class="nav-link btn btn-rounded more-details" onclick="findEvent(\''+isbn+'\')" style="margin-left: 15px"> Related events </button> \
                                <button class="nav-link btn btn-rounded more-details" onclick="gen_single_author(\''+ authorId + '\')" style="margin-left: 15px"> Author </button> \
                            </div> \
                    </div> \
                </div>'
                
    return html;
}

function gen_author_html(id, name, surname, bio) {
    let html = '<div class="row book-element"> \
                    <div class="col-xl-3 col-lg-4 col-md-5 col-sm-6 text-center"> \
                        <img class="book-element-image" src="../assets/img/'+ id + '.jpg" onclick="gen_single_author(\'' + id + '\')"> \
                    </div> \
                    <div class="col-xl-9 col-lg-8 col-md-7 col-sm-6"> \
                        <div class="title"> \
                            <a class="text-uppercase" onclick="gen_single_author(\''+ id + '\')">' + surname + " " + name + '<a> \
                        </div> \
                        <div class="description"> \
                            <a class="font-weight-bold">Bio: </a>' + bio + ' \
                        </div> \
                        <button class="nav-link btn btn-rounded more-details" onclick="gen_single_author(\''+ id + '\')"> More details </button></div> \
                    </div> \
                </div> \
                <hr hr style="height:3px;border:none;color:#DDDDDD;background-color:#DDDDDD;">'
    return html;
}

function gen_single_author_html(id, name, surname, bio) {
    let html = '<div class="row"> \
                    <div class="col-xs-12 col-sm-6 image-div" style="padding-top: 30px; text-align:center"> \
                        <img src="../assets/img/' + id + '.jpg" class="single-image"> \
                    </div> \
                    <div class="col-xs-12 col-sm-5 main-info" style="padding-top: 30px"> \
                        <p> \
                            <a class="font-weight-bold main-key-info" style="color:darkorange">Name </a><br> \
                            ' + name + '<br><br> \
                            <a class="font-weight-bold main-key-info" style="color:darkorange">Surname </a><br> \
                            ' + surname + '<br><br> \
                            <a class="font-weight-bold main-key-info" style="color:darkorange">Biography </a><br> \
                            ' + bio + '<br><br> \
                            <div class="row buttons" style="padding-top: 15px"> \
                                <button class="nav-link btn btn-rounded more-details author_element" style="margin-left: 15px">Find author\'s books</button> \
                                <span class="authorid" style="display:none">' +id + '</span> \
                            </div> \
                    </div> \
                </div> '
    return html;
}


function gen_event_html(id, name, time, book, location) {
    let html = '<div class="row book-element"> \
                    <div class="col-xs-12 col-sm-6 image-div" style="padding-top: 30px; text-align:center"> \
                        <img class="event-element-image" src="../assets/img/'+ id + '.jpg"> \
                    </div> \
                    <div class="col-xs-12 col-sm-5 main-info" style="padding-top: 30px"> \
                        <div class="title"><a class="text-uppercase">' + name + '<a></div> \
                        <div class="description"><a class="font-weight-bold">Date: </a>' + time.split('T')[0] + '</div> \
                        <div class="description"><a class="font-weight-bold">Time: </a>' + time.split('T')[1].slice(0, -1) + '</div> \
                        <div class="description location"><a class="font-weight-bold">Location: </a>' + location + '</div> \
                        <div class="buttons"><button class="nav-link btn btn-rounded show-map"> Show map </button> \
                        <button class="nav-link btn btn-rounded more-details" onclick="gen_single_book('+ book + ')""> Show book </button></div> \
                        </div> \
                </div> \
                <hr hr style="height:3px;border:none;color:#DDDDDD;background-color:#DDDDDD;">'
    return html;
}

function gen_cart_item_html(isbn, quantity, price) {
    let html = '<div class="cart-item"> \
                    <span class="cart-item-isbn cart-item-data">' + isbn + '</span> \
                    <span class="cart-item-price cart-item-data">' + price + '</span> \
                    <span class="cart-item-quantity cart-item-data">' + quantity + '</span> \
                    <div class="cart-buttons"> \
                    <span class="delete-btn"> \
                        <i class="fas fa-trash"></i> \
                    </span> \
                    </div> \
                    <div class="cart-image"> \
                    <img src="../assets/img/' + isbn + '.jpg" alt="" /> \
                    </div> \
                    <div class="cart-quantity"> \
                    <button type="button" class="btn-cart-plus btn-default btn-sm cart-button"> \
                        <i class="fas fa-plus"></i> \
                    </button> \
                    <input type="text" name="name" value="' + quantity + '" readonly="readonly"> \
                    <button type="button" class="btn-cart-minus btn-default btn-sm cart-button"> \
                        <i class="fas fa-minus"></i> \
                    </button> \
                    <label class="switch switch-flat" style="margin:auto; margin-top:1rem"> \
                        <input class="switch-input" type="checkbox" /> \
                        <span class="switch-label" data-on="Digital" data-off="Paper"></span> \
                        <span class="switch-handle"></span> \
                    </label> \
                    </div> \
                    <div class="cart-price"> \
                        <div class="total-price">' + (price * quantity).toFixed(2) + '€</div> \
                        <div class="price">' + price + '€/unit</div> \
                    </div> \
                </div>'
    return html;
}

function get_book_nav_button(num) {
    let active = "";
    if (num === parseInt($("#element-list-page").text())) {
        active = "active";
    }
    let html = '<li class="page-item ' + active + '"><a class="page-link" href="#" onclick="changeBookPage($(this).text())">' + num + '</a></li>'
    return html;
}

function get_author_nav_button(num) {
    let active = "";
    if (num === parseInt($("#element-list-page").text())) {
        active = "active";
    }
    let html = '<li class="page-item ' + active + '"><a class="page-link" href="#" onclick="changeAuthorPage($(this).text())">' + num + '</a></li>'
    return html;
}

function get_event_nav_button(num) {
    let active = "";
    if (num === parseInt($("#element-list-page").text())) {
        active = "active";
    }
    let html = '<li class="page-item ' + active + '"><a class="page-link" href="#" onclick="changeEventPage($(this).text())">' + num + '</a></li>'
    return html;
}

function gen_book_content() {
    getAllBooks($("#element-list-query").text(), $("#element-list-page").text(), $("#element-list-page-size").text())
        .done(function (data) {
            $('#element-list-content').empty();
            $('#element-list-title').text("Books");
            for (i = 0; i < data.Count; i++) {
                let book = data.Items[i];
                getAuthor(book.authorId).
                    done(function (data) {
                        $('#element-list-content').append(gen_book_html(book.isbn, book.title, book.authorId, data.Items[0].name + " " + data.Items[0].surname, book.price, book.themeId, book.genreId, book.description));
                    })
            }
            $('#element-list-total-elements').text(data.Elements);
            $('#element-list-nav').empty();
            for (i = 0; i < Math.ceil($('#element-list-total-elements').text() / $('#element-list-page-size').text()); i++) {
                $('#element-list-nav').append(get_book_nav_button(i + 1));
            }
        });
}

function gen_single_book_content() {
    getAllBooks($("#element-list-query").text(), $("#element-list-page").text(), $("#element-list-page-size").text())
        .done(function (data) {
            $('#element-list-content').empty();
            $('#element-list-title').text("Books");
            for (i = 0; i < data.Count; i++) {
                let book = data.Items[i];
                getAuthor(book.authorId).
                    done(function (data) {
                        $('#element-list-content').append(gen_single_book_html(book.isbn, book.title, book.authorId, data.Items[0].name + " " + data.Items[0].surname, book.price, book.themeId, book.genreId, book.description));
                    })
            }
            $('#element-list-total-elements').text(data.Elements);
        });
}

function gen_author_content() {
    getAllBooks($("#element-list-query").text(), $("#element-list-page").text(), $("#element-list-page-size").text())
        .done(function (data) {
            $('#element-list-content').empty();
            $('#element-list-title').text("Authors");
            for (i = 0; i < data.Count; i++) {
                let author = data.Items[i];
                $('#element-list-content').append(gen_author_html(author.id, author.name, author.surname, author.bio));
            }
            $('#element-list-total-elements').text(data.Elements);
            $('#element-list-nav').empty();
            for (i = 0; i < Math.ceil($('#element-list-total-elements').text() / $('#element-list-page-size').text()); i++) {
                $('#element-list-nav').append(get_author_nav_button(i + 1));
            }
        });
}

function gen_single_author_content() {
    getAllBooks($("#element-list-query").text(), $("#element-list-page").text(), $("#element-list-page-size").text())
        .done(function (data) {
            $('#element-list-content').empty();
            $('#element-list-title').text("Authors");
            for (i = 0; i < data.Count; i++) {
                let author = data.Items[i];
                $('#element-list-content').append(gen_single_author_html(author.id, author.name, author.surname, author.bio));
            }
            $('#element-list-total-elements').text(data.Elements);
            $('#element-list-nav').empty();
        });
}

function gen_event_content() {
    getAllBooks($("#element-list-query").text(), $("#element-list-page").text(), $("#element-list-page-size").text())
        .done(function (data) {
            $('#element-list-content').empty();
            $('#element-list-title').text("Events");
            for (i = 0; i < data.Count; i++) {
                let event = data.Items[i];
                $('#element-list-content').append(gen_event_html(event.id, event.name, event.time, event.bookId, event.location));
            }
            $('#element-list-total-elements').text(data.Elements);
            $('#element-list-nav').empty();
            for (i = 0; i < Math.ceil($('#element-list-total-elements').text() / $('#element-list-page-size').text()); i++) {
                $('#element-list-nav').append(get_event_nav_button(i + 1));
            }
        });
}

function gen_cart_content() {
    getAllCartItems($.cookie("session")).
        done(function (data) {
            $('#cart-items').empty();
            let title = '<div class="cart-title">Shopping Cart</div>';
            $('#cart-items').append(title);
            for (i = 0; i < data.Count; i++) {
                let book = data.Items[i];
                $('#cart-items').append(gen_cart_item_html(book.isbn, book.quantity, book.price));
            }
            let payment = ' \
            <div> \
                <button class="nav-link btn btn-rounded more-details" style="margin:1rem auto;" \
                    onclick="$(\'.cart-item-isbn\').each(function () {deleteAllCartItem($.cookie(\'session\'), $(this).text());$(\'.cart-item\').remove()}) ">Payment</button> \
            </div>'
            $('#cart-items').append(payment);
        }
        );
}

function findSimilar(isbn) {
    gen_books("api/book/similar/" + isbn + "?", 1, 5)
}

function findEvent(isbn) {
    gen_events("api/event/?isbn=" + isbn + "&", 1, 5)
}

$(document).on("click", ".theme-element", function (e) {
    e.preventDefault();
    var theme = $(this).text();
    gen_books("api/book?theme=" + theme, 1, 5)
});

$(document).on("click", ".genre-element", function (e) {
    e.preventDefault();
    var genre = $(this).text();
    gen_books("api/book?genre=" + genre, 1, 5)
});

$(document).on("click", ".author_element", function (e) {
    gen_books("api/book?author=" + $(this).siblings('.authorid').text() + "&", 1, 5)
});

$(document).on("click", ".show-map", function (e) {
    e.preventDefault();
    if ($('#map')) {
        $('#map').remove();
    }
    let location = $(this).parent().siblings('.location').text();
    let geo;
    location = location.substring(9, location.length)
    let g_api = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyDJ34rmsr_o1EDlKqRb9gh-e27atgouO68'
    $.ajax({
        url: g_api, async: false, success: function (result) {
            geo = result.results[0].geometry.location;
        }
    });
    let div = $(this).parent().parent().parent();
    let map_html = '<div id="map"></div> \
    <script> \
    var map = new google.maps.Map(document.getElementById(\'map\'), { \
        center: '+ JSON.stringify(geo) + ', \
        zoom: 12 \
    }); \
    </script>'
    div.append(map_html);
});


/*
<div id="map"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
    <script>
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    </script>
*/

function changeBookPage(num) {
    $("#element-list-page").text(num);
    gen_books($("#element-list-query").text(), num, $("#element-list-page-size").text());
}

function changeAuthorPage(num) {
    $("#element-list-page").text(num);
    gen_authors($("#element-list-query").text(), num, $("#element-list-page-size").text());
}

function changeEventPage(num) {
    $("#element-list-page").text(num);
    gen_events($("#element-list-query").text(), num, $("#element-list-page-size").text());
}

function showError(text) {
    document.getElementById('message').style.display = 'block';
    $('#error-message').text(text);
    setTimeout(function () {
        document.getElementById('message').style.display = 'none';
    }, 5000);
}

function showSuccess(text) {
    document.getElementById('success').style.display = 'block';
    $('#success-message').text(text);
    setTimeout(function () {
        document.getElementById('success').style.display = 'none';
    }, 3000);
}

function getUrlParameter(name) {
    var urlParams = new URLSearchParams(location.search);
    return urlParams.get(name);
};