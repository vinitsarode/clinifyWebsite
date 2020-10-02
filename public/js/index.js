$(function () {
    $(document).scroll(function () {
        var $nav = $("header nav.navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});


// ==============================
// Jobs Page
// ===============================

$(document).on("click", "#jobs-page .web-filter .search-filter-btn", function(){
    var title = $(this).parent().find(".job-title-input").val();
    var type = $(this).parent().find(".job-type-select").val();
    var location = $(this).parent().find(".job-location-input").val();
})

$(document).on("click", "#job-filter-modal .m-search-filter-modal", function(){
    var title = $(this).parent().find("#m-job-title").val();
    var type = $(this).parent().find("#m-type-dropdown").val();
    var location = $(this).parent().find("#m-location").val();
    console.log(title, type, location)
})