window.onload = function () {
    $('#nav-btn-home').addClass('active');

    $(() => {
        $('.carousel').carousel({
            interval: 3000
        })
    })
};
