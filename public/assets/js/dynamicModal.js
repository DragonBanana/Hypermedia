function gen_book_modal_html(isbn, title, author, price, theme, genre, description) {
    let html = '<div id="single_page_modal" class="modal" style="display: block"> \
                    <div class="container-small single-element-modal animate"> \
                        <div class="row"> \
                            <div class="col-xs-12 col-sm-6 image-div" style="padding-top: 30px"> \
                                <img src="../assets/img/' + isbn + '.jpg"> \
                            </div> \
                            <div class="col-xs-12 col-sm-5 main-info" style="padding-top: 30px"> \
                                <p> \
                                    <a class="font-weight-bold main-key-info" style="color:darkorange">Title </a><br> \
                                    ' + title + '<br><br> \
                                    <a class="font-weight-bold main-key-info" style="color:darkorange">Author </a><br> \
                                    ' + author + '<br><br> \
                                    <a class="font-weight-bold main-key-info" style="color:darkorange">Price </a><br> \
                                    ' + price + '€ \
                            </div> \
                        </div> \
                        <div class="row buttons" style="padding-top: 15px">'
                        if ($.cookie("session")) {
                            html = html + '<button class="nav-link btn btn-rounded add-to-cart" onclick="addToCart(\''+isbn+'\', \''+price+'\')" style="margin-left: 15px"> Add to cart </button>'
                        }
                        html = html + '<button class="nav-link btn btn-rounded more-details" onclick="findSimilar()" style="margin-left: 15px"> Find similar </button> \
                        </div> \
                        <div class="row" style="padding-top: 30px"> \
                            <div class="col-12 other-info"> \
                                <p> \
                                    '+ description + ' \
                                </p> \
                            </div> \
                        </div> \
                    </div> \
                </div>'
    return html;
}

function gen_single_book(isbn) {
    getBook(isbn)
    .done(function (data) {
        let book = data.Items[0];
        $('body').append(gen_book_modal_html(book.isbn, book.title, book.authorId, book.price, book.themeId, book.genreId, book.description));
    });
}

function gen_author_modal_html(id, name, surname, bio) {
    let html = '<div id="single_page_modal" class="modal" style="display: block"> \
                    <div class="container-small single-element-modal animate"> \
                        <div class="row"> \
                            <div class="col-xs-12 col-sm-6 image-div" style="padding-top: 30px"> \
                                <img src="../assets/img/' + id + '.jpg"> \
                            </div> \
                            <div class="col-xs-12 col-sm-5 main-info" style="padding-top: 30px"> \
                                <p> \
                                    <a class="font-weight-bold main-key-info" style="color:darkorange">Name </a><br> \
                                    ' + name + '<br><br> \
                                    <a class="font-weight-bold main-key-info" style="color:darkorange">Surname </a><br> \
                                    ' + surname + '<br><br> \
                            </div> \
                        </div> \
                        <div class="row buttons" style="padding-top: 15px"> \
                        <button class="nav-link btn btn-rounded more-details author_element" style="margin-left: 15px">Find author\'s books</button> \
                        <span class="authorid" style="display:none">' +id + '</span> \
                        </div> \
                        <div class="row" style="padding-top: 30px"> \
                            <div class="col-12 other-info"> \
                                <p> \
                                    '+ bio + ' \
                                </p> \
                            </div> \
                        </div> \
                    </div> \
                </div>'
    return html;
}

function gen_single_author(id) {
    getAuthor(id)
    .done(function (data) {
        let author = data.Items[0];
        $('body').append(gen_author_modal_html(author.id, author.name, author.surname, author.bio));
    });
}

$(document).on("click", function (e) {
    var modal = document.getElementById("single_page_modal");
    if (event.target == modal) {
        e.preventDefault();
        modal.remove();
    }
});