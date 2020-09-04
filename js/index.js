$(function () {
    $(document).scroll(function () {
        var $nav = $("header nav.navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});