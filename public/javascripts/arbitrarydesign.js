$(window).on("load", function(){
    setTimeout(function(){
        $(".design-line").addClass("expand");
    },1000);

    $(".dot-container").click(function(){
        $(".fixed-nav").toggleClass("show-fixed");
        $("#threejs").toggleClass("flicker-out");
        $("#threejs2").toggleClass("flicker-out");
        $("#threejs3").toggleClass("flicker-out");
        $("#wrapper").toggleClass("flicker-out");
        $(".sign-up-btn").toggleClass("flicker-out");
        $(".inner-fixed-nav h1").toggleClass("move-down");
        $(".footer").toggleClass("flicker-out");
    });



});

