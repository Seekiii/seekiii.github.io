aktivirano = false
$(".projekt").on("click",function(){
	if (aktivirano){
		$(".projekti").hide(300)
		$(".projekt").find($("i")).attr("class","bi bi-arrow-down")
		$(".hidden").attr("style","visibility: visible;")
		aktivirano = false
	}
	else{
		$(".projekt").find($("i")).attr("class","bi bi-arrow-up")
		$(".projekti").show(300).css("display", "flex");
		$(".hidden").attr("style","visibility: hidden;")
		aktivirano = true
	}
})

$('.mail').mouseenter(function() {
    var popup = $('.popup');
    popup.text($(this).attr('data-text'))
    popup.css({
      top: $(this).offset().top + $(this).outerHeight() -70,
      left: $(this).offset().left -63.5
    });
    popup.stop().fadeIn(300);
  });

  $('.mail').mouseleave(function() {
    $('.popup').stop().fadeOut(300);
  });

  $(document).on('mouseenter', '.popup', function() {
    $(this).stop().fadeIn(300);
  });

  $(document).on('mouseleave', '.popup', function() {
    $(this).stop().fadeOut(300);
  });
