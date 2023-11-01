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