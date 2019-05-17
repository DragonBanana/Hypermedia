function gen_book_html(isbn, title, author, price, theme, genre, description) {
    let html = '<div class="row book-element"> \
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 text-center"> \
                        <img class="book-element-image" src="../assets/img/'+ isbn + '.jpg"> \
                    </div> \
                    <div class="col-xl-10 col-lg-9 col-md-8 col-sm-7"> \
                        <div class="title"> \
                            <a class="text-uppercase">' + title + '<a> \
                        </div> \
                        <div class="author"> \
                            <a>' + author + '</a> \
                        </div> \
                        <div class="price"> \
                            <a>$' + price + '</a> \
                        </div> \
                        <div class="tags"> \
                            <a class="font-weight-bold">Tag: </a> \
                            <a class="text-lowercase">' + theme + '</a>, \
                            <a class="text-lowercase">' + genre + '</a> \
                        </div> \
                        <div class="description"> \
                            <a class="font-weight-bold">Description: </a>' + description.substring(0, 250) + '... \
                        </div>'
    if ($.cookie("session")) {
        html = html + '<button class="nav-link btn btn-rounded add-to-cart" onclick="addToCart(' + isbn + ',' + price + ')">Add to cart</button>';
    }
    html = html + '</div> \
                </div> \
                <hr hr style="height:3px;border:none;color:#DDDDDD;background-color:#DDDDDD;">'
    return html;
}

function gen_author_html(id, name, surname, bio) {
    let html = '<div class="row book-element"> \
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5 text-center"> \
                        <img class="book-element-image" src="../assets/img/'+ id + '.jpg"> \
                    </div> \
                    <div class="col-xl-10 col-lg-9 col-md-8 col-sm-7"> \
                        <div class="title"> \
                            <a class="text-uppercase">' + surname + " " + name + '<a> \
                        </div> \
                        <div class="description"> \
                            <a class="font-weight-bold">Bio: </a>' + bio + ' \
                        </div>'
    if ($.cookie("session")) {
        html = html + '<button class="nav-link btn btn-rounded add-to-cart" onclick="addToCart(' + isbn + ',' + price + ')">View details</button>';
    }
    html = html + '</div> \
                </div> \
                <hr hr style="height:3px;border:none;color:#DDDDDD;background-color:#DDDDDD;">'
    return html;
}

function gen_cart_item_html(isbn, quantity, price) {
    let html = '<div class="item"> \
                    <span class="cart-item-isbn cart-item-data">' + isbn + '</span> \
                    <span class="cart-item-price cart-item-data">' + price + '</span> \
                    <span class="cart-item-quantity cart-item-data">' + quantity + '</span> \
                    <div class="buttons"> \
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

function gen_book_content() {
    getAllBooks($("#element-list-query").text(), $("#element-list-page").text(), $("#element-list-page-size").text())
        .done(function (data) {
            $('#element-list-content').empty();
            $('#element-list-title').text("Books");
            for (i = 0; i < data.Count; i++) {
                let book = data.Items[i];
                $('#element-list-content').append(gen_book_html(book.isbn, book.title, book.authorId, book.price, book.themeId, book.genreId, book.description));
            }
            $('#element-list-total-elements').text(data.Elements);
            $('#element-list-nav').empty();
            console.log($('#element-list-total-elements').text());
            console.log($('#element-list-page-size').text());
            for (i = 0; i < Math.ceil($('#element-list-total-elements').text() / $('#element-list-page-size').text()); i++) {
                $('#element-list-nav').append(get_book_nav_button(i + 1));
            }
        });
}

function gen_author_content() {
    getAllBooks($("#element-list-query").text(), $("#element-list-page").text(), $("#element-list-page-size").text())
        .done(function (data) {
            $('#element-list-content').empty();
            $('#element-list-title').text("Books");
            for (i = 0; i < data.Count; i++) {
                let author = data.Items[i];
                $('#element-list-content').append(gen_author_html(author.id, author.name, author.surname, author.bio));
            }
            $('#element-list-total-elements').text(data.Elements);
            $('#element-list-nav').empty();
            console.log($('#element-list-total-elements').text());
            console.log($('#element-list-page-size').text());
            for (i = 0; i < Math.ceil($('#element-list-total-elements').text() / $('#element-list-page-size').text()); i++) {
                $('#element-list-nav').append(get_author_nav_button(i + 1));
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
        }
        );
}

$(document).on("click", ".genre_element", function (e) {
    e.preventDefault();
    $("#element-list-query").text("api/book?genre=" + $(this).text() + "&");
    $("#element-list-page").text(1);
    $("#element-list-page-size").text(4);
    gen_book_content();
});

$(document).on("click", ".theme_element", function (e) {
    e.preventDefault();
    $("#element-list-query").text("api/book?theme=" + $(this).text() + "&");
    $("#element-list-page").text(1);
    $("#element-list-page-size").text(4);
    gen_book_content();
});

function changeBookPage(num) {
    $("#element-list-page").text(num);
    gen_book_content();
}

function changeAuthorPage(num) {
    $("#element-list-page").text(num);
    gen_author_content();
}