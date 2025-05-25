var cTag = null

function go_to(tag, force = true) {
    if (cTag == tag) {
        return
    }
    cTag = tag
    if (force) {
        $('html, body').stop().animate({
            scrollTop: $("#" + tag).offset().top
        }, 500);
    }
    $("nav .active").removeClass("active");
    $(`a[href='/` + "#" + tag + `']`).parent().addClass("active");
}

$("a").on("click", function(e) {
    var href = $(this).attr("href")
    if (href.split("#").length == 2) {
        e.preventDefault()
    }
    go_to(href.split("#")[1])
})
if (window.location.href.split("#")[1]) {
    var tag = window.location.href.split("#")[1]
    go_to(tag)
} else {
    go_to("home")
}
var end = false

$(document).ready(function() {
    $("#home p").text(`${check_age()} year old who sometimes programs in his free time`)
    $("#contact_form").submit(function(event) {
        event.preventDefault();
        if (end) {
            return
        }
        $("button[type='submit']").text("Sending...")
        end = true
        var formData = $(this).serialize();

        var URL = `https://l.webhook.party/hook/OHb7ZIhPR4xMEZpJRXMUeE8BecqxuZPpoyC%2F5anpSQzQce2nakV7g3LJaMrX2tsUM9yFY80536nnH1K38QOrqCsUsLqNIIxMDB9Dylt8e%2BhTGZjQ1XTq64Ajta5ZuWUwlRBb4plQLgLsZm09qhDN0pkR6tENbdre4sdXhc4z3KgkbpwRbBPUW%2FLP6DBBRtOAHVAnsOa5c5iZyXzk%2B08%2B1wX2D%2FEY8i%2FsrEce%2F7sWOeiRV9u7WwvwpFpibkRn7XcV271r2hHeqvqJWku%2F60UzGbAvN4gyB6pdbf740GDmwWyx%2FIUrNAL52gEQWEBhvUvlhScp%2FfGn4WJpahg7pfWzYiByXUL0J7VJACvDvNoNJuRuC%2BPC9bqU3uWkG2oR0XjP30tS2eU8P1Y%3D/zA%2BYlWsAaF0UjykK`;

        $.ajax({
            url: URL,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                content: `**Ime:** ${$("#name").val()}\n**Email:** ${$("#email").val()}\n**Poruka:** ${$("#message").val()}`
            }),
            success: function(response) {
                $("form input, form textarea").attr("disabled", true)
                $("button[type='submit']").text("Message sent! ^-^")
                $("button[type='submit']").addClass("act")
                $("#contact_form").trigger("reset");
            }
        });
    });
});



$(window).scroll(function() {
    var scrollPosition = $(this).scrollTop();
    var sections = [
        {id: "home",element: $("#home")},
        {id: "thumbnails",element: $("#thumbnails")},
        {id: "websites",element: $("#websites")},
        {id: "skills",element: $("#skills")},
        //{id: "about",element: $("#about")},
        //{id: "feedback",element: $("#feedback")},
        {id: "contact",element: $("#contact")}
    ];

    for (var i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].element.offset().top - 50) {
            go_to(sections[i].id, false);
            break;
        }
    }
});

$("#websites .projects .project").on("click", function() {
    $(this).find(".preview").slideToggle(300)
})

$(".thumbs .project").on("click", function() {
    $(this).find(".photos").slideToggle(300)
})

$(".thumbs .project img").on("click", function(e) {
    e.stopPropagation()
    var src = $(this).attr("src")
    var popup = $(
        '<div id="img-popup" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 9999;">' +
        '<img src="' + src + '" style="max-width: 90vw; max-height: 90vh; box-shadow: 0 0 10px black; cursor: pointer;">' +
        '</div>'
    )
    $("body").append(popup)
    $("#img-popup").on("click", function() {
        $(this).remove()
    })
})

function check_age() {
    var born = 2002;
    var month = 9;
    var age = new Date().getFullYear() - born;
    if (new Date().getMonth() + 1 < month) age--;
    return age;
}