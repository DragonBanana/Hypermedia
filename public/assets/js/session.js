function checkSessionStatus() {
    if($.cookie("session")) {
        $('#navbar_loginButton').hide();
        $('#navbar_registerButton').hide();
        $('#navbar_userLabel').show();
        $('#navbar_cart').show();
        $('#navbar_userLabel_username').text($.cookie("session"));
    } else {
        $('#navbar_loginButton').show();
        $('#navbar_registerButton').show();
        $('#navbar_userLabel').hide();
        $('#navbar_cart').hide();
    }
}

function logout() {
    $.removeCookie("session", { path: "/" });
    $.removeCookie("session", { path: "/pages" });
    checkSessionStatus();
}