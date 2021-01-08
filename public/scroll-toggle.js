$(document).ready(function() {

    // Put your offset checking in a function
    function checkOffset() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-toggler").addClass("collapsed");
            $(".navbar-collapse").removeClass("show");
        }
        else {
            $(".navbar-toggler").removeClass("collapsed");
            $(".navbar-collapse").addClass("show");
        }
    }

    // Run it when the page loads
    checkOffset();


    // Run function when scrolling
    $(window).scroll(function() {
        checkOffset();
    });
});
