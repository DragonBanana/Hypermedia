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
                        </div> \
                        <button class="nav-link btn btn-rounded add-to-cart">Add to cart</button> \
                    </div> \
                </div> \
                <hr hr style="height:3px;border:none;color:#DDDDDD;background-color:#DDDDDD;">'
    return html;
}

function get_book_nav_button(num) {
    let active = "";
    if(num === parseInt($("#element-list-page").text())) {
        active = "active";
    }
    let html = '<li class="page-item ' + active + '"><a class="page-link" href="#" onclick="changePage($(this).text())">' + num + '</a></li>'
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
            $('#element-list-nav').append(get_book_nav_button(i+1));
        }
    });
}

$(document).on("click", ".genre_element", function (e) {
    e.preventDefault();
    $("#element-list-query").text("api/book?genre=" + $(this).text() +"&");
    $("#element-list-page").text(1);
    $("#element-list-page-size").text(4);
    gen_book_content();
});

$(document).on("click", ".theme_element", function (e) {
    e.preventDefault();
    $("#element-list-query").text("api/book?theme=" + $(this).text() +"&");
    $("#element-list-page").text(1);
    $("#element-list-page-size").text(4);
    gen_book_content();
});

function changePage(num) {
    $("#element-list-page").text(num);
    gen_book_content();
}