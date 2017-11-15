$("#threejs").hide();
$("#wrapper").hide();


$(window).on("load", function(){
    setTimeout(function(){
        $(".loader2").addClass("go");
        $("#threejs").show();
        $("#wrapper").show();
        $(".design-line").removeClass("expand");
    },2200);
    setTimeout(function(){
        $(".design-line").addClass("expand");
    },3350);
});