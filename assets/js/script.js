var projektiMenu = false;
var stranicaSeUcitava = false;
var prvoUcitavanje = true
var trenutnaStranica = null

$(".projekat").on("mouseleave", function() {
    $(".projekat").attr("style", "")
})
$(".projekti-dugme").on("click", function() {
    $(".projekti-menu").slideToggle(250)
    projektiMenu = !projektiMenu
    if (projektiMenu) {
        $(this).find("i").attr("class", "bi bi-chevron-up")
    } else {
        $(this).find("i").attr("class", "bi bi-chevron-down")
        $(".informacije").hide(500)
        $(".projekat-naslov").attr("style", "")
        prvoUcitavanje = true
    }
});

$(".projekti-menu .projekat-naslov").on("click", function() {
    var stranicaID = $(this).attr("data-id")
    if (stranicaSeUcitava) {
        return
    }
    if (!prvoUcitavanje && trenutnaStranica != stranicaID) {
        $(".informacije").hide(200);
        $("#" + $(this).attr("data-id")).show(200)
    }
    prvoUcitavanje = false
    stranicaSeUcitava = true
    if ($(this).attr("style") == "color:#fff !important;") {
        $(".informacije").hide(500)
        $(this).attr("style", "")
        prvoUcitavanje = true
        stranicaSeUcitava = false
        trenutnaStranica = null
        return
    }
    $(".projekat-naslov").attr("style", "")
    $(this).attr("style", "color:#fff !important;")
    var element = $("#" + stranicaID)
    trenutnaStranica = stranicaID
    var projekat_lista = element.find(".projekti-lista").hide()
    var loading = $("<div class='loading' style='display:none;'><i class='bi bi-grid'></i>Loading...</div>")
    element.show(250, function() {
        element.append(loading)
        loading.fadeIn(150, function() {
            setTimeout(function() {
                loading.fadeOut(150, function() {
                    projekat_lista.fadeIn(250)
                    stranicaSeUcitava = false
                })
            }, 400)

        })
    })
})

$(".bi-card-image").on("mouseenter", function() {
    var parent = $(this).attr("data-url");
    var link_slike = "assets/img/website/" + parent.replace("https://","").split(".")[0] + "-site.jpg";
    $(".img_popup").html(`<img src='${link_slike}'>`).stop(true, true).fadeIn(100);

    $(document).on("mousemove", function(event) {
        $(".img_popup").css({
            top: event.clientY + 10,
            left: event.clientX + 10
        });
    });
}).on("mouseleave", function() {
    $(".img_popup").stop(true, true).fadeOut(100);
    $(document).off("mousemove");
});


$(".bi-card-image").on("click",function(){
    var parent = $(this).attr("data-url");
    var link_slike = "assets/img/website/" + parent.replace("https://","").split(".")[0] + "-site.jpg";
    $(".img_pregled").html(`<img src='${link_slike}'>`).stop(true, true);
    $(".img_pregled").append(`<button onclick='zatvori_sliku()'>Exit</button>`);
    $(".img_pregled").fadeIn(200)
});

function zatvori_sliku(){
    $(".img_pregled").fadeOut(200)
}