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
                        html = html + '<button class="nav-link btn btn-rounded more-details" onclick="findSimilar(\''+isbn+'\')" style="margin-left: 15px"> Find similar </button> \
                            <button class="nav-link btn btn-rounded more-details" onclick="findEvent(\''+isbn+'\')" style="margin-left: 15px"> Related events </button> \
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

function gen_review_modal_html() {
    let html = '<div id="single_page_modal" class="modal" style="display: block"> \
                    <div class="container-small single-element-modal animate"> \
                        <div class="row"> \
                            <div class="col-xs-12 col-sm-6 image-div" style="padding-top: 30px"> \
                                <img src="../assets/img/avatar1.jpg"> \
                            </div> \
                            <div class="col-xs-12 col-sm-5 main-info" style="padding-top: 30px"> \
                                <p> \
                                    <a class="font-weight-bold main-key-info" style="color:darkorange">Username </a><br> \
                                    Anonymous<br><br> \
                                <a class="font-weight-bold main-key-info" style="color:darkorange">Evaluation </a><br> \
                                </i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><br><br> \
                            </div> \
                        </div> \
                        <div class="row" style="padding-top: 30px"> \
                            <div class="col-12 other-info"> \
                                <p> \
                                I think this is my third reading of this book. The first time is a precious memory to me. Our four children\
                                 would all climb into our king size bed before bedtime and we would read one or two chapters each evening. We homeschooled\
                                  so, as each child\'s reading progressed, they read a part too. Their mom died. They\'re in late 20s now. Five grandkids.\
                                   Those will be ready to read to before we know it. But life is not always neatly packaged. I married a widow and moved us all.\
                                    Today they are off to their own lives. My four and I are scattered across four states and even overseas. So, I\'m reading to\
                                     myself now. \
                                </p> \
                            </div> \
                        </div> \
                        <div class="row"> \
                            <div class="col-xs-12 col-sm-6 image-div" style="padding-top: 30px"> \
                                <img src="../assets/img/avatar2.jpg"> \
                            </div> \
                            <div class="col-xs-12 col-sm-5 main-info" style="padding-top: 30px"> \
                                <p> \
                                    <a class="font-weight-bold main-key-info" style="color:darkorange">Username </a><br> \
                                    Anonymous<br><br> \
                                    <a class="font-weight-bold main-key-info" style="color:darkorange">Evaluation </a><br> \
                                    </i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><br><br> \
                            </div> \
                        </div> \
                        <div class="row" style="padding-top: 30px"> \
                            <div class="col-12 other-info"> \
                                <p> \
                                I absolutely this book, and it is definitely one of my favorite series that I have ever read.\
                                 When I first started reading them I wasn\'t really sure that I would like them as I had unfortunately thought it was\
                                  \'nerdy\' when I was in school, and it was definitely a huge mistake! It is still a very good read as an adult, but\
                                   I really wish that I had started reading them when they came out. I wanted my kids to be able to experience the magic\
                                    while they are young enough to believe in that kind of magic so we have started reading them together,\
                                     and then watching the movie that coincides with the book. They love the series as well though I don\'t think they\
                                      like it as much as me since my daughter \'teases\' me about it. :)\
                                </p> \
                            </div> \
                        </div> \
                    </div> \
                </div>'
    return html;
}

function gen_review() {
    $('body').append(gen_review_modal_html());
}

$(document).on("click", function (e) {
    var modal = document.getElementById("single_page_modal");
    if (event.target == modal) {
        e.preventDefault();
        modal.remove();
    }
});