$('.like-btn').on('click', function () {
    $(this).toggleClass('is-active');
});

$(document).on('click', '.btn-cart-minus', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value > 1) {
        value = value - 1;
    } else {
        value = 0;
    }

    $input.val(value);


    if(value === 0) {
        let isbn = $this.parent().siblings('.cart-item-isbn').text();
        deleteAllCartItem($.cookie("session"), isbn);
        $this.parent().parent().remove();
    } else {
        let price = $this.parent().siblings('.cart-item-price').text();
        let isbn = $this.parent().siblings('.cart-item-isbn').text();
        updateCartItem(isbn, value, price);
        let total_price = price * value;
        $this.parent().siblings('.cart-price').find('.total-price').text(total_price.toFixed(2) + "€");
    }
});

$(document).on('click', '.btn-cart-plus', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    console.log(value);

    if (value < 100) {
        value = value + 1;
    } else {
        value = 100;
    }

    $input.val(value);
    $this.parent().parent().find('.cart-item-quantity').text(value);

    let price = $this.parent().siblings('.cart-item-price').text();
    let isbn = $this.parent().siblings('.cart-item-isbn').text();
    updateCartItem(isbn, value, price);

    let total_price = price * value;
    $this.parent().siblings('.cart-price').find('.total-price').text(total_price.toFixed(2) + "€");
});

$(document).on('click', '.delete-btn', function (e) {
    e.preventDefault();
    var $this = $(this);
    let isbn = $this.parent().siblings('.cart-item-isbn').text();
    deleteAllCartItem($.cookie("session"), isbn);
    $this.parent().parent().remove();
});