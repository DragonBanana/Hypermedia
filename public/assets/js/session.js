function checkSessionStatus() {
    if($.cookie("session")) {
        $('#navbar_loginButton').hide();
        $('#navbar_registerButton').hide();
        $('#navbar_userLabel').show();
        $('#navbar_userLabel_username').text($.cookie("session"));
    } else {
        $('#navbar_loginButton').show();
        $('#navbar_registerButton').show();
        $('#navbar_userLabel').hide();
    }
}