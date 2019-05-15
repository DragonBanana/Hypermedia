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
    $this.parent().parent().find('.cart-item-quantity').text(value);

    let price = $this.parent().closest('.cart-item-price').text();
    let isbn = $this.parent().closest('.cart-item-isbn').text();
    let quantity = $this.parent().closest('.cart-item-quantity').text();
    updateCartItem(isbn, quantity, price);
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

    let price = $this.parent().closest('.cart-item-price').text();
    let isbn = $this.parent().closest('.cart-item-isbn').text();
    let quantity = $this.parent().closest('.cart-item-quantity').text();
    updateCartItem(isbn, quantity, price);
});