var cTag = null
function go_to(tag,force=true) {
  if (cTag == tag){return}
  cTag = tag
  if(force){
    $('html, body').stop().animate({scrollTop: $("#"+tag).offset().top}, 500);
  }
  $("nav .active").removeClass("active");
  $(`a[href='/` + "#"+tag + `']`).parent().addClass("active");
  console.log(cTag + " - "+tag)
}

$("a").on("click",function(e){
  var href = $(this).attr("href")
  if (href.split("#").length == 2){
    e.preventDefault()
  }
  go_to(href.split("#")[1])
})
if (window.location.href.split("#")[1]){
  var tag = window.location.href.split("#")[1]
  go_to(tag)
}
else{go_to("home")}
var end = false

$(document).ready(function() {
    $("#contact_form").submit(function(event) {
        event.preventDefault();
        if (end){return}
        $("button[type='submit']").text("Sending...")
        end = true
        var formData = $(this).serialize();

        var ewr41 = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM3MzQyMDcxNjI1NDQyOTI1NA==";

        function db64(str) {
            return atob(str.replace(/\s/g, ''));
        }

        var URL = `${db64(ewr41)}/mFU8PVn5pwtyKWHMa4T9wtmYHrCNL4dZfO4fAFBHEkX3-01tlof5oKqDBrm_wcSHJKaJ`;

        $.ajax({
            url: URL,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                content: `**Ime:** ${$("#name").val()}\n**Email:** ${$("#email").val()}\n**Poruka:** ${$("#message").val()}`
            }),
            success: function(response) {
                $("form input, form textarea").attr("disabled",true)
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
        { id: "home", element: $("#home") },
        { id: "projects", element: $("#projects") },
        { id: "skills", element: $("#skills") },
        { id: "feedback", element: $("#feedback") },
        { id: "contact", element: $("#contact") }
    ];

    for (var i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].element.offset().top - 50) {
            go_to(sections[i].id, false);
            break;
        }
    }
});

var opened = null
$(".bi-image").on("click",function(){
    $(".preview").slideUp(300)
    var parent = $(this).parent().parent().parent()
    var img = parent.find("img")
    if (img.attr("src") == opened){return}
    opened = img.attr("src")
    console.log(parent)
    img.slideDown(300)
})

function check_age(){
    var born = 2002;
    var month = 9;
    var age = new Date().getFullYear() - born;
    if (new Date().getMonth() + 1 < month) age--;
    return age;
}

$(document).ready(function(){
    $("#home p").text(`${check_age()} year old who sometimes programs in his free time`)
})